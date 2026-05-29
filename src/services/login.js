export const handleLogin = (
  e,
  email,
  password,
  navigate
) => {
  e.preventDefault();

  if (
    email === "admin@gmail.com" &&
    password === "123456"
  ) {
    navigate("/panel");
  } else {
    alert(
      "Credenciales incorrectas"
    );
  }
};