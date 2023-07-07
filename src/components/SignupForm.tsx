import { FormEventHandler, useState } from "react";
import { sendVerificationFn, signupFn } from "../actions/apiActions";
import { useMutation } from "@tanstack/react-query";

export default function SignupForm() {
  const [email, setEmail] = useState("suniltraveler2004@gmail.com");
  const [password, setPassword] = useState("Traveler@048");

  const signupMn = useMutation({
    mutationFn: signupFn,
    onError: (error) => {
      console.log(error);
    },
  });
  const sendVerificationMn = useMutation({ mutationFn: sendVerificationFn });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    signupMn.mutate({ email, password });
  };

  if (signupMn.isSuccess) sendVerificationMn.mutate({ email });

  return (
    <form onSubmit={handleSubmit}>
      Email:
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {signupMn.isError && <p>Email already exists</p>}
      <br />
      Password:
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <input type="submit" value="Submit" disabled={signupMn.isLoading} />
    </form>
  );
}
