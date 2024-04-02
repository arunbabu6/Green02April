import Navbar from "../../components/navbar/Navbar";
import Card from "../../components/Card/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import RequestModel from "../../components/RequestModal/RequestModel";

function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [granterData, setGratnerData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(granterData);

  const handleSearch = (e) => {
    const searchVar = e.target.value;
    setSearchTerm(searchVar);
    const filterCards = granterData.filter((cards) => {
      const grantName = cards.name;
      return grantName.toLowerCase().includes(searchVar.toLowerCase());
    });
    setFilteredData(filterCards);
  };

  const handleRequestClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}api/getGrants`;
      try {
        const response = await axios.get(API_BASE_URL);
        setGratnerData(response.data);
        setFilteredData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="grid h-screen w-full grid-cols-1 bg-neutral-50">
      <div className="h-16 bg-neutral-50">
        <Navbar />
      </div>
      <div className="flex justify-center w-full items-center mt-8 h-14">
        <div className="flex w-[75%] h-16">
          <div className=" flex rounded-lg w-full">
            <ul className="flex items-center justify-between w-full">
              <div className="w-[60%]">
                <li>
                  <input
                    className="border rounded-2xl p-2 px-4 w-[40%] focus:border-green-700 outline:none"
                    placeholder="search for grants..."
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </li>
              </div>
              <div className="">
                <li
                  onClick={handleRequestClick}
                  className="px-4 py-2 rounded-2xl cursor-pointer hover:text-white hover:bg-green-600 text-green-500 "
                >
                  Requests
                </li>
              </div>
            </ul>
          </div>
          <RequestModel isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
      </div>
      {/* <div className="grid h-auto grid-cols-2 place-items-center gap-8 rounded-xl shadow-md md:ml-40 md:mt-10 md:w-[75%]">
        <div className="rounded-xl">
          <img className="rounded-xl" src={plantImge2} alt="popular-card" />
        </div>
        <div className="mb-[-10] grid grid-rows-2 rounded-xl">
          <div className="p-10">
            <h1 className="mb-4 flex flex-row place-items-center gap-2">
              <IoFolderOpenOutline /> <span>Organization</span>
            </h1>
            <h1 className="font-extrabold">
              Remake - We make architecture exhibition
            </h1>
            <p>
              Remake - We make architecture exhibition social agency in the face
              of urbanization
            </p>
          </div>
          <div className="grid grid-cols-3 place-items-center">
            <div className="w-auto cursor-pointer items-center justify-center rounded-xl p-2 hover:bg-neutral-200">
              <h1>$20,000</h1>
              <p>Raise of $2,000</p>
            </div>
            <div className="w-auto cursor-pointer items-center justify-center rounded-xl p-2 hover:bg-neutral-200">
              <h1>$20,000</h1>
              <p>Raise of $2,000</p>
            </div>
            <div className="w-auto cursor-pointer items-center justify-center rounded-xl p-2 hover:bg-neutral-200">
              <h1>$20,000</h1>
              <p>Raise of $2,000</p>
            </div>
          </div>
        </div>
      </div> */}
      <div className="row-span-2 grid w-full place-items-center gap-6 bg-neutral-50 p-4 md:row-span-8 md:grid-cols-4 md:px-36">
        {filteredData.map((granter) => (
          <Card
            key={granter._id}
            img={granter.img}
            name={granter.name}
            desc={granter.description}
            rate={granter.grant_amount}
          />
        ))}
      </div>
      <div className="grid h-20 grid-cols-3 place-items-center rounded-xl bg-neutral-100">
        <div className="copyright">© 2024 Nausicca. All rights reserved.</div>
        <div className="contact">
          Contact us: info@nausicca.com | 000-000-0000
        </div>
        <div className="links">
          <a href="#">About Us</a> | <a href="#">Services</a> |{" "}
          <a href="#">Contact</a>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
