import { useMutation } from "@tanstack/react-query";
import { logout } from "../../../services/auth.service";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";

const useHeader = () => {
  const navigate = useNavigate();

  const { mutate: logoutMutation, isPending } = useMutation({
    mutationFn: async () => {
      await logout(); // async function
    },
    onSuccess: () => {
      navigate("/login", { replace: true });
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

  return {
    logout: logoutMutation,
    isPending,
  };
};

export default useHeader;
