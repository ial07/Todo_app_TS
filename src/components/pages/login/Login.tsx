import React from "react";
import FormLogin from "../../container/FormLogin/FormLogin";
import { NavLink } from "react-router-dom";

const Login: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-dvh px-6">
      <FormLogin />
      <p className="text-sm md:text-md mt-3">
        Don't have an account?{" "}
        <NavLink to={"/register"} className="text-primary font-bold">
          Register
        </NavLink>{" "}
      </p>
    </div>
  );
};

export default Login;
