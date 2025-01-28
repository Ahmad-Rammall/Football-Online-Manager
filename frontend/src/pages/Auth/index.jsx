import useAsync from "../../../hooks/useAsync";
import { useEffect, useState } from "react";
import "./index.css";
import { authDataSource } from "../../core/api/auth";
import { useNavigate } from "react-router-dom";

const TextInput = ({ type = "text", placeholder, value, onChange, label }) => {
  return (
    <p className="inputContainer">
      <label>{label}</label>
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
      />
    </p>
  );
};

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const sendAuth = useAsync({
    fn: authDataSource.authenticateUser,
    onSuccess: () => {
      console.log(sendAuth.result.data);

      localStorage.setItem("token", sendAuth.result.data.token);
      navigate("/");
    },
    onError: () => {
      console.log(sendAuth.error);
    },
  });

  return (
    <div className={"authWrapper"}>
      <div className={"authContainer"}>
        <div className={"topContainer"}>
          <div className={"logo"}>
            <img src="/logo.png" width={70} />
          </div>
        </div>

        <TextInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          label="Email address"
        />

        <TextInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          label="Password"
          forgotPassword={true}
        />

        <button
          className={"loginButton"}
          onClick={() => sendAuth.main({ email, password })}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Auth;
