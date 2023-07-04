import { useMutation } from "@tanstack/react-query";
import { Variables } from "graphql-request";
import { FormEventHandler, useState } from "react";
import { graphQLClient } from "../App";
import { signin } from "../graphql";

interface MnDataTypes {
  data: undefined | unknown;
  isSuccess: boolean;
  isLoading: boolean;
  mutate: () => void;
  isError: boolean;
  error: null | unknown;
}

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { data, isSuccess, mutate, isLoading, isError, error } = useMutation({
    mutationFn: async (input: Variables) => {
      const data = await graphQLClient.request(signin, { input });
      return data;
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutate({ email, password });
  };

  if (isError) {
    alert((error as any).response.errors[0].message);
  }

  if (isSuccess) return <h1>{(data as any).toString()}</h1>;
  return (
    <form action="" onSubmit={handleSubmit}>
      Email:
      <input
        type="text"
        name=""
        id=""
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      Password:
      <input
        type="password"
        name=""
        id=""
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <input type="submit" value="Submit" disabled={isLoading} />
    </form>
  );
}
