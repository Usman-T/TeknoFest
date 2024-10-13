import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { CREATE_USER, LOGIN } from "@/queries";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [createUser] = useMutation(CREATE_USER);
  const [login, result] = useMutation(LOGIN);

  useEffect(() => {
    if (result.data) {
      localStorage.clear();
      const token = result.data.login.value;
      localStorage.setItem("mehtab-user-token", token);
    }

    if (localStorage.getItem("mehtab-user-token")) {
      navigate("/");
    }
  }, [result.data, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      if (!username || !password) {
        return toast.error("Please fill the entire form");
      } else if (username.length < 6) {
        return toast.error("Username is too short");
      } else if (password.length < 8) {
        return toast.error("Password is too short");
      }

      const userCreated = await createUser({
        variables: { username, password },
      });

      if (!userCreated) {
        return toast.error("User could not be created");
      }

      await login({
        variables: { username, password },
      });
    localStorage.setItem("mehtab-user-token", result );
      toast.success("Registration successful");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      if (error.message === "Username not added to system") {
        toast.error("User not added to the system yet");
      } else if (error.message === "Username already exists") {
        toast.error("User already exists, try logging in instead");
      } else if (error.message.includes("Login failed")) {
        toast.error("Login failed");
      } else {
        toast.error("An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen p-4 flex justify-center items-center">
      <Card className="mx-auto max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Regsiter</CardTitle>
          <CardDescription>
            Enter a username and password to regsiter your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Enter username here..."
                disabled={loading}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                placeholder="Enter password here..."
                type="password"
                required
                disabled={loading}
              />
            </div>
            <Button
              onClick={(e) => handleRegister(e)}
              type="submit"
              className="w-full font-semibold"
              disabled={loading}
            >
              Register
            </Button>
          </div>
          <div className="mt-4 text-center flex space-x-1 items-center justify-center text-sm">
            <p>Already have an account?</p>
            <Link to="/login" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
