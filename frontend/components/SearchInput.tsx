import React from 'react';

const SearchInput = ({value,setValue}) => {
  return (
    <input
      type="text"
      className="form-control form-control-lg"
      placeholder="Write your destination city"
      value={value}
            onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default SearchInput;
