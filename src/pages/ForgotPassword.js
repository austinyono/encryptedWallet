import React, { useState, useEffect } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Header from "../components/Header";
import { auth, sendPasswordResetEmail } from "../components/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import firebase from "@firebase/app-compat";

export default function Dashboard() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();
  useEffect(() => {
    if (loading) return;
    if (user) history.replace("/dashboard");
  }, [user, loading]);
  return (
    <div className="reset">
      <div className="reset__container">
        <input type="text" className="reset__textBox" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail Address" />
        <button className="reset__btn" onClick={() => sendPasswordResetEmail(email)}>
          Send password reset email
        </button>
        <div>
          Don't have an account? <Link to="/signup">Register</Link> now.
        </div>
      </div>
    </div>
  );
}
