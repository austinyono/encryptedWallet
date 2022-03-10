import React, { useState, useEffect, useLayoutEffect } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Header from "../components/Header";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../components/Firebase";
import firebase from "@firebase/app-compat";

export default function Dashboard({ user }) {
  return (
    <div className="dashboard">
      <div className="dashboard__container">
        <Card>
          <Card.Body>
            <h3 className="text-center mb-2">Profile</h3>
            <Link to="/card-list" className="btn btn-primary w-100 mt-3">
              Card List
            </Link>
            <Link to="/add-card" className="btn btn-primary w-100 mt-3">
              Add Card
            </Link>
          </Card.Body>
          <div className="w-100 text-center mt-2 mb-3">
            <Button variant="primary" id="logoutButton" onClick={logout}>
              Logout
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
