/* eslint-disable @typescript-eslint/no-unsafe-return */
import axiosInstance, {CustomError} from "@/lib/axios-instance";
import {useMutation, useQuery, UseQueryResult} from "@tanstack/react-query";
import {
  CurrentUserResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
} from "../types/auth-types";
import {getCurrentUserRoute, signInRoute, signUpRoute, signOutRoute} from "@/constants/api-routes";
import {useNavigate, useSearchParams} from "react-router";
import {toast} from "sonner";

export function useCurrentUser(): UseQueryResult<CurrentUserResponse, CustomError> {
  return useQuery<CurrentUserResponse, CustomError>({
    queryKey: ["auth-user"],
    queryFn: async () => {
      const response = await axiosInstance.get<CurrentUserResponse>(getCurrentUserRoute);
      return response.data;
    },
    staleTime: 0,
    // retry: (failureCount, error) => {
    //   // Don't retry on 401 or 403
    //   if (error.status === 401 || error.status === 403) return false;
    //   return failureCount < 2;
    // },
  });
}

export const signInMutationFn = async (data: SignInRequest): Promise<SignInResponse> => {
  const response = await axiosInstance.post(signInRoute, data);
  return response.data;
};
export const useSignInMutation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get("returnUrl");

  return useMutation({
    mutationFn: signInMutationFn,
    onSuccess: async data => {
      toast.success("success");
      const user = data?.user;
      const decodedUrl = returnUrl ? decodeURIComponent(returnUrl) : null;
      await navigate(decodedUrl ?? `/workspace/${user?.currentWorkspace}`);
    },
    onError: error => {
      toast.error(error.message);
    },
  });
};

export const signUpMutationFn = async (data: SignUpRequest) => {
  const response = await axiosInstance.post(signUpRoute, data);
  return response.data;
};
export const useSignUpMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signUpMutationFn,
    onSuccess: async _ => {
      toast.success("Account created successfully!");
      await navigate("/"); // redirect to SignIn page
    },
    onError: error => {
      toast.error(error.message);
    },
  });
};

export const signOutMutationFn = async () => {
  const response = await axiosInstance.post(signOutRoute);
  return response.data;
};
export const useSignOutMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signOutMutationFn,
    onSuccess: _ => {
      toast.success("Signed out successfully!");
      void navigate("/");
    },
    onError: error => {
      toast.error(error.message);
    },
  });
};
