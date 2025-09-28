import FormRegister from "@/components/container/FormRegister/FormRegister";
import React from "react";
import { NavLink } from "react-router-dom";

const Register: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-dvh px-6">
      <FormRegister />
      <p className="text-sm md:text-md mt-3">
        Already have an account?{" "}
        <NavLink to="/Login" className="text-primary font-bold">
          Log In
        </NavLink>{" "}
      </p>
    </div>
  );
};

export default Register;
