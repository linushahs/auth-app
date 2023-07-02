import { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <form action="">
        Username:
        <input
          type="text"
          name=""
          id=""
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
    </div>
  );
}

export default App;
