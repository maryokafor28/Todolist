import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OnboardingCarousel from "./Pages/Onboarding";
import RegistrationPage from "./Pages/Registration";
import Login from "./Pages/Login";
import TodoApp from "./Pages/Todo";
import Layout from "./Components/Layout";
import { useThemeUser } from "./Context/useThemeUser";

function App() {
  const { theme } = useThemeUser();

  return (
    // This toggles `dark` class globally
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-[#f0f0f0] dark:bg-gray-900 dark:text-white">
        <Router>
          <Routes>
            {/* Pages WITHOUT sidebar */}
            <Route path="/" element={<OnboardingCarousel />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/login" element={<Login />} />

            {/* Pages WITH sidebar */}
            <Route element={<Layout />}>
              <Route path="/todo" element={<TodoApp />} />
              {/* <Route path="profile" element={<ProfilePage />} /> */}
              {/* <Route path="settings" element={<SettingsPage />} /> */}
              {/* <Route path="about" element={<AboutPage />} /> */}
            </Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
