import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../components/Firebase";
import Header from "../components/Header";
import { logout } from "../components/Firebase";

export default function CardList({ user, cardValue }) {
  console.log("Card list", cardValue);
  const history = useHistory();

  return (
    <div>
      <Card>
        <Card.Body>
          <div class="form-group">
            <h2 className="text-center mb-3">Card List</h2>
          </div>
          <div className="w-100 text-center mt-4 mb-1">
            <Button id="backToHome" style={{ marginLeft: "10px" }} variant="secondary" onClick={() => history.push("/dashboard")}>
              Back
            </Button>
            <Button id="logoutButton" style={{ marginLeft: "10px" }} variant="secondary" value="submit" onClick={logout}>
              Logout
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
