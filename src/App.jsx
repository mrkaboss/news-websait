import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyEmail from "./pages/auth/VerifyEmail";
import ResetPassword from "./pages/auth/ ResetPassword";
import TechNews from "./components/TechNews";
import Sports from "./pages/Sports";
import World from "./pages/World";
import Business from "./pages/Business";
import AdminDashboard from "./pages/AdminDashboard";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Politics from "./pages/Politics";
import SearchNews from "./pages/SearchNews";
import News from "./pages/News";
import Teche from "./pages/Teche";
import ClientLogin from "./pages/ClientLogin";
import AdminLogin from "./pages/AdminLogin";
import LiveNews from "./pages/LiveNews";
import NewsTicker from "./components/NewsTicker";
import AddNews from "./pages/AddNews";
import NewsDetails from "./pages/NewsDetails";
import Dashboard from "./pages/Dashboard";
import CategoryNews from "./pages/CategoryNews";
import Finance from "./pages/Finance";
import Entertainment from "./pages/Entertainment";
import Technology from "./pages/Technology";
import Health from "./pages/Health";
import BreakingNews from "./components/BreakingNews";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Contact" element={<Contact />} />
         <Route path="news/:id?" element={<NewsDetails />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="verify-email" element={<VerifyEmail />} />
          <Route path="ResetPassword" element={<ResetPassword />} />
          <Route path="TechNews" element={<TechNews />} />
          <Route path="Sports" element={<Sports />} />
          <Route path="World" element={<World />} />
          <Route path="Business" element={<Business />} />
          <Route path="AdminDashboard" element={<AdminDashboard />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="About" element={<About />} />
          <Route path="Terms" element={<Terms />} />
          <Route path="Politics" element={<Politics />} />
          <Route path="SearchNews" element={<SearchNews />} />
          <Route path="Teche" element={<Teche />} />
          <Route path="ClientLogin" element={<ClientLogin />} />
          <Route path="AdminLogin" element={<AdminLogin />} />
          <Route path="LiveNews" element={<LiveNews />} />
          <Route path="NewsTicker" element={<NewsTicker />} />
          <Route path="AddNews" element={<AddNews />} />
          <Route path="NewsDetails/:id?" element={<NewsDetails />} />
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="CategoryNews" element={<CategoryNews />} />
          <Route path="Finance" element={<Finance />} />
          <Route path="Entertainment" element={<Entertainment />} />
          <Route path="Technology" element={<Technology />} />
          <Route path="Health" element={<Health />} />
          <Route path="breaking-news" element={<BreakingNews />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;