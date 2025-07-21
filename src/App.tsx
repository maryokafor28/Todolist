import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OnboardingCarousel from "./Pages/Onboarding";

import TodoApp from "./Pages/Todo";
function App() {
  return (
    <div className="min-h-screen bg-[#f0f0f0]">
      <Router>
        <Routes>
          <Route path="/" element={<OnboardingCarousel />} />
          <Route path="/todo" element={<TodoApp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
