import { useEffect, useState } from "react";
import { BsFillTrashFill, BsChatDots } from "react-icons/bs";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";
import { ReactComponent as Logo } from "../images/icon-left-font-monochrome-black.svg";

const Home = () => {
  //Possibilité d'ajouter an alert dialog à l'avenir pour confirmer la supp par ex

  const handleDeletePost = (id) => {
    axios.delete("http://localhost:3000/api/post/" + id).then(() => {
      window.location.reload();
    });
  };
  const handleDeleteComment = (id) => {
    axios.delete("http://localhost:3000/api/comment/" + id).then(() => {
      window.location.reload();
    });
  };

  const handleModPost = (id) => {
    axios.put("http://localhost:3000/api/post/" + id).then(() => {
      window.location.reload();
    });
  };
  const handleModComment = (id) => {
    axios.put("http://localhost:3000/api/comment/" + id).then(() => {
      window.location.reload();
    });
  };

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios("http://localhost:3000/api/post")
      .then((res) => {
        setPosts(res.data);
      })
      /*
        .then(
          axios("http://localhost:3000/api/comment/" + postId)
            .then((res) => {
              setComments(res.data);
            })
            .catch((error) => console.log(error))
        ) */
      .catch((error) => console.log(error));
  }, [setPosts]);

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
                  console.log("post: ", post);
                  return (
                    <article className="homepage__content__wrap">
                      <div className="homepage__content__post">
                        <div className="homepage__content__post__header">
                          <h3>{post.pseudo}</h3>
                          <div className="homepage__content__post__header__icons">
                            <div onClick={() => handleModPost(post.comment_id)}>
                              <BsChatDots className="modify_icon" />
                            </div>
                            <div onClick={() => handleDeletePost(post.post_id)}>
                              <BsFillTrashFill className="delete_icon" />
                            </div>
                          </div>
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
                      </div>
                      {post.comments &&
                        post.comments.length &&
                        post.comments.map((comment) => {
                          console.log(comment);
                          return (
                            <div className="homepage__content__comment">
                              <div className="homepage__content__comment__wrap">
                                <div className="homepage__content__comment__header">
                                  <h3>{comment.pseudo} </h3>

                                  <div className="homepage__content__post__header__icons">
                                    <div
                                      onClick={() =>
                                        handleModComment(comment.comment_id)
                                      }
                                    >
                                      <BsChatDots className="modify_icon" />
                                    </div>
                                    <div
                                      onClick={() =>
                                        handleDeleteComment(comment.comment_id)
                                      }
                                    >
                                      <BsFillTrashFill className="delete_icon" />
                                    </div>
                                  </div>
                                </div>

                                <div className="homepage__content__comment__content">
                                  <p>{comment.content} </p>
                                </div>
                                <Link
                                  className="lien"
                                  to="/comment"
                                  state={{ postId: post.post_id }}
                                >
                                  Poster un commentaire
                                </Link>
                              </div>
                            </div>
                          );
                        })}
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
