import React, { useContext, useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import authContext from "../contexts/AuthContext";
import useAxios from "../hooks/useAxios";

function HomePage() {
  const navigate = useNavigate();
  const { user, logout } = useContext(authContext);
  const { get } = useAxios();
  const handleLogout = async () => {
    // Handle logout logic here, such as clearing user data and tokens
    console.log("Logging out...");
    await logout();
    navigate("/login"); // Redirect to login page after logout
  };
  const [books, setBooks] = useState([]);
  useEffect(() => {
    get("/books").then((data) => setBooks(data));
  }, []);

  // console.log(books);
  return (
    <div>
      {/* Your homepage content here */}
      <Typography variant="h5" component="h2" gutterBottom>
        Hello, {user.username}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Logout
      </Button>
      {/* Other components and content */}
      <Typography variant="h5" component="h2" gutterBottom>
        {" "}
        Books{" "}
      </Typography>
      <ol>
        {books && books.map((book, index) => <li key={index}>{book.name}</li>)}
      </ol>
    </div>
  );
}

export default HomePage;
