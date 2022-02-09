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
      .put("http://localhost:3000/api/comment/" + comment_id, formData)
      .then(() => {
        console.log("dataafter: ", data);
        localStorage.removeItem("comment_id");
        navigate("/", { replace: true });
      });
  };

  //need getOneComment so needing an id to query on

  return (
    <div id="comment">
      <div id="pseudo">
        <Logo id="logo" />
        <h4>{pseudo}</h4>
      </div>
      <form id="comment__form" onSubmit={handleSubmit(onSubmit)}>
        <div hidden id="comment__dataHidden">
          <input type="number" value={comment_id} {...register("comment_id")} />
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

export default ModifyComment;
