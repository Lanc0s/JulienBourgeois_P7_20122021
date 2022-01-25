import { useForm, userForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Post = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const userId = localStorage.userId;

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append(data.content);
    formData.append(data.image);

    axios.post("http://localhost:3000/api/post/", formData).then(() => {
      console.log(data);
      navigate("/", { replace: true });
    });
  };
  return (
    <div className="pageWrap">
      <div id="post">
        <form id="post__form" onSubmit={handleSubmit(onSubmit)}>
          <div hidden id="post__dataHidden">
            <input name="userId" value={userId} {...register("user_id")} />
          </div>
          <div id="post__input">
            <label htmlFor="content">Publication</label>
            <input
              type="content"
              className="content"
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
              className="file"
              accept="image/png, image/jpg, image/jpeg "
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
    </div>
  );
};

export default Post;
