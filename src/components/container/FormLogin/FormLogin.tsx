import React, { useEffect } from "react";
import useFormLogin from "./useFormLogin";
import { InputComp } from "../../ui/input";
import ButtonComp from "@/components/ui/button/index";
import { toast } from "react-toastify";

const FormLogin: React.FC = () => {
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isPending,
    error,
    isError,
  } = useFormLogin();

  useEffect(() => {
    if (isError) toast.error(error?.response?.data.message);
  }, [isError, error]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-105">
      <h1>
        <span className="inline md:hidden display-xs font-bold">Login</span>
        <span className="hidden md:inline display-sm font-bold">Login</span>
      </h1>
      <p className="text-sm md:text-md text-neutral-600 dark:text-neutral-500 mt-1 mb-4">
        Welcome back! Stay on top of your tasks and goals
      </p>
      <InputComp
        label="Username"
        type="email"
        {...register("email")}
        error={errors && errors.email && errors.email.message}
      />
      <InputComp
        label="Password"
        type="password"
        {...register("password")}
        error={errors && errors.password && errors.password.message}
      />

      <ButtonComp label="Login" type="submit" fullWidth loading={isPending} />
    </form>
  );
};

export default FormLogin;
