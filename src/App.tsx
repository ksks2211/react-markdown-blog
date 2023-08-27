import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";
import GlobalProvider from "./GlobalProvider";
import Posts from "./pages/Posts";
import Categories from "./pages/Categories";
import Data from "./pages/Data";
import Maps from "./pages/Maps";

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/posts" element={<Posts />}></Route>
            <Route path="/categories" element={<Categories />} />
            <Route path="/data" element={<Data />} />
            <Route path="/maps" element={<Maps />} />
            <Route path="/log-in" element={<LogIn />} />
          </Routes>
        </GlobalProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
