import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function RequestModel({ isOpen, onClose }) {
  const { user } = useAuth0();
  const [userRequests, setUserRequests] = useState([]);
  const [grantMessage, setGrantMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}api/get-user-requests`;
      try {
        const response = await axios.get(API_BASE_URL, {
          params: { email: user.email },
        });
        setUserRequests(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-baseline justify-end bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg w-auto scroll-m-11 p-6 top-28 right-60">
        <button
          className="absolute top-0 right-0 m-2 text-gray-500 hover:text-gray-900"
          onClick={onClose}
        >
          &#x2715;
        </button>
        <div className="p-4 max-h-80 overflow-y-auto no-scrollbar">
          {userRequests && userRequests.length >= 1 ? (
            <ul>
              {userRequests.map((request, index) => (
                <li
                  className="w-full rounded-lg border p-4 m-2 cursor-pointer hover:bg-slate-500"
                  key={index}
                >
                  <span className="font-bold">{request.granterName}</span>
                  <span
                    className={
                      request.grantStatus === true
                        ? "text-green-600"
                        : "text-yellow-600"
                    }
                  >
                    {request.grantStatus === true
                      ? " Approved"
                      : " Reviewing your application"}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <h1>No requests found!!</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default RequestModel;
