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
import { LOGIN } from "@/queries";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      if (!username || !password) {
        return toast.error("Please fill the entire form");
      }

      await login({
        variables: { username, password },
      });

      toast.success("Login successful");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error("An error occured");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen p-4 flex justify-center items-center">
      <Card className="mx-auto max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your details and login to your account
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
              onClick={(e) => handleLogin(e)}
              type="submit"
              className="w-full font-semibold"
              disabled={loading}
            >
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm flex space-x-1 items-center justify-center">
            <p>Don't have an account</p>
            <Link to="/register" className="underline">
              Register
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
