import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../../lib/validation/auth.validation";
import { loginUser } from "../../../services/auth.service";
import type { UserAuthTypes } from "../../../types/Auth.type";
import type { AxiosError } from "axios";
import type { ApiError } from "@/types/Api.type";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const useFormLogin = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserAuthTypes>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending, isError, error } = useMutation<
    Awaited<ReturnType<typeof loginUser>>,
    AxiosError<ApiError>,
    UserAuthTypes
  >({
    mutationFn: (data: UserAuthTypes) => loginUser(data.email, data.password),
    onSuccess: (data) => {
      // Save to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Update context
      setToken(data.token);
      setUser(data.user);

      // Redirect to home
      navigate("/", { replace: true });
    },
  });

  const onSubmit = (data: UserAuthTypes) => {
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
  };
};

export default useFormLogin;
