import React, { useEffect, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Header from "../components/Header";
import { logout } from "../components/Firebase";
import { auth, db } from "../components/Firebase";

export default function AddCard({ user, ciphertext }) {
  const [cardValue, setCardValue] = useState("");
  const [cardExpirationNumber, setCardExpirationNumber] = useState("");
  const [cardCVVNumber, setCardCVVNumber] = useState("");
  const history = useHistory();

  useEffect(() => {
    console.log("card", cardValue);
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    if (cardValue.length > 1) {
      setCardValue(cardValue);
      setCardExpirationNumber(cardExpirationNumber);
      setCardCVVNumber(cardCVVNumber);
      var CryptoJS = require("crypto-js");
      var ciphertext = CryptoJS.AES.encrypt(cardValue, auth.currentUser.uid).toString();
      console.log("card number", ciphertext);
      db.collection("users").doc(auth.currentUser.email).collection("cards").add({
        cardNumber: ciphertext,
        cardExpirationNumber: ciphertext,
        cardCVVNumber: ciphertext,
      });
      history.push("/card-list");
    }
  };

  return (
    <div>
      <Card>
        <Card.Body>
          <form onSubmit={submitForm}>
            <div class="form-group">
              <h2 className="text-center mb-3">Card Number</h2>
              <Form.Group className="mb-2">
                <Form.Label>Enter a Card Number to Encrypt it.</Form.Label>
                <br />
                <small class="form-text text-muted">We do not store this value.</small>
                <Form.Control
                  required
                  minLength={1}
                  className="mt-2"
                  type="text"
                  id="cardNumber"
                  value={cardValue}
                  placeholder="Card Number"
                  onChange={(e) => setCardValue(e.target.value)}
                />
                <Form.Control
                  required
                  minLength={1}
                  className="mt-2"
                  type="text"
                  id="cardExpiration"
                  value={cardExpirationNumber}
                  placeholder="Expiration"
                  onChange={(e) => setCardExpirationNumber(e.target.value)}
                />
                <Form.Control
                  required
                  minLength={1}
                  className="mt-2"
                  type="text"
                  id="cardCVV"
                  value={cardCVVNumber}
                  placeholder="CVV"
                  onChange={(e) => setCardCVVNumber(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit" id="cardValueSubmit" className="btn btn-primary w-100 mt-3" onClick={submitForm}>
                Add Card
              </Button>
              <Button
                variant="primary"
                type="submit"
                id="cardValueSubmit"
                className="btn btn-primary w-100 mt-3"
                onClick={() => history.push("/card-list")}
              >
                Card List
              </Button>
            </div>
          </form>
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
