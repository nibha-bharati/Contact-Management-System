import { use, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getUserPermissions } from "../Utilities/getPermissionNames";

export default function ContactForm() {
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [nickname, setNickname] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [workinfo, setWorkinfo] = useState();
  const [address, setAddress] = useState();
  const [notes, setNotes] = useState();
  const [website, setWebsite] = useState();
  const [permissions, setPermissions] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
  const creator=userId

  useEffect(() => {
    getUserPermissions(userId)
      .then((permissionNames) => {
        setPermissions(permissionNames);
      })
      .catch((error) => {
        console.error("Error fetching permissions:", error);
      });
  }, [userId]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
  //  console.log('Creator: ',creator)
    if (permissions.indexOf("createContact") != -1) {
      axios
        .post(
          "http://localhost:5000/contact/create",
          {
            firstname,
            lastname,
            nickname,
            phone,
            email,
            workinfo,
            address,
            notes,
            website,
            creator
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((result) => {
          console.log(result);
          window.location.reload();
        })
        .catch((e) => console.log("Error occured: ", e));
    } else {
      alert("You do not have the required permission!");
    }
  };

  return (
    <>
      <section>
        <div className="mx-auto  max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 ml-200">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12 flex flex-wrap">
              <form action="#" className="space-y-4 ">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="sr-only" htmlFor="firstName">
                      First Name
                    </label>
                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="First Name"
                      type="text"
                      id="firstName"
                      required
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="sr-only" htmlFor="lastName">
                      Last Name
                    </label>
                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="Last Name"
                      type="text"
                      id="lastName"
                      onChange={(e) => setLastname(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="sr-only" htmlFor="nickName">
                    Nickname
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Nickname"
                    type="text"
                    id="nickName"
                    onChange={(e) => setNickname(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="sr-only" htmlFor="phone">
                      Phone
                    </label>
                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="Phone Number"
                      type="tel"
                      id="phone"
                      required
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="sr-only" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="Email address"
                      type="email"
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="sr-only" htmlFor="workInfo">
                    Work info
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Work info"
                    type="text"
                    id="workInfo"
                    onChange={(e) => setWorkinfo(e.target.value)}
                  />
                </div>
                <div>
                  <label className="sr-only" htmlFor="address">
                    Address
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Address"
                    type="text"
                    id="address"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                {/* Important dates
                <br />
                Relationships */}
                <div>
                  <label className="sr-only" htmlFor="notes">
                    Notes
                  </label>

                  <textarea
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Notes"
                    rows="8"
                    id="notes"
                    onChange={(e) => setNotes(e.target.value)}
                  ></textarea>
                </div>
                <div>
                  <label className="sr-only" htmlFor="website">
                    Website
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Website"
                    type="text"
                    id="website"
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <button
                    type="submit"
                    className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                    onClick={onSubmitHandler}
                  >
                    Create contact
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
