import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import WorkoutListPage from "./pages/WorkoutListPage";
import WorkoutDetailsPage from "./pages/WorkoutDetailsPage";
import EditWorkoutPage from "./pages/EditWorkoutPage";
import UserProfilePage from "./pages/UserProfilePage";
import ExerciseDetail from "./pages/ExerciseDetail";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <IsPrivate>
              <HomePage />
            </IsPrivate>
          }
        />

        <Route
          path="/workouts"
          element={
            <IsPrivate>
              {" "}
              <WorkoutListPage />{" "}
            </IsPrivate>
          }
        />

        <Route
          path="/workouts/:workoutId"
          element={
            <IsPrivate>
              {" "}
              <WorkoutDetailsPage />{" "}
            </IsPrivate>
          }
        />

        <Route
          path="/workouts/edit/:workoutId"
          element={
            <IsPrivate>
              <EditWorkoutPage />
            </IsPrivate>
          }
        />

        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />{" "}
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
        <Route
          path="/userprofile"
          element={
            <IsPrivate>
              <UserProfilePage />
            </IsPrivate>
          }
        />

        <Route
          path="/exercise/:exerciseId"
          element={
            <IsPrivate>
              <ExerciseDetail />
            </IsPrivate>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
