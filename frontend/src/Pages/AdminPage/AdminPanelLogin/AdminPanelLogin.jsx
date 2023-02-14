import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminPanelLogin.css";
export default function AdminPanelLogin() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/admin-panel/editCoin");
        }
  return (
    <>
      <h1 className="home-page-header">Admin Panel</h1>
      <form className="login-form" action="submit" onSubmit={handleSubmit}>
        <div className="login-input">
          <label htmlFor="login-input" className="label">
            Login
          </label>
          <input
            type="text"
            name="login"
            id="login-input"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="password">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            className="password-input"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="sign-in-button">Sign in</button>
      </form>
    </>
  );
}
