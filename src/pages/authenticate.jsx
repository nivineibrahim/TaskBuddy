import { useState, useEffect, useContext } from "react";
import LoginForm from "../component/navbar/login-form/login-form";
import RegisterForm from "../component/register-form/register-form";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../utils/context";
import {React} from "react";
function Authenticate() {
  const [registerMode, setRegisterMode] = useState(false);
  const { user, loading } = useContext(MainContext);
  const navigate = useNavigate("/");

  useEffect(() => {
    !loading && user && navigate("/");
  }, [loading, user]);

  return registerMode ? (
    <div className="authenticate">
      <RegisterForm />
      <p>
        Already have an account?
        <b
          onClick={() => setRegisterMode(false)}
          className="authenticate__anchor">
          Login
        </b>
      </p>
    </div>
  ) : (
    <div className="authenticate">
      <LoginForm />
      <p>
        Don't have an account?
        <b
          onClick={() => setRegisterMode(true)}
          className="authenticate__anchor">
          Register
        </b>
      </p>
    </div>
  );
}
export default Authenticate;