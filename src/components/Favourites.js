import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchID } from "../redux/detailSlice";
import { deleteFav } from "../redux/favSlice";

function Favourites() {
  const favData = useSelector((state) => state.fav);
  const dispatch = useDispatch();
  const [data,setData] = useState()

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favData));
    const localData = localStorage.getItem("favourites");
    setData(JSON.parse(localData));
  }, [favData]);

  

  return (
    <div className="fav-container">
      <div className="platform">
        <h5>Favourite Games</h5>
      </div>
      {data ? (
        <div className="grid-container">
          {data.map((d) => (
            <div key={d.id} className="cards">
              <div className="img-container">
                <Link
                  to="/details"
                  className="linkfav"
                  key={d.id}
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
                </Link>
              </div>
              <div className="card-info">
                <h2 className={d.name.length > 40 ? "h2 overflowh2" : "h2"}>
                  {d.name}
                </h2>
                <div
                  className="delete"
                  onClick={() => dispatch(deleteFav(d.id))}
                >
                  <p>
                    <i className="far fa-window-close"></i>
                  </p>
                </div>
              </div>
              <div className="view">
                <Link
                  to="/details"
                  className="linkfavs"
                  key={d.id}
                  onClick={() => dispatch(fetchID(d.id))}
                >
                  <div className="view-game">
                    <p>View Game</p>
                    <p>Details</p>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="fav-spinner">
          <i className="fas fa-spinner"></i>
        </h1>
      )}
    </div>
  );
}

export default Favourites;
