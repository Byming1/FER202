import React, { useState } from "react";
import { Button, Container, Form, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { instance } from "../../axios/Axios";
import { useUser } from "../../context/UserContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });

    try {
      const response = await instance.get("/users");
      const foundUser = response.data.find(
        (user) => user.email === email && user.password === password
      );
      if (foundUser) {
        login(foundUser);
        navigate("/");
        return foundUser;
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please try again.");
      return null;
    }
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container
        style={{
          maxWidth: "400px",
        }}
      >
        <div
          style={{
            backgroundColor: "#141414",
            padding: "58px 20px",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
            opacity: "0.8",
          }}
        >
          <h1
            style={{
              color: "#E50914",
              fontSize: "1.75rem",
              fontWeight: "700",
              textAlign: "center",
              marginBottom: "8px",
              letterSpacing: "1px",
            }}
          >
            MOVIE APP
          </h1>
          <p
            style={{
              color: "#8c8c8c",
              fontSize: "0.875rem",
              textAlign: "center",
              marginBottom: "28px",
            }}
          >
            Sign in to your account
          </p>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label
                style={{
                  color: "#b3b3b3",
                  fontSize: "0.875rem",
                  fontWeight: "400",
                  marginBottom: "6px",
                }}
              >
                Email
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  backgroundColor: "#1E1E1E",
                  border: "1px solid #3a3a3a",
                  color: "#ffffff",
                  padding: "10px 10px",
                  borderRadius: "10px",
                  fontSize: "0.875rem",
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" style={{ position: "relative" }}>
              <Form.Label
                style={{
                  color: "#b3b3b3",
                  fontSize: "0.875rem",
                  fontWeight: "400",
                  marginBottom: "6px",
                }}
              >
                Password
              </Form.Label>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  backgroundColor: "#1E1E1E",
                  border: "1px solid #3a3a3a",
                  color: "#ffffff",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  fontSize: "0.875rem",
                }}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "38px",
                  color: "#808080",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                <i
                  className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}
                ></i>
              </span>
            </Form.Group>

            <div
              className="d-flex justify-content-between align-items-center"
              style={{ marginBottom: "12px" }}
            >
              <Form.Check
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                label="Remember me"
                style={{
                  color: "#b3b3b3",
                  fontSize: "0.875rem",
                }}
              />
              <Link
                to="/forgot-password"
                style={{
                  color: "#E50914",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                }}
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              style={{
                backgroundColor: "#E50914",
                border: "none",
                color: "#fff",
                padding: "10px",
                fontSize: "0.9375rem",
                fontWeight: "600",
                borderRadius: "10px",
                width: "100%",
                marginTop: "8px",
                marginBottom: "16px",
              }}
            >
              Sign In
            </Button>

            <div
              style={{
                textAlign: "center",
                color: "#737373",
                fontSize: "0.875rem",
                marginBottom: "24px",
              }}
            >
              <span>New Movie App? </span>
              <Link
                to="/signup"
                style={{
                  color: "#E50914",
                  textDecoration: "none",
                  fontWeight: "400",
                }}
              >
                Create an account
              </Link>
            </div>
          </Form>

          <div
            style={{
              textAlign: "center",
              paddingTop: "16px",
              fontSize: "0.8125rem",
            }}
          >
            <Link
              to="/terms"
              style={{
                color: "#737373",
                textDecoration: "none",
                margin: "0 8px",
              }}
            >
              Terms of Use
            </Link>
            <span style={{ color: "#737373", margin: "0 4px" }}>|</span>
            <Link
              to="/privacy"
              style={{
                color: "#737373",
                textDecoration: "none",
                margin: "0 8px",
              }}
            >
              Privacy
            </Link>
            <span style={{ color: "#737373", margin: "0 4px" }}>|</span>
            <Link
              to="/help"
              style={{
                color: "#737373",
                textDecoration: "none",
                margin: "0 8px",
              }}
            >
              Help
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Login;
