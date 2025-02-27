import "./App.css";
import LoginForm from "./Components/LoginForm";
import SignupForm from "./Components/SignupForm";
import Home from "./Components/Home";
import ContactForm from "./Components/ContactForm";
import LandingPage from "./Components/LandingPage";
import UserProfile from "./Components/UserProfilePage"
import AdminDashboard from "./Components/AdminDashboard";
import ManageUsers from "./Components/ManageUsers";
import ManageContacts from "./Components/ManageContacts";
import ManageGroups from "./Components/ManageGroups";
import Profile from "./Components/Profile";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<LandingPage />}></Route>
          <Route path="/signup" element={<SignupForm />}></Route>
          <Route path="/login" element={<LoginForm />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/createContact" element={<ContactForm />}></Route>
          <Route path="/userProfile" element={<UserProfile />}></Route>
          <Route path="/adminDashboard" element={<AdminDashboard />}></Route>
          <Route path="/manageUsers" element={<ManageUsers />}></Route>
          <Route path="/manageContacts" element={<ManageContacts />}></Route>
          <Route path="/manageGroups" element={<ManageGroups />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
