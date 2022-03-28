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
  return list.find((user) => user.id === parseInt(id));
}

//dont do it this way just another way if this is put under the other exports it will break so order matters
module.exports = {
  create(user) {
    user.id = ++highestId;
    //plus signs is pre increment

    list.push(user);
    return user;
  },
};

module.exports.list = list; //this is just a named export .list
module.exports.get = get; //export our function as a named export
