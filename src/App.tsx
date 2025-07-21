import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OnboardingCarousel from "./Pages/Onboarding";
import RegistrationPage from "./Pages/Registration";
import Login from "./Pages/Login";
import TodoApp from "./Pages/Todo";
import Layout from "./Components/Layout"; // This contains Sidebar + <Outlet />
// import ProfilePage from "./Pages/ProfilePage";
// import SettingsPage from "./Pages/SettingsPage";
// import AboutPage from "./Pages/AboutPage";

function App() {
  return (
    <div className="min-h-screen bg-[#f0f0f0]">
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
  );
}

export default App;
