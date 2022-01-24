import { useForm, userForm } from "react-hook-form";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Com = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const userId = localStorage.userId;

  const onSubmit = (data) => {
    axios.post("http://localhost:3000/api/comment/", data).then(() => {
      console.log(data);
      /* Do i need that below? */
      navigate("/", { replace: true });
    });
  };
  return (
    <div id="comment">
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
            Ajouter une image type PNG, JPG, JPEG
          </label>
          <input
            type="file"
            className="file"
            name="imageUrl"
            accept="image/png, image/jpg, image/jpeg"
            {...register("imageUrl", { required: false })}
          />
        </div>
        <div className="submit">
          <button>Valider</button>
        </div>
      </form>
    </div>
  );
};
