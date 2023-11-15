import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import useCreateUser from "../hooks/useCreateUser";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const mutation = useCreateUser();

  const handleUsernameInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUsername(event.target.value);
  };

  const handlePasswordInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(event.target.value);
  };

  const handleEmailInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmail(event.target.value);
  };

  const submit = async () => {
    try {
      await mutation.mutateAsync({ username, password, email });
      alert("Registered");
      navigate("/login");
    } catch (e) {
      console.error(e);
      alert("Fail to Sign Up");
    }
  };

  return (
    <div>
      <h1>Sign-Up</h1>

      <Box>
        <TextField
          value={username}
          onChange={handleUsernameInputChange}
          variant="outlined"
          label={"Username"}
          placeholder={"Username"}
        />
        <TextField
          value={password}
          type="password"
          onChange={handlePasswordInputChange}
          variant="outlined"
          label={"Password"}
          placeholder={"Password"}
        />
        <TextField
          value={email}
          onChange={handleEmailInputChange}
          variant="outlined"
          label={"Email"}
          placeholder={"Email"}
        />
        <Button variant="contained" color="primary" onClick={submit}>
          Submit
        </Button>
      </Box>
    </div>
  );
}
