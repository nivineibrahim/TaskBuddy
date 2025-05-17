import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { signInUser,getFrontendErrorMessage } from "../../../utils/firebaseFunctions";
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await signInUser(email, password);
    if (res.success) {
      navigate("/");
    } else {
      setError(getFrontendErrorMessage(res.error));
    }
  };

  return (
    <form onSubmit={handleLogin} className="form">
      <h2 className="form__title">log into your account</h2>
      <div className="form__group">
        <label htmlFor="email" className="form__label">
          Email
        </label>
        <input
          type="email"
          className="form__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          required
          placeholder="Enter your email"
        />
      </div>
      <div className="form__group">
        <label htmlFor="password" className="form__label">
          password
        </label>
        <input
          type="password"
          className="form__input"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          id="password"
          required
          placeholder="Enter your password"
        />
      </div>
      {error && (
        <div className="form__group">
          {" "}
          <div className="form__error">{error}</div>
        </div>
      )}
      <button className="form__button primary" type="submit">
        Log in
      </button>
    </form>
  );
}
export default LoginForm;