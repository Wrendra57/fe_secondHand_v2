// import React from 'react'

import { FiSearch, FiX } from "react-icons/fi";

function SearchInput() {
  return (
    <div>
      <form className="d-flex border buttonradius12">
        <input
          className="form-control border-0"
          type="text"
          placeholder="Search"
          aria-label="Search"
          // value={wordEntered}
          // onChange={handleFilter}
        />
        <button className="btn" type="submit">
          <FiSearch />
        </button>
        <button
          className="btn"
          // onClick={clearInput}
        >
          <FiX />
        </button>
      </form>
    </div>
  );
}

export default SearchInput;
