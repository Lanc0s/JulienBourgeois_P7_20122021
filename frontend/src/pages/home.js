import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios("http://localhost:3000/api/post")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((error) => console.log(error));
  });

  if (localStorage.token) {
    return (
      <div>
        <h1>Homepage</h1>
        <div id="postButton">
          <Link to="/post">Publier un post</Link>
        </div>
        <section>
          {posts
            ? posts.map((post) => {
                return <div>{post.content}</div>;
              })
            : "Il n'y a pas de posts, ducon"}
        </section>
      </div>
    );
  } else {
    return <Navigate to="/login" replace={true} />;
  }
};

export default Home;
