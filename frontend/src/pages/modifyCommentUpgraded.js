import { useForm } from "react-hook-form";
import axios from "axios";
import { ReactComponent as Logo } from "../images/icon-left-font-monochrome-black.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const ModifyComment = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const userId = localStorage.userId;
  let pseudo = localStorage.pseudo;
  let comment_id = localStorage.comment_id;

  const onSubmit = (data) => {
    console.log("data :", data);
    const formData = new FormData();
    //formData in case we implement images
    formData.append("comment_id", comment_id);
    formData.append("content", data.content);

    axios
      .put("http://localhost:3000/api/comment" + comment_id, formData)
      .then(() => {
        console.log(data);
        localStorage.comment_id.clear();
        navigate("/", { replace: true });
      });
  };

  const [comments, setComments] = useState([]);
  useEffect(() => {
    axios("http://localhost:3000/api/comment/" + comment_id)
      .then((res) => {
        setComments(res.data);
      })
      .catch((error) => console.log(error));
  }, [comment_id, setComments]);

  return (
    <div id="modifyComment">
      <div id="pseudo">
        <Logo id="logo" />
        <h4>{pseudo}</h4>
      </div>
      {comments && comments.length
        ? comments.map((comment) => {
            <form id="modifyComment__form" onSubmit={handleSubmit(onSubmit)}>
              <div id="modifyComment__input">
                <label htmlFor="content">Commentaire</label>
                <input
                  type="text"
                  className="content"
                  defaultValue={comment.content}
                  {...register("content")}
                />
              </div>

              <div className="submit">
                <button>Valider</button>
              </div>
              <Link to="/">
                <button>Annuler</button>
              </Link>
            </form>;
          })
        : "error"}
    </div>
  );
};

export default ModifyComment;
