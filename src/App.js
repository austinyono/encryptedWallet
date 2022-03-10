import React, { useState, useEffect } from "react";
import Signup from "./pages/Signup";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import AddCard from "./pages/AddCard";
import ForgotPassword from "./pages/ForgotPassword";
import CardList from "./pages/CardList";
import { auth, db } from "./components/Firebase";

export default function App() {
  const [user, setUser] = useState(false);
  const [name, setName] = useState("");

  const fetchUserName = async () => {
    try {
      const query = await db.collection("users").where("uid", "==", user?.uid).get();
      const data = await query.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <Switch>
            {user === false ? (
              <>
                <Route exact path="/card-list">
                  Loading Icon
                </Route>
                <Route exact path="/add-card">
                  Loading Icon
                </Route>
                <Route exact path="/dashboard">
                  Loading Icon
                </Route>
              </>
            ) : user === null ? (
              <>
                <Route exact path="/">
                  <Login />
                </Route>
                <Route exact path="/signup">
                  <Signup />
                </Route>
                <Route exact path="/forgot-password">
                  <ForgotPassword />
                </Route>
                <Redirect from="/card-list" to="/" />
                <Redirect from="/add-card" to="/" />
                <Redirect from="/dashboard" to="/" />
              </>
            ) : (
              <>
                <Route exact path="/card-list">
                  <CardList />
                </Route>
                <Route exact path="/add-card">
                  <AddCard />
                </Route>
                <Route exact path="/dashboard">
                  <Dashboard />
                </Route>
                <Redirect from="/" to="/dashboard" />
                <Redirect from="/signup" to="/dashboard" />
                <Redirect from="/forgot-password" to="/dashboard" />
              </>
            )}
            <Route>Page Not Found</Route>
          </Switch>
        </Router>
      </div>
    </Container>
  );
}
