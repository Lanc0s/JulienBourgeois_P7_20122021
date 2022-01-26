import { useEffect, useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";
import { ReactComponent as Logo } from "../images/icon-left-font-monochrome-black.svg";

const Home = () => {
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("user_id", data.userId);
    formData.append("post_id", data.post_id);
    formData.append("isAdmin", data.isAdmin);
  };
  const [posts, setPosts] = useState([]);
  const handleDelete = (id) => {
    axios.delete("http://localhost:3000/api/post/:id" + id);
  };
  let pseudo = localStorage.pseudo;
  const userId = localStorage.userId;
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
                        {/* <div onClick={onSubmit(handleDelete(post.post_id))}>
                          <BsFillTrashFill className="delete_icon" />
                        </div> */}
                      </div>
                      <div className="homepage__content__post__content">
                        <p>{post.content}</p>
                        {post.imageUrl && (
                          <img src={post.imageUrl} alt="contentimage" />
                        )}
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
