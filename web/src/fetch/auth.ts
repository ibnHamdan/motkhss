import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOCAL_STORAGE_JWT, callEndpoint } from '.';
import { ENDPOINT_CONFIGS, SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from '@motkhss/shared';

export const isLoggedIn = (): boolean => {
  const jwt = localStorage.getItem(LOCAL_STORAGE_JWT);

  //return useMemo(() => ({ loggedIn: !!jwt }), [jwt]);
  return !!jwt;
};

export const signIn = async (login: string, password: string) => {
  const { method, url } = ENDPOINT_CONFIGS.signin;
  const res = await callEndpoint<SignInRequest, SignInResponse>(url, method, { login, password });

  localStorage.setItem(LOCAL_STORAGE_JWT, res.jwt);
};

export const signUp = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  userName: string
) => {
  const { method, url } = ENDPOINT_CONFIGS.signup;
  const res = await callEndpoint<SignUpRequest, SignUpResponse>(url, method, {
    firstName,
    lastName,
    email,
    password,
    userName,
  });

  localStorage.setItem(LOCAL_STORAGE_JWT, res.jwt);
};

export const signOut = () => {
  localStorage.removeItem(LOCAL_STORAGE_JWT);
};
