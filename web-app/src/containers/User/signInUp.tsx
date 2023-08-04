import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import SignInForm from "./signIn";
import SignUpForm from "./signUp";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { login, register } from "../../redux/action/authActions";
import { useNavigate } from "react-router-dom";
import {fetchBooks} from "../../redux/action/bookActions";

interface ISignInUp {
  userLogin: (email: string, password: string) => void;
  userRegister: (email: string, password: string) => void;
}

const SignInUp: React.FC<ISignInUp> = ({ userLogin, userRegister }) => {
  const [type, setType] = useState<string>("signIn");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/book");
    }
    return () => {
      fetchBooks();
    };
  }, [navigate]);

  const [loading, setLoading] = useState(false);

  const [login, setLogin] = useState({
    email: "",
    password: "",
    submited: false,
  });

  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    submited: false,
  });

  const handleLoginChange = (name: string, value: string) => {
    setLogin({
      ...login,
      [name]: value,
    });
  };

  const handleUserChange = (name: string, value: string) => {
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleUserOnSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setLoading(true);

    await userRegister(user.email, user.password);

    for (const key in user) {
      setUser((prevState) => ({
        ...prevState,
        [key]: "",
      }));
    }

    setLoading(false);
    navigate("/book");
  };

  const handleloginOnSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setLoading(true);

    await userLogin(login.email, login.password);

    for (const key in login) {
      setLogin((prevState) => ({
        ...prevState,
        [key]: "",
      }));
    }

    setLoading(false);
    navigate("/book");
  };

  const handleOnClick = (text: string) => {
    if (text !== type) {
      setType(text);
    }
  };

  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");

  return (
    <div className="SignIn">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className={containerClass} id="container">
          <SignUpForm
            handleUserChange={handleUserChange}
            handleUserOnSubmit={handleUserOnSubmit}
            user={user}
          />
          <SignInForm
            handleLoginChange={handleLoginChange}
            handleLoginOnSubmit={handleloginOnSubmit}
            login={login}
          />
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button
                  className="ghost"
                  id="signIn"
                  onClick={() => handleOnClick("signIn")}
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start the journey with us</p>
                <button
                  className="ghost"
                  id="signUp"
                  onClick={() => handleOnClick("signUp")}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      userLogin: login,
      userRegister: register,
      fetchBooks: fetchBooks,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(SignInUp);
