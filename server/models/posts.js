const userModel = require("./user");

let hieghstId = 3;

const list = [
  {
    src: "https://media-cldnry.s-nbcnews.com/image/upload/t_focal-560x280,f_auto,q_auto:best/newscms/2022_13/3543963/220328-ukriane-mb-0729.jpg",
    caption:
      "Russian forces focus on eastern Ukraine amid rising fears they may seek to split the country in two",
    owner: 1,
    likes: [],
    comments: [],
    isPublic: true,
    id: 1,
  },
  {
    src: "https://w2.chabad.org/media/images/1187/LUSK11877068.jpg?_i=_nF72F3FCB89E9790A548A28674376BE69",
    caption: "How Jews in Ukraine Will Celebrate Passover This Year",
    owner: 1,
    likes: [],
    comments: [],
    isPublic: true,
    id: 2,
  },
  {
    src: "https://w2.chabad.org/media/images/1187/sTyy11875354.jpg?_i=_nF72F3FCB89E9790A548A28674376BE69",
    caption: "What It Has Been Like to Host Ukraine Refugees",
    owner: 2,
    likes: [],
    comments: [],
    isPublic: true,
    id: 3,
  },
];

const includeUser = (post) => ({ ...post, user: userModel.get(post.owner) });

function get(id) {
  const post = list.find((x) => x.id === parseInt(id));
  if (!post) {
    throw { status: 404, message: "Post not found" };
  }
  return includeUser(post);
}

function remove(id) {
  const index = list.findIndex((x) => x.id === parseInt(id));
  const post = list.splice(index, 1);

  return includeUser(post[0]);
}

function update(id, newPost) {
  const index = list.findIndex((x) => x.id === parseInt(id));
  const oldPost = list[index];

  newPost = list[index] = { ...oldPost, ...newPost };

  //console.log(list);

  return includeUser(newPost);
}

module.exports = {
  create(post) {
    post.id = ++hieghstId;

    list.push(post);
    return includeUser(post);
  },
  remove,
  update,
  get list() {
    return list.map((x) => includeUser(x));
  },
};
module.exports.get = get;
