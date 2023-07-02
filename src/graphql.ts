import { gql } from "graphql-request";

export const signup = gql`
  mutation signup($input: SigninInput!) {
    signup(input: $input)
  }
`;

export const sigin = gql`
  mutation signin($input: SigninInput!) {
    signin(input: $input) {
      accessToken
      refreshToken
    }
  }
`;

export const sendVerificationOTP = gql`
  mutation sendVerificationOtp($input: VerificationOtpInput) {
    sendVerificationOtp(input: $input)
  }
`;
