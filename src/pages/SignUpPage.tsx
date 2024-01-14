import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useCreateUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { RegisterUserForm } from "../types/auth.types";

export default function SignUp() {
  const [state, setState] = useState<RegisterUserForm>({
    username: "",
    password: "",
    email: "",
  });

  const navigate = useNavigate();
  const mutation = useCreateUser();

  const { username, password, email } = state;

  const handleUserFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async () => {
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
          name="username"
          onChange={handleUserFormChange}
          variant="outlined"
          label={"Username"}
          placeholder={"Username"}
        />
        <TextField
          value={password}
          name="password"
          type="password"
          onChange={handleUserFormChange}
          variant="outlined"
          label={"Password"}
          placeholder={"Password"}
        />
        <TextField
          name="email"
          value={email}
          onChange={handleUserFormChange}
          variant="outlined"
          label={"Email"}
          placeholder={"Email"}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </div>
  );
}
