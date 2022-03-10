import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout, signInWithGoogle } from "../components/Firebase";

export default function Header({ user }) {
  return (
    <div>
      <div className="Header">
        {user === null ? (
          <div>
            <Link to={{ pathname: "/" }}>Dashboard</Link>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
