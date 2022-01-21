import { useForm, userForm } from "react-hook-form";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Post = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    axios.post("http://localhost:3000/api/post/", data).then(() => {
      const userToken = localStorage.token;
      navigate("/", { replace: true });
    });
  };
  return (
    <div id="post">
      <form id="post__form" onSubmit={handleSubmit(onSubmit)}>
        <div id="post__input">
          <label htmlFor="content">Publication</label>
          <input type="content" id="content" {...register("content")} />
        </div>
        <div id="post__image">
          <label htmlFor="imageURL">
            Ajouter une image type PNG, JPG, JPEG
          </label>
          <input
            type="file"
            id="file"
            accept="image/png, image/jpg, image/jpeg "
          />
        </div>
        <div id="post__submit">
          <button>Valider</button>
        </div>
      </form>
    </div>
  );
};

export default Post;
