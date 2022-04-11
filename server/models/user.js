const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { db, isConnected, ObjectId } = require("./mongo");

//set environment variables on heroku as well the URI and changes this magic strings
const collection = db.db("gratitute").collection("users");

let highestId = 3;

const list = [
  {
    firstName: "John",
    lastName: "Doe",
    handle: "johndoe",
    password: "password",
    email: "jhon@doe.com",
    pic: "https://randomuser.me/api/portraits/men/1.jpg",
    id: 1,
  },
  {
    firstName: "Vladimir",
    lastName: "Putin",
    handle: "russian_dictator",
    password: "long table",
    email: "jhon@doe.com",
    pic: "https://randomuser.me/api/portraits/men/2.jpg",
    id: 2,
  },
  {
    firstName: "Kamala",
    lastName: "Harris",
    handle: "vp",
    password: "password",
    email: "kamala@whitehouse.org",
    pic: "https://randomuser.me/api/portraits/women/3.jpg",
    id: 3,
  },
];

async function get(id) {
  //so we copy all the properties of the user to the object and we add 1 more property here as undefeined
  const user = await collection.findOne({ _id: new ObjectId(id) });
  if (!user) {
    throw { statusCode: 404, message: "User not found" };
  }
  return {
    ...user,
    password: undefined,
  };
}
async function getByHandle(handle) {
  //so we copy all the properties of the user to the object and we add 1 more property here as undefeined
  const user = await collection.findOne({ handle });
  if (!user) {
    throw { statusCode: 404, message: "User not found" };
  }
  return {
    ...user,
    password: undefined,
  };
}

async function remove(id) {
  //this does the same as the 2 below
  const user = await collection.findOneAndDelete({ _id: new ObjectId(id) });

  //findIndex returns the number the actual index not the object like the find() method
  // const index = list.findIndex((user) => user.id === parseInt(id));
  // const user = list.splice(index, 1);

  return { ...user.value, password: undefined };
}
async function update(id, newUser) {
  newUser.password = await bcrypt.hash(newUser.password, 10);

  newUser = await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: newUser },
    { returnDocument: "after" }
  );
  //we find the item in our list, we get the old user object, then we say that item is going to be updated with some of the old user and the new user

  return { ...newUser, password: undefined };
}

//dont do it this way just another way if this is put under the other exports it will break so order matters

async function login(email, password) {
  const user = await collection.findOne({ email });
  if (!user) {
    throw { statusCode: 404, message: "User not found" };
  }
  //compare returns a PROMISE therefore we await it, it compares both passwords
  if (!(await bcrypt.compare(password, user.password))) {
    throw { statusCode: 401, message: "Wrong password" };
  }

  const data = { ...user, password: undefined };
  const token = jwt.sign(data, process.env.JWT_SECRET);

  return { ...data, token };
}

function fromToken(token) {
  //these two paramteres are two function resolve and reject
  //we created our own PROMISE we do not need to mark the function as async because we are making our own promise
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
}

function seed() {
  return collection.insertMany(list);
}

module.exports = {
  collection, //exports our collection
  seed, //exports our seed function
  getByHandle,
  async create(user) {
    user.id = ++highestId;

    if (!user.handle) {
      throw { statusCode: 400, message: "Handle is required" };
    }

    //plus signs is pre increment

    //we are going to hash the password, running bcrypt 10 times in a second nopw whole server will be hung for 1 second everything stops
    //if a thousand different people are hitting requests at the same time all of a sudden the server will come to a halt
    //whenever you do something that is long running you do not want to stop everything (node is single threaded) so we use ASYNC programming
    //We tell the operating system you do it but we are not going to wait you tell me when you re going to be done.
    //the last parameter of an async function is a function
    //When you call an async function you get a return value which is a PROMISE that one day the operating system will get back to you and tell you if that function was successful or not and what the return value was.
    //2 functions are on the PROMISE object and they are .then() and .catch()
    //.then() will only get executed when it is done and the results are in
    //The next level is important (async await) if you put async infront of the function you define then that function will always return a PROMISE
    //when it sees the word await the compiler rewrites it as a PROMISE and puts everything inside of a .then()
    //we never want magic numbers in our code so we use process.env.SALT_ROUNDS
    //here we pass it the password and it gives you back the hash with the salt appended, hashSync halts you program it returns the hash
    //we can only use await on a PROMISE await returns not the PROMISE but the

    //we got an error saltrounds is a string so we need to put a + infront of it to maker it a number
    user.password = await bcrypt.hash(user.password, +process.env.SALT_ROUNDS);
    console.log(user);

    const result = await collection.insertOne(user);
    user = await get(result.insertedId);

    return { ...user, password: undefined };
  },
  remove,
  update,
  login,
  fromToken,
  //this made a getter function
  async getList() {
    //we wrapped await with toArray map is after so we are calling the map on the results of the await
    //We  cannot do a map on a Promise thats why we need to wrap await with find and toarray
    return (await collection.find().toArray()).map((x) => ({
      ...x,
      password: undefined,
    }));
  },

  //putting remove here adds another property to this object and it includes whatever is inside the function it includes it
};

//we use map once we wrap it in parenthesis it knows its the return object and not the body of the function
//we fixed this into a function so we can keep updating the list

// module.exports.list = list.map((x) => ({ ...x, password: undefined }));  //this is just a named export .list
module.exports.get = get; //export our function as a named export
