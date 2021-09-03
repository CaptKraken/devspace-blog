import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import GoBackButton from "./GoBackButton";
import SearchResults from "./SearchResults";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { pathname } = useRouter();

  const isABlogPost = pathname === "/blog/[slug]";
  useEffect(() => {
    const getResults = async () => {
      if (!searchTerm) return setSearchResults([]);
      const res = await fetch(`/api/search?q=${searchTerm}`);
      const { results } = await res.json();
      setSearchResults(results);
    };

    getResults();
  }, [searchTerm]);
  return (
    <div className="relative bg-gray-600 p-4 w-full">
      <div
        className={`container mx-auto flex items-center justify-center ${
          isABlogPost ? "md:justify-between" : "md:justify-end"
        }`}
      >
        {isABlogPost && (
          <div className="hidden md:block">
            <GoBackButton />
          </div>
        )}
        <div className="relative text-gray-600 w-full sm:w-72">
          <form>
            <input
              type="search"
              name="search"
              id="search"
              className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-full "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Posts..."
            />
            <FaSearch className="absolute top-0 right-0 text-black mt-3 mr-4" />
          </form>
        </div>
      </div>
      {SearchResults && <SearchResults results={searchResults} />}
    </div>
  );
};

export default Search;
