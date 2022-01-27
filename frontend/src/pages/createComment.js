import { useForm } from "react-hook-form";
import axios from "axios";
import { ReactComponent as Logo } from "../images/icon-left-font-monochrome-black.svg";
import { Link, useNavigate } from "react-router-dom";

const Comment = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const userId = localStorage.userId;
  let pseudo = localStorage.pseudo;

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("user_id", data.user_id);
    formData.append("content", data.content);
    formData.append("image", data.image[0]);
    axios.post("http://localhost:3000/api/comment/", formData).then(() => {
      console.log(data);
      navigate("/", { replace: true });
    });
  };
  return (
    <div id="comment">
      <div id="pseudo">
        <Logo id="logo" />
        <h4>{pseudo}</h4>
      </div>
      <form id="comment__form" onSubmit={handleSubmit(onSubmit)}>
        <div hidden id="comment__dataHidden">
          <input name="userId" value={userId} {...register("user_id")} />
          {/* comment j'attache le comment au post_id? */}
        </div>
        <div id="comment__input">
          <label htmlFor="content">Commentaire</label>
          <input
            type="text"
            className="content"
            {...register("content")}
            required
          />
        </div>
        <div id="comment__image">
          <label htmlFor="imageUrl">
            Ajouter une image type PNG, JPG, JPEG, GIF
          </label>
          <input
            type="file"
            className="file"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: false })}
          />
        </div>
        <div className="submit">
          <button>Valider</button>
        </div>
      </form>
      <button>
        <Link to="/"> Annuler</Link>
      </button>
    </div>
  );
};
export default Comment;
