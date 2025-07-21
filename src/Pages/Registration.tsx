import Button from "../Components/Button";
import Input from "../Components/Input"; // <-- import your reusable Input
import { TbFlower } from "react-icons/tb"; // Tabler Icons (minimal flower)
import { LuBookOpen } from "react-icons/lu"; // Nice open book, outlined
import { LuPencil } from "react-icons/lu"; // Lucide pencil (lightweight)

export default function RegistrationPage() {
  return (
    <div className="min-h-screen flex items-center justify-center ]#' px-4">
      <div className="w-full max-w-sm bg-gray-100 rounded-2xl shadow-custom p-6 text-center">
        <h2 className="text-xl font-bold mb-1">
          Welcome Onboard!{" "}
          <span className="inline-block">
            <TbFlower />
          </span>
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Let’s help you meet up your tasks
        </p>

        {/* Emoji */}
        <div className="text-2xl mb-6 flex justify-center gap-4">
          <LuBookOpen />
          <LuPencil />
        </div>

        <form className="flex flex-col gap-4">
          <Input type="text" placeholder="Username" />
          <Input type="tel" placeholder="Phone" />
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Button variant="custom">Register</Button>
        </form>

        <p className="text-bold text-gray-900 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-pink-500 font-medium">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
