import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

function GrantForm({ closeModal, cardData }) {
  const { user } = useAuth0();
  const [description, setDescription] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    const newInputValue = e.target.value.replace(/[^0-9]/g, '');
    setInputValue(newInputValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestedAmount = parseFloat(inputValue);

    if (isNaN(requestedAmount) || requestedAmount < 1 || requestedAmount > cardData.rate) {
      alert('Limit exceeds!!');
      return;
    }

    const grantData = {
      granterName: cardData.name,
      username: user.email,
      email: user.email,
      description,
      requestedAmount,
    };

    try {
      const api_url = `${process.env.REACT_APP_API_BASE_URL}api/user-requests`;
      console.log(api_url)
      const response = await axios.post(api_url, grantData);

      console.log('Response from server:', response.data);

      closeModal();
      alert('Your grant application has been submitted!');
    } catch (error) {
      console.error('Error making Axios POST request:', error);
    }

    console.log('Grant Application Data:', grantData);

    closeModal();
    alert('Your grant application has been submitted!');
  };

  return (
    <div className="fixed top-0 left-56 w-[77%] h-full bg-opacity-0 bg-white flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-md p-8 w-144 flex"> 
        <div className="flex flex-col justify-between w-1/2 mr-4"> 
          <div>
            <h2 className="font-extrabold text-xl text-green-500 mb-4">{cardData.name}</h2> 
            <p className="text-gray-700 mb-4"> 
              {cardData.desc}
            </p>
          </div>
        </div>
        <div className="w-1/2"> 
          <h2 className="text-lg mb-4">Grant Application</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
                User Name:
              </label>
              <input
                type="text"
                id="userName"
                value={user.email}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-green-500 focus:ring-1"
                readOnly
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={user.email}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-green-500 focus:ring-1"
                readOnly
              />
            </div>

            <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700">
              Project Description:
            </label>
            <textarea
              id="projectDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-24 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-green-500 focus:ring-1"
              required
            />

            <div className="relative">
              <label htmlFor="requestedAmount" className="block text-sm font-medium text-gray-700">
                Requested Amount:
              </label>
              <div className="flex items-center">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                <input
                  type="text"
                  id="requestedAmount"
                  name="requestedAmount"
                  value={inputValue}
                  onChange={handleInputChange}
                  pattern="[0-9]*"
                  maxLength={String(cardData.rate).length}
                  className="w-full pl-8 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-green-500 focus:ring-1"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-700 focus:ring-green-500 focus:ring-opacity-50"
            >
              Submit Application
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="w-full py-2 px-4 mt-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>

  );

}

export default GrantForm;
