import React, { useState } from "react";
import loginIcons from "../asset/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setAuthToken } from "../api";

const Login = ({ setLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "assignment@pgagi.in" && password === "1234@Abcd") {
      setAuthToken(
        "tg_c81b9389-f018-4bf0-b2ef-38f6438e0d40-0QhgA605dwPwo7wn1Jz_eg"
      ); 
      setLoggedIn(true);
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <section id="login">
      <header className="h-16 shadow-md bg-white fixed w-full z-40 ">
        <div className=" h-full container mx-auto flex items-center px-4 justify-between">
          <div className="">
            <Link to={"/"} className="font-bold text-2xl text-red-600">
              Toingg
            </Link>
          </div>
        </div>
      </header>
      <br />
      <div className="mx-auto container p-4 mt-20">
        <div className="bg-white p-5 w-full max-w-sm mx-auto border-2 border-blue-400 rounded-2xl">
          <div className="w-20 h-20 mx-auto">
            <img src={loginIcons} alt="login icons" />
          </div>

          <form className="pt-6 flex flex-col gap-2" onSubmit={handleLogin}>
            <div className="grid">
              <label>Email : </label>
              <div className="bg-slate-200 p-2 rounded-full">
                <input
                  type="email"
                  placeholder="enter email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-full outline-none bg-transparent ml-3"
                />
              </div>
            </div>

            <div>
              <label>Password : </label>
              <div className="bg-slate-200 p-2 flex rounded-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="enter password"
                  value={password}
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-full outline-none bg-transparent ml-3"
                />
                <div
                  className="cursor-pointer text-lg"
                  onClick={() => setShowPassword((preve) => !preve)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>

            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              Login
            </button>
          </form>

          <p className="my-5">
            Don't have account ?{" "}
            <Link
              to={"/sign-up"}
              className=" text-red-600 hover:text-red-700 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
