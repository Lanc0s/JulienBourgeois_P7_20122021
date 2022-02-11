import { useForm } from "react-hook-form";
import axios from "axios";
import { ReactComponent as Logo } from "../images/icon-left-font-monochrome-black.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Comment = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const userId = localStorage.userId;
  let pseudo = localStorage.pseudo;

  const onSubmit = (data) => {
    //formData in case we implement images
    const formData = new FormData();
    formData.append("user_id", data.user_id);
    formData.append("post_id", data.post_id);
    formData.append("content", data.content);

    axios.post("http://localhost:3000/api/comment/", formData).then(() => {
      navigate("/", { replace: true });
    });
  };

  const location = useLocation();
  const { postId } = location.state;
  return (
    <div id="comment">
      <div id="pseudo">
        <Logo id="logo" />
        <h4>{pseudo}</h4>
      </div>
      <form id="comment__form" onSubmit={handleSubmit(onSubmit)}>
        <div hidden id="comment__dataHidden">
          <input type="number" value={userId} {...register("user_id")} />
          <input type="number" value={postId} {...register("post_id")} />
        </div>
        <div id="comment__input">
          <label htmlFor="content">Commentaire</label>
          <input
            type="text"
            id="content"
            className="content"
            {...register("content")}
            required
          />
        </div>
        <div className="submit">
          <button>Valider</button>
        </div>
        <Link to="/">
          <button>Annuler</button>
        </Link>
      </form>
    </div>
  );
};
export default Comment;
