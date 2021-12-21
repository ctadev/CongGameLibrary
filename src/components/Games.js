import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchID } from "../redux/detailSlice";
import { fetchPlatform } from "../redux/searchSlice";
import axios from "axios";
import { Link } from "react-router-dom";

function Games() {
  const gamedata = useSelector((state) => state.search);
  const [data, setData] = useState();

  const stars = {
    star: function (rating) {
      const starPercent = (rating / 5) * 100;
      const starRounded = `${Math.round(starPercent / 10) * 10}%`;
      return starRounded;
    },
  };

  useEffect(() => {
    async function fetchData() {
      await axios.get(gamedata).then((resp) => setData(resp.data.results));
    }
    fetchData();
  }, [gamedata]);

  const dispatch = useDispatch();

  return (
    <div className="games-container">
      <div className="platform">
        <p onClick={() => dispatch(fetchPlatform("3"))}>
          <i className="fab fa-xbox"></i>
        </p>
        <p onClick={() => dispatch(fetchPlatform("2"))}>
          <i className="fab fa-playstation"></i>
        </p>
        <p onClick={() => dispatch(fetchPlatform("1"))}>
          <i className="fab fa-windows"></i>
        </p>
        <p onClick={() => dispatch(fetchPlatform("8"))}>
          <i className="fab fa-android"></i>
        </p>
        <p onClick={() => dispatch(fetchPlatform("6"))}>
          <i className="fab fa-linux"></i>
        </p>
        <p onClick={() => dispatch(fetchPlatform("7"))}>
          <i className="fas fa-gamepad"></i>
        </p>
        <p onClick={() => dispatch(fetchPlatform("4"))}>
          <i className="fab fa-apple"></i>
        </p>
      </div>
      {data ? (
        <div className="grid-container">
          {data.map((d) => (
            <Link to="/details" className="link" key={d.id}>
              <div
                key={d.id}
                className="cards"
                onClick={() => dispatch(fetchID(d.id))}
              >
                <img
                  src={
                    d.background_image
                      ? d.background_image
                      : "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1129&q=80"
                  }
                  alt={d.name}
                />
                <div className="card-info">
                  <h2 className={d.name.length > 40 ? "h2 overflowh2" : "h2"}>
                    {d.name}
                  </h2>
                  <div className="outer-star">
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                    <div
                      className="inner-star"
                      style={{ width: `${stars.star(d.rating)}` }}
                    >
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                  </div>
                </div>
                <div className="view-game">
                  <p>View Game</p>
                  <p>Details</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <h1>
          <i className="fas fa-spinner"></i>
        </h1>
      )}
    </div>
  );
}

export default Games;
