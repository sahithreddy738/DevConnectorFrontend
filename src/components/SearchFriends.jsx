import { Search } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const SearchFriends = ({ onHandle }) => {
  const connections = useSelector((store) => store.connections);
  const [searchText, setSearchText] = useState("");
  const [filteredConnections, setFilteredConnections] = useState(connections);

  const searchHandle = (e) => {
    const value = e.target.value;
    setSearchText(value);
  
    if (value === "") {
      setFilteredConnections(connections);
      return;
    }
  
    const connectionsFiltered = connections.filter(
      (connection) =>
        connection.firstName.toLowerCase().includes(value.toLowerCase()) ||
        connection.lastName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredConnections(connectionsFiltered);
  };

  return (
    <div className="w-full mt-6">
      <div className="flex gap-2 items-center">
        <span className="text-base font-semibold">Want to add friends?</span>
        <div className="flex">
          <input
            className="border-2 px-2 py-1 rounded-l-full b"
            id="search-friend"
            value={searchText}
            onChange={searchHandle}
            placeholder="search friends"
          />
          <button onClick={searchHandle} className="bg-red-600 px-2 py-1 rounded-r-full">
            <Search className="h-5 w-5 " />
          </button>
        </div>
      </div>
      <div className="mt-2 w-full p-1 flex flex-col gap-y-3">
        {filteredConnections &&
          filteredConnections.map((friend) => (
            <div
              className="w-full flex px-1 py-2 rounded-md justify-between items-center hover:bg-gray-400"
              key={friend._id}
            >
              <div className="flex gap-3 items-center">
                <img
                  src={friend?.photoURL}
                  className="w-12 h-12 rounded-full"
                />
                <span className="text-lg font-semibold">{`${friend?.firstName} ${friend?.lastName}`}</span>
              </div>
              <button onClick={()=>onHandle(friend)} className="rounded-md p-2 w-16 bg-blue-700 text-white font-semibold text-sm">
                Add
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchFriends;
