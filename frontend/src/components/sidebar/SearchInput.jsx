import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import useConservation from "../../zustand/useConversation";
import useConversations from "../../hooks/useConservations";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConservation } = useConservation();
  const { conservations } = useConversations();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) {
      return;
    }
    const conversation = conservations.find((user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConservation(conversation);
      setSearch("");
    } else {
      toast.error("no user found");
    }
  };

  return (
    <form className="flex items-center gap-2" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search.."
        className="input input-bordered rounded-full"
        value={search} // Add this line
        onChange={(e) => setSearch(e.target.value)} // Add this line
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearch className="h-6 w-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
