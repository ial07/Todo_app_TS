import React from "react";
import { InputComp } from "../../ui/input";
import ButtonComp from "@/components/ui/button/index";
import useFormRegister from "./useFormRegister";

const FormRegister: React.FC = () => {
  const { register, handleSubmit, errors, onSubmit, isPending, error } =
    useFormRegister();

  console.log(error?.response?.data.message);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-105">
      <h1>
        <span className="inline md:hidden display-xs font-bold">Register</span>
        <span className="hidden md:inline display-sm font-bold">Register</span>
      </h1>
      <p className="text-sm md:text-md text-neutral-600 dark:text-neutral-500 mt-1 mb-4">
        Create your free account and start achieving more today
      </p>
      <InputComp
        label="Name"
        type="text"
        {...register("name")}
        error={errors && errors.name && errors.name.message}
      />
      <InputComp
        label="Email"
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
      <InputComp
        label="Confrm Password"
        type="password"
        {...register("confirmPassword")}
        error={
          errors && errors.confirmPassword && errors.confirmPassword.message
        }
      />

      <ButtonComp label="Submit" type="submit" fullWidth loading={isPending} />
      <p className="text-accent-red mt-3">{error?.response?.data.message}</p>
    </form>
  );
};

export default FormRegister;
