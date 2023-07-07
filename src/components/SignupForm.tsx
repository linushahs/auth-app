import { FormEventHandler, useState, useEffect } from "react";
import { sendVerificationFn, signupFn } from "../actions/apiActions";
import { useMutation } from "@tanstack/react-query";
import OTPVerification from "./OTPVerification";

export default function SignupForm() {
  const [email, setEmail] = useState("suniltraveler2004@gmail.com");
  const [password, setPassword] = useState("Traveler@048");
  const [isOTPVerificationOpen, setIsOTPVerificationOpen] = useState(true);

  const signupMn = useMutation({
    mutationFn: signupFn,
  });
  const sendVerificationMn = useMutation({ mutationFn: sendVerificationFn });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    signupMn.mutate({ email, password });
  };

  if (signupMn.isSuccess) {
    sendVerificationMn.mutate({ email });
    return (
      <OTPVerification
        isOpen={isOTPVerificationOpen}
        setIsOpen={setIsOTPVerificationOpen}
        email={email}
      />
    );
  }

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
        className="mt-4 bg-gray-700 text-white rounded-lg py-2 px-4"
      />
    </form>
  );
}
