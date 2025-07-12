import BangladeshMap from "./BangladeshMap";
import { useLoaderData } from "react-router";
import { useState } from "react";

const Coverage = () => {
  const serviceCenters = useLoaderData();

  const [inputValue, setInputValue] = useState("");
  const [searchDistrict, setSearchDistrict] = useState(""); // Triggered on button click

  const handleSearch = () => {
    setSearchDistrict(inputValue.trim());
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-4">
      <div className="bg-white w-full max-w-6xl rounded-xl shadow-md p-8">
        <h1 className="text-4xl font-extrabold text-left text-gray-800 mb-3">
          We are available in 64 districts
        </h1>

        <div className="flex mb-6">
          <input
            type="text"
            placeholder="Search by district"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-l-md w-64 focus:outline-none"
          />
          <button
            className="bg-lime-500 text-white px-4 rounded-r-md hover:bg-lime-600"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        <h2 className="text-xl font-bold text-gray-800 my-5">
          We deliver almost all over Bangladesh
        </h2>

        <div className="overflow-hidden rounded-lg border border-gray-300">
          <BangladeshMap
            serviceCenters={serviceCenters}
            searchDistrict={searchDistrict}
          />
        </div>
      </div>
    </div>
  );
};

export default Coverage;
