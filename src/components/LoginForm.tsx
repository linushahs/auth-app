import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form action="">
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
      <input type="submit" value="Submit" />
    </form>
  );
}
