import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, registerWithEmailAndPassword, signInWithGoogle } from "../components/Firebase";
import Header from "../components/Header";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };

  return (
    <div className="register">
      <div className="register__container">
        <input type="text" className="register__textBox" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />
        <input type="text" className="register__textBox" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail Address" />
        <input type="password" className="register__textBox" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button className="register__btn" onClick={register}>
          Register
        </button>
        <button className="register__btn register__google" onClick={signInWithGoogle}>
          Register with Google
        </button>
        <div>
          Already have an account? <Link to="/">Login</Link> now.
        </div>
      </div>
    </div>
  );
}
