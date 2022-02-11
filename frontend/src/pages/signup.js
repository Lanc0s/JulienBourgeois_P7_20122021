import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../images/icon-left-font-monochrome-black.svg";

const Signup = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    axios.post("http://localhost:3000/api/auth/signup", data).then(() => {
      axios
        .post("http://localhost:3000/api/auth/signin", data)
        .then((res) => {
          axios.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
          localStorage.token = res.data.token;
          localStorage.userId = res.data.userId;
          localStorage.pseudo = res.data.pseudo;

          navigate("/login", { replace: true });
        })
        .catch((err) => console.log(err));
    });
  };
  if (localStorage.token) {
    return <Navigate to="/login" replace={true} />;
  } else {
    return (
      <div>
        <Link to="/">
          <Logo id="logo"></Logo>
        </Link>
        <form id="signup__wrap" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="nom">Nom: </label>
            <input
              id="nom"
              {...register("nom", { required: true, pattern: /^([^0-9]*)$/ })}
              required
            />
            {errors.nom?.type === "required" && "Votre nom est nécessaire"}
          </div>
          <div>
            <label htmlFor="prenom">Prénom </label>
            <input
              id="prenom"
              type="text"
              {...register("prenom", {
                required: true,
                pattern: /^([^0-9]*)$/,
              })}
              required
            />
            <p>
              {errors.prenom?.type === "required" &&
                "Votre prénom est nécessaire"}
            </p>
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: true,
                pattern:
                  /^[a-zA-Z0-9.-]+[@]{1}[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,10}$/,
              })}
              required
            />
            <p>
              {errors.email?.type === "required" &&
                "Votre email de société est nécessaire"}
            </p>
            {/* Si mail de société \b[\w\.-]+@groupomania+\.\w{2,4}\b */}
          </div>
          <div>
            <label htmlFor="password">Mot de passe: </label>
            <input
              type="password"
              id="password"
              {...register("user_password", {
                required: true,
              })}
              required
            />
            <p>
              {errors.user_password?.type === "required" &&
                "Un mot de passe est nécessaire"}
            </p>
          </div>{" "}
          <div hidden id="dataHidden">
            {/* 
            <label hidden htmlFor="isAdmin">
              Admin
            </label> */}
            <input
              hidden
              type="number"
              id="isAdmin"
              defaultValue="0"
              {...register("isAdmin")}
              required
            />
          </div>
          <button>Valider</button>
        </form>
        <Link to="/">
          <button>Annuler</button>
        </Link>
      </div>
    );
  }
};

export default Signup;
