import { useForm } from "react-hook-form";
import axios from "axios";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { ReactComponent as Logo } from "../images/icon-left-font-monochrome-black.svg";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    axios
      .post("http://localhost:3000/api/auth/signin", data)
      .then((res) => {
        axios.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
        localStorage.userId = res.data.userId;
        localStorage.pseudo = res.data.pseudo;
        localStorage.token = res.data.token;
        navigate("/", { replace: true });
      })
      .catch((err) => console.log(err));
  };
  if (localStorage.token) {
    return <Navigate to="/" replace={true} />;
  } else {
    return (
      <div>
        <Link to="/" aria-label="home">
          <Logo id="logo"></Logo>
        </Link>
        <div id="linkSignup">
          <Link to="/signup">S'enregistrer</Link>
        </div>

        <form id="login__wrap" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email">Email: </label>
            <input type="email" id="email" {...register("email")} required />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              {...register("user_password")}
              required
            />
          </div>
          <button>Send</button>
        </form>
      </div>
    );
  }
};

export default Login;
