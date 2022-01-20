const postData = () => {
  return fetch("http://localhost:3000/api/post/").then((post) => {
    return post.json();
  });
};

console.log(postData);

const insertElementHome = () => {
  postData().then((results) => {
    /* for (let result of results) { */
    document.getElementById("root").innerHTML +=
      "<p>ça marche?</p>" + results.email;
  });
};
insertElementHome();
