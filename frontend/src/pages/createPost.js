import { useForm, userForm } from "react-hook-form";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Post = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const userId = localStorage.userId;

  const onSubmit = (data) => {
    axios.post("http://localhost:3000/api/post/", data).then(() => {
      console.log(data);
      navigate("/", { replace: true });
    });
  };
  return (
    <div id="post">
      <form id="post__form" onSubmit={handleSubmit(onSubmit)}>
        <div hidden id="post__dataHidden">
          <input type="userId" value={userId} {...register("user_id")} />
        </div>
        <div id="post__input">
          <label htmlFor="content">Publication</label>
          <input
            type="content"
            id="content"
            {...register("content")}
            required
          />
        </div>
        <div id="post__image">
          <label htmlFor="imageURL">
            Ajouter une image type PNG, JPG, JPEG
          </label>
          <input
            type="file"
            id="file"
            name="imageURL"
            accept="image/png, image/jpg, image/jpeg "
            {...register("imageURL", { required: false })}
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
