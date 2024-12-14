import { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";
import { SearchIcon } from "lucide-react";

const Search = () => {
  const [search, setSearch] = useState("");
  const { users, setSelectedUsers } = useChatStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 4) {
      toast.error("Should be 4 characters or more,");
      return;
    }

    const searchUsers = users.find((c) => 
       c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (searchUsers) {
      setSelectedUsers(searchUsers);
      setSearch("");
    } else {
      toast.error("The person that u find is nowhere");
    }
  };
  return (
    <form className="flex  items-center gap-2 pt-2 w-full" onSubmit={handleSubmit}>
        <div className="relative flex-grow">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-grow input input-bordered h-10 pr-3 w-full"
      />

      <button className="absolute right-0 top-0 mr-4 mt-2" type="submit">
        <SearchIcon className="size-5 outline-none" />
      </button>
      </div>
    </form>
  );
};

export default Search;
