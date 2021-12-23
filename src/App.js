import Games from "./components/Games";
import "./styles/app.scss";
import { Provider } from "react-redux";
import store from "./store/store";
import Details from "./components/Details";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Favourites from "./components/Favourites";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Provider store={store}>
      <div className="component-body">
        <Router>
          <ToastContainer />
          <Nav />
          <Routes>
            <Route path="/" element={<Games />} />
            <Route path="/details" element={<Details />} />
            <Route path="/favourites" element={<Favourites />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
