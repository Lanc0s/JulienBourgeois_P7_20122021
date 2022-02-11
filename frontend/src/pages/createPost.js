import { useForm } from "react-hook-form";
import axios from "axios";
import { ReactComponent as Logo } from "../images/icon-left-font-monochrome-black.svg";
import { Link, useNavigate } from "react-router-dom";

const Post = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  let pseudo = localStorage.pseudo;
  const userId = localStorage.userId;

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("user_id", parseInt(data.user_id));
    formData.append("content", data.content);
    formData.append("image", data.image[0]);

    axios.post("http://localhost:3000/api/post/", formData).then(() => {
      navigate("/", { replace: true });
    });
  };
  return (
    <div className="pageWrap">
      <div id="pseudo">
        <Link to="/">
          <Logo id="logo"></Logo>
        </Link>
        <h4>{pseudo}</h4>
      </div>
      <div id="post">
        <form id="post__form" onSubmit={handleSubmit(onSubmit)}>
          <div hidden id="post__dataHidden">
            <input type="number" value={userId} {...register("user_id")} />
          </div>
          <div id="post__input">
            <label htmlFor="content">Publication</label>
            <input
              type="text"
              id="content"
              className="content"
              {...register("content")}
              required
            />
          </div>
          <div id="post__image">
            <label htmlFor="imageUrl">
              Ajouter une image type PNG, JPG, JPEG, GIF
            </label>
            <input
              type="file"
              id="imageUrl"
              className="file"
              accept="image/png, image/jpg, image/jpeg, image/gif "
              {...register("image", { required: false })}
            />
          </div>
          <div className="navigation__button">
            <div className="submit">
              <button>Valider</button>
            </div>
            <Link to="/">
              <button>Annuler</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Post;
