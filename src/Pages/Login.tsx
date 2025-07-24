import { useState } from "react";
import Input from "../Components/Input";
import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";
import { ZigzagImage, ArrowhitImage } from "../Components/Icons/Icon";
import { TbFlower } from "react-icons/tb";

type User = {
  username: string | number;
  password: string | number;
};

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const storedUsers: User[] = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const user = storedUsers.find(
      (u: User) =>
        String(u.username).trim() === username.trim() &&
        String(u.password).trim() === password.trim()
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/todo");
    } else {
      alert("Invalid username or password. Please register first.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-sm rounded-2xl shadow-lg p-6 text-center">
        <h2 className="text-xl font-bold mb-1">
          Welcome Back!{" "}
          <span className="inline-block">
            <TbFlower />
          </span>
        </h2>

        <div className="flex flex-col items-center my-4 gap-2">
          <ArrowhitImage className="w-12 h-12" />
          <ZigzagImage className="w-16 h-16" />
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="text-left text-sm text-purple-400 hover:underline cursor-pointer">
            Forgot Password
          </div>

          <Button type="submit" variant="custom">
            Login
          </Button>
        </form>

        <p className="text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="text-pink-500 font-bold">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
