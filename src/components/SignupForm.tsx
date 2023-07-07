import { useMutation } from "@tanstack/react-query";
import { FormEventHandler, useState } from "react";
import { sendVerificationFn, signupFn } from "../actions/apiActions";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const [email, setEmail] = useState("suniltraveler2004@gmail.com");
  const [password, setPassword] = useState("Traveler@048");
  const navigate = useNavigate();

  const sendVerificationMn = useMutation({ mutationFn: sendVerificationFn });

  const signupMn = useMutation({
    mutationFn: signupFn,
    onSuccess: () => {
      sendVerificationMn.mutate({ email });
      navigate("/verify");
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    signupMn.mutate({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      Email:
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-2"
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
      <input
        type="submit"
        value="Submit"
        disabled={signupMn.isLoading}
        className="mt-4 cursor-pointer bg-gray-600 text-white rounded-lg py-2 px-4"
      />
    </form>
  );
}
