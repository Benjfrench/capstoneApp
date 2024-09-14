import "./App.css";
import { ContextWork } from "./containers/ContextWork";
import { UserProvider } from "./context/UserContext";
import { WelcomePage } from "./containers/WelcomePage";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { CalendarPage } from "./containers/Calendar";
import { WorkoutPage } from "./containers/WorkoutContainer";
import { ConditionalRoute } from "./components/ConditionalRoute";
import { CreateWorkoutPage } from "./containers/CreateWorkoutCont";
// import { CreateAccountPage } from "./containers/CreateAccount";
import { CreateAccountPage } from "./containers/CreateAccount";

const App = () => {
    return (
        <UserProvider>
            <Navbar />
            <Routes>
                <Route index element={<WelcomePage />} />
                <Route path="verification" element={<ContextWork />} />
                <Route path="/calendar" element={<CalendarPage/>}/>
                <Route path="/workout" element={<WorkoutPage/>}/>
                <Route path="/createWorkout" element={<CreateWorkoutPage/>}/>
                {/* <Route path="/createAccount" element={<CreateAccountPage/>}/> */}
                <Route path="/createAccount" element={<CreateAccountPage/>}/>
                <Route path="*" element={<div>This path doesn't exist yet...</div>} />
            </Routes>
        </UserProvider>
    );
};

export default App;
