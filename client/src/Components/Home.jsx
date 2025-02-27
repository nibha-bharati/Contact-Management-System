import axios from "axios";
import { useEffect, useState } from "react";
import { data, Link, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import UserSidebar from "./UserSidebar";
import Header from "./Header";

export default function Home() {
  const navigate = useNavigate();
  //const [cookies, removeCookies] = useCookies([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const verifyToken = () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login");
      } else {
        axios
          .get("http://localhost:5000/home", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((result) => {
            console.log(result);
            // Proceed with the home page logic, e.g., displaying contacts.
          })
          .catch((error) => {
            console.log("Error fetching home data", error);
            navigate("/login"); // Redirect if the token is invalid
          });
      }
    };
    verifyToken();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const viewContacts = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.log("Token not found");
    } else {
      axios
        .get("http://localhost:5000/contact/get", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => {
          console.log(result);
          setContacts(result.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
    <Header/>
      <div className="grid">
        <div className="row-start-1 col-span-2"><UserSidebar /></div>
        <div className="row-start-1 col-span-3"><h1 className="mt-20">Hello! <p>Please select an option from the sidebar.</p> </h1></div>
      </div>
      
    </>
  );
}
