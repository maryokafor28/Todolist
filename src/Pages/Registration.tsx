import { useState } from "react";
import Button from "../Components/Button";
import Input from "../Components/Input";
import { TbFlower } from "react-icons/tb";
import { LuBookOpen, LuPencil } from "react-icons/lu";

export default function RegistrationPage() {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !phone || !email || !password) {
      return setError("All fields are required.");
    }

    if (isNaN(Number(phone))) {
      return setError("Phone number must be numeric.");
    }

    if (!email.includes("@") || !email.includes(".")) {
      return setError("Enter a valid email address.");
    }

    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = [
      ...existingUsers,
      { username, phone, email, password },
    ];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Clear form
    setUsername("");
    setPhone("");
    setEmail("");
    setPassword("");
    setError("");

    alert("Registration successful! You can now log in.");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="w-full max-w-sm rounded-2xl shadow-custom p-6 text-center bg-white dark:bg-gray-800">
        <h2 className="text-xl font-bold mb-1">
          Welcome Onboard! <TbFlower className="inline-block" />
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Let’s help you meet up your tasks
        </p>

        <div className="text-2xl mb-6 flex justify-center gap-4">
          <LuBookOpen />
          <LuPencil />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button variant="custom">Register</Button>
        </form>

        <p className="text-bold text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-pink-500 font-medium">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
