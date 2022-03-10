import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "../components/Header";
import { auth, signInWithGoogle } from "../components/Firebase";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { signInWithEmailAndPassword } from "../components/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button, Card, Form, FormControl, Row, Col } from "react-bootstrap";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) history.replace("/dashboard");
  }, [user, loading]);
  return (
    <Card id="login">
      <Card.Body className="login__container">
        <h2 className="text-center mb-4">Encrypted Wallet</h2>
        <Form.Group className="mb-2">
          <Form.Control
            type="text"
            id="userEmail"
            className="login__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            type="password"
            id="userPassword"
            className="login__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button id="loginButton" onClick={() => signInWithEmailAndPassword(email, password)}>
            Login
          </Button>
          <Button id="loginWithGoogleButton" onClick={signInWithGoogle}>
            Login with Google
          </Button>
        </div>
        <div className="w-100 text-center mt-2 mb-2">
          <Link to="/forgot-password">Forgot Your Password?</Link>
        </div>
        <div className="w-100 text-center mb-2">
          Don't have an account? <Link to="/signup">Register</Link> now.
        </div>
      </Card.Body>
    </Card>
  );
}
