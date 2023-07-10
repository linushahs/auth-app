import { useMutation } from "@tanstack/react-query";
import { FormEventHandler, useState } from "react";
import { signinFn } from "../actions/apiActions";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { data, isSuccess, mutate, isLoading } = useMutation({
    mutationFn: signinFn,
    onSuccess: () => {
      alert("You have been successfully logged in.");
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutate({ email, password });
  };

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
      {isSuccess && (data as any).signin.accessToken}
      <br />
      <input type="submit" value="Submit" disabled={isLoading} />
    </form>
  );
}
