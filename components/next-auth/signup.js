import { useState, useRef } from "react";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";

async function createUser(username, password) {
  const response = await axios.post("/api/auth/signup", {
    username,
    password,
  });

  return response.data;
}

function SignupForm() {
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();

    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // Can add additional validation here later if needed.

    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        username: enteredUsername,
        password: enteredPassword,
      });

      if (!result.error) {
        router.replace("/");
      }

      console.log(result);
    } else {
      try {
        const result = await createUser(enteredUsername, enteredPassword);
        console.log(result);
      } catch (error) {
        console.log(error.response.data);
      }
    }
  }

  return (
    <section>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" required ref={usernameInputRef} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button type="button" onClick={switchAuthModeHandler}>
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      </form>
    </section>
  );
}

export default SignupForm;
