import React, { useState } from "react";
import { fetchAPI, returnHome } from "../redux/searchSlice";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

function Nav() {
  const [input, setInput] = useState();
  const searchInput = (e) => {
    setInput(e.target.value);
  };

  const history = useNavigate();

  const keyPress = (e) => {
    if (e.key === "Enter") {
      fetch();
    }
  };
  const dispatch = useDispatch();

  const home = () => {
    dispatch(returnHome());
    history("/");
  };

  const fetch = () => {
    dispatch(fetchAPI(input));
    history("/");
    setInput("");
  };

  console.log(input);
  return (
    <nav>
      <div className="links">
        <h1 onClick={() => home()}>
          CTA<span>Games</span>
        </h1>
        <h2 onClick={() => history("/favourites")}>Favourites</h2>
      </div>
      <div className="search-container">
        <input
          type="text"
          onChange={searchInput}
          value={input}
          onKeyPress={keyPress}
        />
        <Link to="/">
          <button onClick={() => fetch()}>
            <i className="fas fa-search"></i>
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
