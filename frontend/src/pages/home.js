import { useEffect, useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";
import { ReactComponent as Logo } from "../images/icon-left-font-monochrome-black.svg";

const Home = () => {
  const [posts, setPosts] = useState([]);
  let pseudo = localStorage.pseudo;
  useEffect(() => {
    axios("http://localhost:3000/api/post")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((error) => console.log(error));
  }, [setPosts]);

  if (localStorage.token) {
    return (
      <div className="wrapper">
        <div id="pseudo">
          <Logo id="logo" />
          <h4>{pseudo}</h4>
        </div>
        <div className="homepage">
          <div className="banner">
            <h1>Fil d'actualités</h1>
          </div>
          <div id="postButton">
            <Link to="/post">Publier un post</Link>
          </div>
          <section className="homepage__content">
            {posts && posts.length
              ? posts.map((post) => {
                  return (
                    <div className="homepage__content__post">
                      <div className="homepage__content__post__header">
                        <h3>{post.pseudo}</h3>
                        <a href="http://localhost:3000/api/post/delete">
                          <BsFillTrashFill className="delete_icon" />
                        </a>
                      </div>
                      <div className="homepage__content__post__content">
                        <p>{post.content}</p>
                      </div>
                    </div>
                  );
                })
              : "Il n'y a pas de posts, bizarre !"}
          </section>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/login" replace={true} />;
  }
};

export default Home;
