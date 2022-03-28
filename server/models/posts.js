const userModel = require("./user");

let highestId = 3;

const list = [
  {
    src: "https://media-cldnry.s-nbcnews.com/image/upload/t_focal-1120x560,f_auto,q_auto:best/newscms/2022_13/3543963/220328-ukriane-mb-0729.jpg",
    caption:
      "Russian forces focus on eastern Ukraine amid rising fears they may seek to split the country in two",
    owner: 1,
    likes: [],
    comments: [],
    isPublic: true,
  },

  {
    src: "https://media-cldnry.s-nbcnews.com/image/upload/t_focal-1120x560,f_auto,q_auto:best/newscms/2022_13/3543963/220328-ukriane-mb-0729.jpg",
    caption:
      "Russian forces focus on eastern Ukraine amid rising fears they may seek to split the country in two",
    owner: 1,
    likes: [],
    comments: [],
    isPublic: true,
  },

  {
    src: "https://media-cldnry.s-nbcnews.com/image/upload/t_focal-1120x560,f_auto,q_auto:best/newscms/2022_13/3543963/220328-ukriane-mb-0729.jpg",
    caption:
      "Russian forces focus on eastern Ukraine amid rising fears they may seek to split the country in two",
    owner: 1,
    likes: [],
    comments: [],
    isPublic: true,
  },
];

function get(id) {
  //so we copy all the properties of the user to the object and we add 1 more property here as undefeined
  return {
    ...list.find((x) => x.id === parseInt(id), {
      user: userModel.get(x.owner),
    }),
    password: undefined,
  };
}

function remove(id) {
  //findIndex returns the number the actual index not the object like the find() method
  const index = list.findIndex((x) => x.id === parseInt(id));
  const post = list.splice(index, 1);

  return { ...post[0], user: userModel.get(post[0].owner) };
}
function update(id, newPost) {
  //we want the index because we are updating that exact object
  const index = list.findIndex((user) => user.id === parseInt(id));
  const oldPost = list[index];

  console.log(list);
  //we find the item in our list, we get the old user object, then we say that item is going to be updated with some of the old user and the new user
  newPost = list[index] = { ...oldUser, ...newUser };

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
