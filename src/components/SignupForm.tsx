import { useMutation } from "@tanstack/react-query";
import { Variables } from "graphql-request";
import { FormEventHandler, useState } from "react";
import { graphQLClient } from "../App";
import { signup } from "../graphql";

interface SignupFormInput {
  input: {
    email: string;
    password: string;
  };
}

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { data, isSuccess, mutate, isLoading } = useMutation({
    mutationFn: async (input: Variables) => {
      const data = await graphQLClient.request(signup, { input });
      return data;
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutate({ email, password });
  };

  if (isSuccess) return <h1>{(data as any).toString()}</h1>;

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
      <input type="submit" value="Submit" disabled={isLoading} />
    </form>
  );
}
