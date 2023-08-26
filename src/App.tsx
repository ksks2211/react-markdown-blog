import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./views/LogIn";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/log-in" element={<LogIn />}></Route>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
