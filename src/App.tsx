import "./App.css";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

function App() {
  return (
    <div>
      <h1>LoginForm:</h1>
      <LoginForm /> <br />
      <br />
      <h1>SignupForm: </h1>
      <SignupForm />
    </div>
  );
}

export default App;
