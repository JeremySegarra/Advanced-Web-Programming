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
function update(id, newUser) {
  //we want the index because we are updating that exact object
  const index = list.findIndex((user) => user.id === parseInt(id));
  const oldUser = list[index];

  console.log(list);
  //we find the item in our list, we get the old user object, then we say that item is going to be updated with some of the old user and the new user
  newUser = list[index] = { ...oldUser, ...newUser };

  return { ...newUser, password: undefined };
}

//dont do it this way just another way if this is put under the other exports it will break so order matters
module.exports = {
  create(user) {
    user.id = ++highestId;
    //plus signs is pre increment

    list.push(user);
    return { ...user, password: undefined };
  },
  remove,
  update,
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
