import React from "react";
import FormLogin from "../../container/FormLogin/FormLogin";

const Login: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-dvh px-6">
      <FormLogin />
      <p className="text-sm md:text-md mt-3">
        Don't have an account?{" "}
        <a href="/Register" className="text-primary font-bold">
          Register
        </a>{" "}
      </p>
    </div>
  );
};

export default Login;
