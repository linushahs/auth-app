import { useMutation } from "@tanstack/react-query";
import { Variables } from "graphql-request";
import { FormEventHandler, useState } from "react";
import { graphQLClient } from "../App";
import { sendVerificationOTP, signin } from "../graphql";

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

  const sendVerificationMn = useMutation({
    mutationFn: async (input: Variables) => {
      const data = await graphQLClient.request(sendVerificationOTP, { input });
      return data;
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log("run");
    // sendVerificationMn.mutate({ email });
    // mutate({ email, password });
  };

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
        className="mb-2"
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
