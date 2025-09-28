import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { registerSchema } from "../../../lib/validation/auth.validation";
import type { UserRegisterTypes } from "../../../types/Auth.type";
import { registerUser } from "@/services/auth.service";
import type { AxiosError } from "axios";
import type { ApiError } from "@/types/Api.type";

const useFormRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const { mutate, isPending, isError, error, isSuccess } = useMutation<
    unknown,
    AxiosError<ApiError>,
    UserRegisterTypes
  >({
    mutationFn: (data: UserRegisterTypes) =>
      registerUser(data.name, data.email, data.password),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error: Error) => {
      if ((error as AxiosError).response) {
        const axiosError = error as AxiosError<{ message: string }>;
        console.error("❌ API Error:", axiosError.response?.data?.message);
      } else {
        console.error("❌ Error:", error.message);
      }
    },
  });

  const onSubmit = async (data: UserRegisterTypes) => {
    mutate(data);
  };

  return {
    register,
    handleSubmit,
    errors,
    reset,
    onSubmit,
    isPending,
    isError,
    error,
    isSuccess,
  };
};

export default useFormRegister;
