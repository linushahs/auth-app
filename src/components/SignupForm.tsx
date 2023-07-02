import { useMutation } from "@tanstack/react-query";
import { FormEventHandler, useState } from "react";
import { signup } from "../graphql";
import { request } from "graphql-request";

interface SignupFormInput {
  email: string;
  password: string;
}

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signupMutation = useMutation<void, Error, SignupFormInput>({
    mutationFn: async (data) => {
      await request({
        url: "https://api.internsathi.com/graphql",
        document: signup,
        variables: {
          input: {
            email,
            password,
          },
        },
      });
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    signupMutation.mutate({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      Email:
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      Password:
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <input type="submit" value="Submit" disabled={signupMutation.isLoading} />
    </form>
  );
}
