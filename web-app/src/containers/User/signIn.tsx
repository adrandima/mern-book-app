import React, { ChangeEvent, FormEvent, useState } from "react";

interface ILogin {
  email: string;
  password: string;
  submited: boolean;
}

const SignInForm: React.FC<{
  login: ILogin;
  handleLoginChange: (name: string, value: string) => void;
  handleLoginOnSubmit: (evt: FormEvent<HTMLFormElement>) => void;
}> = ({ login, handleLoginChange, handleLoginOnSubmit }) => {
  const [valid, setValid] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    let isValid = true;
    let error = "";

    if (name === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailPattern.test(value);
      error = isValid ? "" : "Please enter a valid email";
    } else if (name === "password") {
      isValid = value.length >= 6;
      error = isValid ? "" : "Password must be at least 6 characters long";
    }

    setValid(isValid);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    handleLoginChange(name, value);
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleLoginOnSubmit}>
        <h1>Sign in</h1>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={login.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={login.password}
          onChange={handleChange}
        />
        {errors.password && <span className="error">{errors.password}</span>}
        {!login.submited ? <button disabled={!valid}>Sign In</button>:null}
      </form>
    </div>
  );
};

export default SignInForm;
