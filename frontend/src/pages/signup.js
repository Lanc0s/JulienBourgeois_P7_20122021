import { useForm } from "react-hook-form";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Signup = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    axios.post("http://localhost:3000/api/auth/signup", data).then(() => {
      axios
        .post("http://localhost:3000/api/auth/signin", data)
        .then((res) => {
          localStorage.token = res.data.token;
          navigate("/", { replace: true });
        })
        .catch((err) => console.log(err));
    });
  };
  if (localStorage.token) {
    return <Navigate to="/" replace={true} />;
  } else {
    return (
      <form id="signup__wrap" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="nom">Nom: </label>
          <input type="nom" id="nom" {...register("nom")} required />
        </div>
        <div>
          <label htmlFor="prenom">Prénom </label>
          <input type="prenom" id="prenom" {...register("prenom")} required />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input type="email" id="email" {...register("email")} required />
        </div>
        <div>
          <label htmlFor="password">Mot de passe: </label>
          <input
            type="password"
            id="password"
            {...register("user_password")}
            required
          />
        </div>
        <div>
          <input
            hidden
            type="isAdmin"
            id="isAdmin"
            defaultValue="0"
            {...register("isAdmin")}
            required
          />
        </div>
        <button>Valider</button>
        <button onSubmit={handleSubmit(navigate("/", { replace: true }))}>
          Annuler
        </button>
      </form>
    );
  }
};

export default Signup;
