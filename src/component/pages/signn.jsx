import React, { useState, useEffect } from "react";
import { Tabs, Tab, Input, Link, Button, Card, CardBody } from "@nextui-org/react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [selected, setSelected] = useState("login");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [storedName, setStoredName] = useState("");  // Store the name from localStorage

  // Check if user is already logged in on initial load
  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    const storedUserName = localStorage.getItem('userName');  // Retrieve the stored name

    if (userToken) {
      setIsLoggedIn(true);
    }

    if (storedUserName) {
      setStoredName(storedUserName);  // Set the stored name in state
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Both email and password are required.");
      return;
    }

    // Simulate a check to see if the user is already logged in
    if (isLoggedIn) {
      toast.error("You are already logged in. Please log out before trying again.");
      return;
    }

    if (password.length < 7) {
      toast.error("Password must be at least 7 characters long.");
    } else {
      // Simulate successful login
      localStorage.setItem('userToken', 'dummyToken'); // Store token for demo purposes
      setIsLoggedIn(true);
      toast.success("Successfully logged in!");
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("All fields are required.");
      return;
    }

    if (password.length < 7) {
      toast.error("Password must be at least 7 characters long.");
    } else {
      // Simulate successful sign-up
      localStorage.setItem('userToken', 'dummyToken'); // Store token for demo purposes
      localStorage.setItem('userName', name);  // Store name in localStorage
      setIsLoggedIn(true);
      setEmail("");
      setPassword("");
      setName("");
      setSelected("login"); // Switch to login tab
      toast.success("Successfully signed up! You can now log in.");
    }
  };

  const handleLogout = () => {
    // Clear user data from localStorage and update state
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');  // Clear the stored name from localStorage
    setIsLoggedIn(false);
    setStoredName("");  // Reset the stored name in state
    toast.success("Successfully logged out!");
  };

  return (
    <div className="flex flex-col w-full">
      <Card className="max-w-full w-[340px] h-[400px]">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key="login" title="Login">
              <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                <Input
                  isRequired
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="text-center text-small">
                  Need to create an account?{" "}
                  <Link size="sm" onPress={() => setSelected("sign-up")}>
                    Sign up
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary" type="submit">
                    Login
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key="sign-up" title="Sign up">
              <form className="flex flex-col gap-4 h-[300px]" onSubmit={handleSignUp}>
                <Input
                  isRequired
                  label="Name"
                  placeholder="Enter your name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  isRequired
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="text-center text-small">
                  Already have an account?{" "}
                  <Link size="sm" onPress={() => setSelected("login")}>
                    Login
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary" type="submit">
                    Sign up
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>

      {/* Show Logout button only when logged in */}
      {isLoggedIn && (
        <div className="flex justify-center mt-4">
          <Button color="error" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      )}

      {/* Show the stored name when logged in */}
      {isLoggedIn && storedName && (
        <div className="flex justify-center mt-4">
          <p>Welcome, {storedName}!</p>
        </div>
      )}

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
}
