import { Variables } from "graphql-request";
import { graphQLClient } from "../App";
import { sendVerificationOTP, signin, signup, verifyAccount } from "../graphql";

export const signupFn = async (input: Variables) => {
  const data = await graphQLClient.request(signup, { input });
  return data;
};

export const sendVerificationFn = async (input: Variables) => {
  const data = await graphQLClient.request(sendVerificationOTP, { input });
  return data;
};

export const verifyAccountFn = async (input: Variables) => {
  const data = await graphQLClient.request(verifyAccount, { input });
  return data;
};

export const signinFn = async (input: Variables) => {
  const data = await graphQLClient.request(signin, { input });
  return data;
};
