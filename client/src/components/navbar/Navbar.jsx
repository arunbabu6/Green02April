import Logo from "../../assets/plant.svg";
import Logo1 from "../../assets/plant.svg"
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {
  const { logout, user } = useAuth0();
  const [showPopup, setShowPopup] = useState(false);
  const userRole = user[`${process.env.API_BASE_URL}/roles`];
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="fixed flex h-16 w-full justify-center rounded-b-xl bg-neutral-50 text-lg shadow-xl">
      <ul className="m-x-10 flex w-[80%] items-center justify-center">
        <li key={1} className="h-12 w-12">
          {" "}
          <img src={Logo} alt="logo" />
        </li>
        <li key={2}>
          <h1
            href="#"
            className="block text-xl text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
          >
            Nausicca
          </h1>
        </li>
        <li key={3} className="ml-auto">
          <div
            className="h-12 w-12 cursor-pointer rounded-full bg-black"
            onClick={togglePopup}
          >
            <img
              className="rounded-full"
              src={user.picture}
              alt="profile-image"
            />
          </div>
        </li>
      </ul>
      {showPopup && (
        <div className="absolute right-0 top-0 z-50 mr-[10%] mt-20 shadow-xl ">
          <div className="relative rounded-md bg-neutral-50 p-4 shadow-md">
            <div className="arrow-up absolute right-2 top-[-2px] h-6 w-6 rotate-45 bg-neutral-50"></div>
            <div className="grid grid-rows-3 gap-y-2">
              <div className="flex items-center">
                <img
                  src={user.picture}
                  className="h-8 w-8 rounded-full"
                  alt="User Avatar"
                />
                <p className="ml-2">{user.email}</p>
              </div>
              <p className="text-orange-500">{userRole}</p>

              <button
                className="rounded bg-red-400 px-4 py-2 text-white hover:bg-red-500"
                onClick={() => {
                  logout({ returnTo: window.location.origin });
                  togglePopup();
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
