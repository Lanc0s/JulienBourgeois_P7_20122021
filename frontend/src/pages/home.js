import { useEffect, useState } from "react";
import { BsFillTrashFill, BsChatDots } from "react-icons/bs";
import axios from "axios";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { ReactComponent as Logo } from "../images/icon-left-font-monochrome-black.svg";

const Home = () => {
  //Possibilité d'ajouter an alert dialog à l'avenir pour confirmer la supp par ex

  const navigate = useNavigate();

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
    axios("http://localhost:3000/api/post/" + id).then((res) => {
      localStorage.post_id = id;
      localStorage.imageUrl = res.data[0].imageUrl;
      navigate("/modifyPost", { replace: true });
    });
  };

  const handleModComment = (id) => {
    axios("http://localhost:3000/api/comment/" + id).then((res) => {
      localStorage.comment_id = id;
      navigate("/modifyComment", { replace: true });
    });
  };

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios("http://localhost:3000/api/post")
      .then((res) => {
        setPosts(res.data);
      })
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
            <Link
              aria-label="bouton publier une publication"
              className="lien"
              to="/post"
            >
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
                          <h3 aria-label="Nom de créateur de la publication">
                            {post.pseudo}
                          </h3>
                          <div className="homepage__content__post__header__icons">
                            <div
                              aria-label="Bouton Modifier Publication"
                              onClick={() => handleModPost(post.post_id)}
                            >
                              <BsChatDots className="modify_icon" />
                            </div>
                            <div
                              aria-label="Bouton supprimer publication"
                              onClick={() => handleDeletePost(post.post_id)}
                            >
                              <BsFillTrashFill className="delete_icon" />
                            </div>
                          </div>
                        </div>
                        <div className="homepage__content__post__content">
                          <p aria-label="Contenu de la publication">
                            {post.content}
                          </p>
                          {post.imageUrl && (
                            <img
                              src={post.imageUrl}
                              alt="Image liée à la publication"
                              className="homepage__content__post__content__img"
                            />
                          )}
                        </div>
                      </div>
                      {post.comments && post.comments.length ? (
                        post.comments.map((comment) => {
                          return (
                            <div className="homepage__content__comment">
                              <div className="homepage__content__comment__wrap">
                                <div className="homepage__content__comment__header">
                                  <h3 aria-label="Nom du créateur du commentaire">
                                    {comment.pseudo}
                                  </h3>

                                  <div className="homepage__content__post__header__icons">
                                    <div
                                      aria-label="Bouton modifier commentaire"
                                      onClick={() =>
                                        handleModComment(comment.comment_id)
                                      }
                                    >
                                      <BsChatDots className="modify_icon" />
                                    </div>
                                    <div
                                      aria-label="Bouton supprimer commentaire"
                                      onClick={() =>
                                        handleDeleteComment(comment.comment_id)
                                      }
                                    >
                                      <BsFillTrashFill className="delete_icon" />
                                    </div>
                                  </div>
                                </div>

                                <div className="homepage__content__comment__content">
                                  <p aria-label="contenu du commentaire">
                                    {comment.content}{" "}
                                  </p>
                                </div>
                                <Link
                                  aria-label="Bouton publier un commentaire"
                                  className="lien"
                                  to="/comment"
                                  state={{ postId: post.post_id }}
                                >
                                  Publier un commentaire
                                </Link>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div>
                          <Link
                            aria-label="Bouton publier un commentaire"
                            className="lien"
                            to="/comment"
                            state={{ postId: post.post_id }}
                          >
                            Soyez le premier à publier un commentaire
                          </Link>
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
