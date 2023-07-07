import { gql } from "graphql-request";

export const signup = gql`
  mutation signup($input: SignUpInput!) {
    signup(input: $input)
  }
`;

export const signin = gql`
  mutation signin($input: SignInInput!) {
    signin(input: $input) {
      accessToken
      refreshToken
    }
  }
`;

export const sendVerificationOTP = gql`
  mutation sendVerificationOtp($input: VerificationOtpInput!) {
    sendVerificationOtp(input: $input)
  }
`;

export const verifyAccount = gql`
  mutation verifyAccount($input: VerifyAccountInput!) {
    verifyAccount(input: $input)
  }
`;
