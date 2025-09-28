import FormRegister from "@/components/container/FormRegister/FormRegister";
import React from "react";

const Register: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-dvh px-6">
      <FormRegister />
      <p className="text-sm md:text-md mt-3">
        Already have an account?{" "}
        <a href="/Login" className="text-primary font-bold">
          Log In
        </a>{" "}
      </p>
    </div>
  );
};

export default Register;
