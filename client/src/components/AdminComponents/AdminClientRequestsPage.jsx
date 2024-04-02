import { useEffect, useState } from "react";
import axios from "axios";
import AdminCard from "../Card/AdminCard";
import ClipLoader from "react-spinners/ClipLoader";

function AdminClientRequestsPage() {
  const [loading, setLoading] = useState(true);
  const [clientRequest, setClientRequest] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const api_url = `${process.env.REACT_APP_API_BASE_URL}api/admin-client-requests`;

      try {
        const response = await axios.get(api_url);
        setClientRequest(response.data);
        console.log("admin requests ----> ", response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const timeout = setTimeout(async () => {
    setLoading(false);
    }, 2000);
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <ClipLoader size={150} color={"#26fa0f"} loading={loading} />
        </div>
      </div>
    );
  }

  return (
    <div className="justify-center items-center top-30 overflow-auto w-full">
      {clientRequest.slice().reverse().map((requests, index) => (
        <AdminCard
          key={index}
          granterName={requests.granterName}
          email={requests.email}
          username={requests.username}
          description={requests.description}
          requestedAmount={requests.requestedAmount}
        />
      ))}
    </div>
  );
}

export default AdminClientRequestsPage;
