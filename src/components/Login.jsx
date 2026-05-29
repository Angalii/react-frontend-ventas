import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../services/login";

function Login() {
  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={(e) =>
          handleLogin(
            e,
            email,
            password,
            navigate
          )
        }
        className="bg-white p-8 rounded-2xl shadow-xl w-96"
      >
        <h1 className="text-3xl font-bold text-center text-violet-600 mb-8">
          Login
        </h1>

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="w-full p-3 border rounded-xl mb-4 outline-none focus:border-violet-500"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="w-full p-3 border rounded-xl mb-6 outline-none focus:border-violet-500"
        />

        <button
          type="submit"
          className="w-full bg-violet-600 text-white p-3 rounded-xl hover:bg-violet-700 transition"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}

export default Login;