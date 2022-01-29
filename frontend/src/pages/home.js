import { useEffect, useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";
import { ReactComponent as Logo } from "../images/icon-left-font-monochrome-black.svg";

const Home = () => {
  /* const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("user_id", data.userId);
    formData.append("post_id", data.post_id);
    formData.append("isAdmin", data.isAdmin);
  }; */
  /* const handleDelete = (id) => {
    axios.delete("http://localhost:3000/api/post/:id" + id);
  }; */
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  useEffect(
    () => {
      axios("http://localhost:3000/api/post")
        .then((res) => {
          setPosts(res.data);
        })
        .then(
          axios("http://localhost:3000/api/comment")
            .then((res) => {
              setComments(res.data);
            })
            .catch((error) => console.log(error))
        )
        .catch((error) => console.log(error));
    },
    [setPosts],
    [setComments]
  );
  console.log("posts: ", posts);
  /* 
  useEffect(() => {
    
  }, ); */

  console.log("comments: ", comments);
  let pseudo = localStorage.pseudo;
  const userId = localStorage.userId;

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
            <Link className="lien" to="/post">
              Publier un post
            </Link>
          </div>
          <section className="homepage__content">
            {posts && posts.length
              ? posts.map((post) => {
                  return (
                    <article className="homepage__content__wrap">
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
                            <img
                              src={post.imageUrl}
                              alt="contentimage"
                              className="homepage__content__post__content__img"
                            />
                          )}
                        </div>
                        <Link
                          className="lien"
                          to="/comment"
                          state={{ postId: post.post_id }}
                        >
                          Poster un commentaire
                        </Link>
                      </div>
                      {comments && comments.length ? (
                        comments.map((comment) => {
                          console.log("Je suis là");
                          return (
                            <div className="homepage__content__comment">
                              <div className="homepage__content__comment__header">
                                <p>{comment.pseudo} </p>
                              </div>
                              <div className="homepage__content__comment__content">
                                <p>{comment.content} </p>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="homepage__content__comment">
                          <p>Soyez le premier à laisser un commentaire! </p>
                        </div>
                      )}
                    </article>
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
