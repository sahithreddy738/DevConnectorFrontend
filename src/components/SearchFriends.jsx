import { Search } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";

const SearchFriends = ({ onHandle, connections }) => {
  const [searchText, setSearchText] = useState("");
  const user = useSelector((store) => store.user);
  const connctionsWithoutLoggedUser = useCallback(() => {
    return connections.filter((c) => c._id !== user._id);
  });
  const [filteredConnections, setFilteredConnections] = useState(
    connctionsWithoutLoggedUser
  );

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
    <div className="w-full mt-2 md:mt-6">
      <div className="flex gap-y-2 flex-col md:flex-row md:gap-x-2 items-center">
        <span className="font-semibold text-base md:text-base">
          Want to add friends to group?
        </span>
        <div className="flex sm:w-full sm:justify-center">
          <input
            className="border-2  font-semibold text-sm md:text-base p-2 md:px-2 md:py-1 rounded-l-full"
            id="search-friend"
            value={searchText}
            onChange={searchHandle}
            placeholder="search friends"
          />
          <button
            onClick={searchHandle}
            className="bg-red-600  p-2 md:px-2 md:py-1 rounded-r-full"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="mt-4 md:mt-2 w-full p-1 flex flex-col gap-y-4 md:gap-y-3">
        {filteredConnections &&
          filteredConnections.map((friend) => (
            <div
              className="w-full flex px-1 py-2 rounded-md justify-between items-center hover:bg-gray-400"
              key={friend._id}
            >
              <div className="flex gap-3 items-center">
                <img
                  src={friend?.photoURL}
                  className="w-12 h-12 md:w-12 md:h-12 rounded-full"
                />
                <span className="text-lg md:text-lg font-semibold">{`${friend?.firstName} ${friend?.lastName}`}</span>
              </div>
              <button
                onClick={() => onHandle(friend)}
                className="rounded-md p-2 w-16 bg-blue-700 text-white font-semibold text-lg md:text-sm"
              >
                Add
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchFriends;
