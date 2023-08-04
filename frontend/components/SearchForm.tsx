import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import SearchInput from "./SearchInput";

const SearchForm = ({ submitHandler, loading, city, setCity }) => {

  return (
    <form
      onSubmit={submitHandler}
      className={`d-flex justify-content-center align-items-start mt-4 centered-input`}
    >
      <div className="input-group">
        <SearchInput value={city} setValue={setCity} />
        <button className="btn btn-outline-secondary" type="submit" disabled={loading}>
          {loading ? (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          )}
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
