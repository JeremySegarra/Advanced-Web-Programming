const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

function get(id) {
  //so we copy all the properties of the user to the object and we add 1 more property here as undefeined
  return {
    ...list.find((user) => user.id === parseInt(id)),
    password: undefined,
  };
}

function remove(id) {
  //findIndex returns the number the actual index not the object like the find() method
  const index = list.findIndex((user) => user.id === parseInt(id));
  const user = list.splice(index, 1);

  return { ...user[0], password: undefined };
}
async function update(id, newUser) {
  //we want the index because we are updating that exact object
  const index = list.findIndex((user) => user.id === parseInt(id));
  const oldUser = list[index];
  //update this later professor had to leave
  newUser.password = await bcrypt.hash(newUser.password, 10);

  console.log(list);
  //we find the item in our list, we get the old user object, then we say that item is going to be updated with some of the old user and the new user
  newUser = list[index] = { ...oldUser, ...newUser };

  return { ...newUser, password: undefined };
}

//dont do it this way just another way if this is put under the other exports it will break so order matters

async function login(email, password) {
  const user = list.find((user) => user.email === email);
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

module.exports = {
  async create(user) {
    user.id = ++highestId;
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
    throw { message: "fake error" };
    list.push(user);
    return { ...user, password: undefined };
  },
  remove,
  update,
  login,
  fromToken,
  //this made a getter function
  get list() {
    return list.map((x) => ({ ...x, password: undefined }));
  },

  //putting remove here adds another property to this object and it includes whatever is inside the function it includes it
};

//we use map once we wrap it in parenthesis it knows its the return object and not the body of the function
//we fixed this into a function so we can keep updating the list

// module.exports.list = list.map((x) => ({ ...x, password: undefined }));  //this is just a named export .list
module.exports.get = get; //export our function as a named export
