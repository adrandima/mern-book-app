import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav } from "react-bootstrap";
import "./assets/components/index.css";
import "./assets/components/signInUp.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

import SignInUp from "./containers/User/signInUp";
import Book from "./containers/Book/book";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/sign");
    }
  }, [navigate]);

  const handleSignOut = () => {
    // Remove the JWT token from localStorage
    localStorage.removeItem("token");

    // Redirect to the sign-in page
    navigate("/sign");
  };

  return (
    <div className="App">
      <Navbar expand="lg" fixed="top" bg="light" variant="light">
        <Navbar.Brand as={Link} to={"/book"}>
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarToggler" />
        <Navbar.Collapse id="navbarToggler">
          <Nav className="ml-auto">
            {localStorage.getItem("token") ? (
              <Nav.Link onClick={handleSignOut}>Sign Out</Nav.Link>
            ) : (
              <>
                <Nav.Link as={Link} to={"/sign-in"}>
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div className="auth-wrapper">
        <Routes>
          <Route path="/" element={<SignInUp />} />
          <Route path="/sign" element={<SignInUp />} />
          <Route path="/book" element={<Book />} />
          <Route path="*" element={null} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
