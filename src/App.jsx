import "./App.css";
import { ContextWork } from "./containers/ContextWork";
import { AuthProvider } from "./context/AuthContext";
import { WelcomePage } from "./containers/WelcomePage";
import { Route, Routes, Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { CalendarPage } from "./containers/Calendar";
import { WorkoutPage } from "./containers/WorkoutContainer";
import { CreateWorkoutPage } from "./containers/CreateWorkoutCont";
import { CreateAccountPage } from "./containers/CreateAccount";
import { ProtectedRoute } from "./components/ProtectedRoute"; 
import { LoginMobilePage } from "./containers/loginPage";

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route index element={<WelcomePage />} />
        <Route path="verification" element={<ContextWork />} />
        <Route path="/calendar" element={<ProtectedRoute element={<CalendarPage />} />} />
        <Route path="/workout" element={<ProtectedRoute element={<WorkoutPage />} />} />
        <Route path="/createWorkout" element={<ProtectedRoute element={<CreateWorkoutPage />} />} />
        <Route path="/createAccount" element={<CreateAccountPage />} />
        <Route path="/loginPage" element={<LoginMobilePage />} />
        <Route path="*" element={<div>This path doesn't exist yet...</div>} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
