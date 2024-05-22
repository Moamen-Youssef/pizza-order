import { useState } from 'react';
import { useNavigate } from 'react-router';

function SearchOrder() {
  const [query, setQuery] = useState();
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/order/${query}`);
    setQuery('');
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="search order #"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        className="rounded-full bg-yellow-100 w-40 
        px-3 py-2 text-sm transition-all 
         duration-300 placeholder:text-stone-400 
         focus:outline-none focus:ring focus:ring-yellow-500
         sm:w-64 focus:sm:w-72 md:w-80"
      />
    </form>
  );
}

export default SearchOrder;
