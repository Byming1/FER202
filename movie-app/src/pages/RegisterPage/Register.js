import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../LoginPage/Login.css";
import { instance } from "../../axios/Axios";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validatePassword = (pass) => {
    const minLength = pass.length >= 6;
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    return minLength && hasUpperCase && hasNumber;
  };

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    await instance.get("/users").then((res) => {
      setUsers(res.data);
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      alert(
        "Password must be at least 6 characters and contain at least one uppercase letter and one number!"
      );
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const emailExists = users.some((user) => user.email === email);
    if (emailExists) {
      alert("Email is already registered!");
      return;
    }
    const usernameExists = users.some((user) => user.username === username);
    if (usernameExists) {
      alert("Username is already taken!");
      return;
    }

    const formData = {
      userId: users.length + 1,
      username: username,
      email: email,
      password: password,
      role: "user",
    };

    await instance.post("/users", formData).then((res) => {
      alert("Registration successful! Please log in.");
      window.location.href = "/login";
    });
    console.log("Register attempt:", { username, email, password });
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
            padding: "48px 20px",
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
            Create your account
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
                Username
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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

            <Form.Group className="mb-3" style={{ position: "relative" }}>
              <Form.Label
                style={{
                  color: "#b3b3b3",
                  fontSize: "0.875rem",
                  fontWeight: "400",
                  marginBottom: "6px",
                }}
              >
                Confirm Password
              </Form.Label>
              <Form.Control
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                  className={
                    showConfirmPassword ? "bi bi-eye-slash" : "bi bi-eye"
                  }
                ></i>
              </span>
            </Form.Group>

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
              Sign Up
            </Button>

            <div
              style={{
                textAlign: "center",
                color: "#737373",
                fontSize: "0.875rem",
                marginBottom: "24px",
              }}
            >
              <span>Already have an account? </span>
              <Link
                to="/login"
                style={{
                  color: "#E50914",
                  textDecoration: "none",
                  fontWeight: "400",
                }}
              >
                Sign in
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

export default Register;
