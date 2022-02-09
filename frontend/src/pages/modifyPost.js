import { useForm } from "react-hook-form";
import axios from "axios";
import { ReactComponent as Logo } from "../images/icon-left-font-monochrome-black.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const ModifyPost = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const userId = localStorage.userId;
  let pseudo = localStorage.pseudo;
  let post_id = localStorage.post_id;
  let imageUrl = localStorage.imageUrl;

  const onSubmit = (data) => {
    console.log("data :", data);
    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append("post_id", post_id);
    formData.append("content", data.content);
    formData.append("imageHidden", imageUrl);
    axios
      .put("http://localhost:3000/api/post/" + post_id, formData)
      .then(() => {
        console.log("dataAfter: ", data);
        localStorage.removeItem("post_id");
        navigate("/", { replace: true });
      });
  };

  //need getOneComment so needing an id to query on

  return (
    <div className="pageWrap">
      <div id="pseudo">
        <Logo id="logo" />
        <h4>{pseudo}</h4>
      </div>
      <div id="post">
        <form id="post__form" onSubmit={handleSubmit(onSubmit)}>
          <div hidden id="post__dataHidden">
            <input type="number" value={post_id} {...register("post_id")} />
          </div>
          <div id="post__input">
            <label htmlFor="content">Publication</label>
            <input
              type="text"
              id="content"
              className="content"
              {...register("content")}
              /* required */
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
              <button> Annuler</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModifyPost;
