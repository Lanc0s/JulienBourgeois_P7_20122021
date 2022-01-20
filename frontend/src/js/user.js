const signupDb = () => {
  return fetch("http://localhost:3000/api/auth/signup").then((result) => {
    return result.json();
  });
};

const signinDb = () => {
  return fetch("http://localhost:3000/api/auth/signin").then((result) => {
    return result.json();
  });
};
