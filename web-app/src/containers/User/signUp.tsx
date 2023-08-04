import React, { ChangeEvent, FormEvent, useState } from "react";

interface IRegUser {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm: React.FC<{
  user: IRegUser;
  handleUserChange: (name: string, value: string) => void;
  handleUserOnSubmit: (evt: FormEvent<HTMLFormElement>) => void;
}> = ({ user, handleUserChange, handleUserOnSubmit }) => {
  const [valid, setValid] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    let isValid = true;
    let error = "";
  
    if (name === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailPattern.test(value);
      error = isValid ? "" : "Please enter a valid email";
    } else if (name === "password" || name === "confirmPassword") {
      isValid = value.length >= 6;
      error = isValid ? "" : "Password must be at least 6 characters long";
    }
  
    if (name === "confirmPassword") {
      isValid = value === user.password;
      error = isValid ? "" : "Passwords do not match";
    }
  
    setValid(isValid);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    handleUserChange(name, value);
  };
  

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleUserOnSubmit}>
        <h1>Create Account</h1>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {errors.email && <span className="error">{errors.email}</span>}
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Password"
        />
        {errors.password && <span className="error">{errors.password}</span>}
        <input
          type="password"
          name="confirmPassword"
          value={user.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
        />
        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
        <button disabled={!valid}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
