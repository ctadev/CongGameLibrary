import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ios from "../styles/img/apple-brands.svg";
import play from "../styles/img/playstation-brands.svg";
import pc from "../styles/img/windows-brands.svg";
import xbox from "../styles/img/xbox-brands.svg";
import pad from "../styles/img/gamepad-solid.svg";
import android from "../styles/img/android-brands.svg";
import linux from "../styles/img/linux-brands.svg";
import mac from "../styles/img/laptop-solid.svg";
import { setFav } from "../redux/favSlice";
import { toast } from "react-toastify";

function Details() {
  const added = () =>
    toast("Already been Added to Favourites", {
      position: "top-center",
      autoClose: 1500,
    });
  const add = () =>
    toast("Games has been added to Favourites", {
      position: "top-center",
      autoClose: 2500,
    });
  const [gameDetails, setgameDetails] = useState();
  const data = useSelector((state) => state.detail);
  const url = `https://api.rawg.io/api/games/${data}?key=${process.env.REACT_APP_GAME_API}`;
  const platform = (plat) => {
    switch (plat) {
      case "PlayStation":
        return play;
      case "iOS":
        return ios;
      case "PC":
        return pc;
      case "Xbox":
        return xbox;
      case "Nintendo":
        return pad;
      case "Linux":
        return linux;
      case "Apple Macintosh":
        return mac;
      default:
        return android;
    }
  };

  const stars = {
    star: function (rating) {
      const starPercent = (rating / 5) * 100;
      const starRounded = `${Math.round(starPercent / 10) * 10}%`;
      return starRounded;
    },
  };

  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(true);
  const favState = useSelector((state) => state.fav);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favState));
  }, [favState]);

  const addFav = () => {
    if (favState.some((match) => match.id === gameDetails.id)) {
      setToggle(false);
      added();
    } else {
      setToggle(false);
      dispatch(setFav(gameDetails));
      add();
    }
  };

  useEffect(() => {
    async function fetchData() {
      await axios.get(url).then((resp) => setgameDetails(resp.data));
    }
    fetchData();
  }, [url]);

  return (
    <>
      {gameDetails ? (
        <section className="detail-container">
          <main className="content-container">
            <div></div>
            <div className="game-info">
              <h1>{gameDetails.name}</h1>
              <div className="rating">
                <p>Ratings:</p>
                <div className="outer-star">
                  <i className="far fa-star"></i>
                  <i className="far fa-star"></i>
                  <i className="far fa-star"></i>
                  <i className="far fa-star"></i>
                  <i className="far fa-star"></i>
                  <div
                    className="inner-star"
                    style={{ width: `${stars.star(gameDetails.rating)}` }}
                  >
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
              <p>Released Date: {gameDetails.released}</p>
              <h2>
                Official Website:{" "}
                <a href={gameDetails.website} target="_blank" rel="noreferrer">
                  {gameDetails.website}
                </a>
              </h2>
            </div>
            <div className="game-pic1">
              <img src={gameDetails.background_image} alt={gameDetails.name} />
              <button
                className={toggle ? "addFavs" : "addFavs hide"}
                onClick={() => addFav()}
              >
                Add to Favourites
              </button>
            </div>
            <div className="desc">
              <p>{gameDetails.description_raw}</p>
            </div>
            <div className="game-pic2">
              <img
                src={gameDetails.background_image_additional}
                alt={gameDetails.name}
              />
            </div>
            <div className="footer">
              <h2>Developer: {gameDetails.developers[0].name}</h2>
            </div>
            <div className="platform">
              {gameDetails.parent_platforms.map((data) => (
                <img
                  key={data.platform.id}
                  src={platform(data.platform.name)}
                  alt={data.platform.name}
                ></img>
              ))}
            </div>
          </main>
        </section>
      ) : (
        <div className="loading-container">Fetching Data</div>
      )}
    </>
  );
}

export default Details;
