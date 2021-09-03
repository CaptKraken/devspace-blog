import Post from "./Post";

const SearchResults = ({ results }) => {
  if (results.length <= 0) return null;
  return (
    <div className="overflow-hidden border-4  rounded-lg border-gray-500 absolute mx-2 top-20 right-0 md:right-10 z-10 ">
      <div
        style={{ maxHeight: "50vh" }}
        className=" bg-white text-black overflow-y-scroll"
      >
        <div className="p-4 md:p-8 lg:p-10">
          <h2 className="text-3xl mb-3">{results.length} results</h2>
          {results.map((result, index) => (
            <Post key={index} post={result} compact />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
