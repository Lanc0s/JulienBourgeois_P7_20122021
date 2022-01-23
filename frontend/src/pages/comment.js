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
      navigate("/", { replace: true });
    });
  };
  return;

  <div id="comment"></div>;
};
