import { useContext, useEffect, useState } from "react";
import authContext from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

import {
  Container,
  TextField,
  Button,
  Typography,
  Link,
  Grid,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const LoginPage = () => {
  const { user, login, error } = useContext(authContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here
    // console.log(`Username: ${username}, Password: ${password}`);
    login({ username, password });
  };

  if (user) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      {error && <Typography color="error">{error}</Typography>}
      <Container maxWidth="xs">
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
          <LockOutlinedIcon fontSize="large" />
          <Typography variant="h5" component="h2" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              required
              fullWidth
              label="Username"
              margin="normal"
              value={username}
              onChange={handleUsernameChange}
            />
            <TextField
              required
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              value={password}
              onChange={handlePasswordChange}
            />

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </form>
        </Grid>
      </Container>
    </>
  );
};

export default LoginPage;
