import plantImage1 from "../../assets/plant1.png";
import GrantForm from "../form/GrantForm";
import { useState } from "react";

function Card({ grantImage, name, desc, rate }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const truncatedDescription = Turncate(desc, 30);
  function Turncate(description, descLength) {
    if (description.length <= descLength) {
      return description;
    } else {
      return description.slice(0, descLength);
    }
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="open-a-new-popup">
      <div className="grid h-96 w-80 cursor-pointer grid-rows-2 items-center rounded-2xl bg-neutral-100 p-4 shadow-2xl transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-slate-200 md:w-60">
        <div className="p-4 m-4">
          <img
            className="rounded-xl object-fill"
            src={plantImage1}
            alt="img-1"
          />
        </div>
        <div className="p-2">
          <h1 className="mb-4 flex flex-row place-items-center gap-2"></h1>
          <h1 className="font-extrabold">{name}</h1>
          <p className="relative overflow-hidden max-h-16 transition-max-height duration-500 ease-in-out hover:max-h-ful">
            {truncatedDescription}
            {`...more`}
          </p>
          <div className="grid grid-cols-2 place-items-center">
            <div className="w-auto cursor-pointer items-center justify-center rounded-xl p-2 hover:bg-neutral-200">
              <p className="">
                Raise of <span className="font-bold">€{rate}</span>
              </p>
            </div>
            <div className="bg-green-400 w-auto cursor-pointer items-center justify-center rounded-xl p-2 hover:bg-green-800">
              <button className="" onClick={openModal}>
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <GrantForm closeModal={closeModal} cardData={{ name, desc, rate }} />
      )}
    </div>
  );
}

export default Card;
