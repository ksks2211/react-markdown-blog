import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Posts from "../pages/PostList";
import Categories from "../pages/CategoriesPage";
import Data from "../pages/Data";
import Maps from "../pages/Maps";
import Post from "../pages/Post";

const PrivateRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/posts" element={<Posts />}></Route>
      <Route path="/posts/:id" element={<Post />}></Route>
      <Route path="/categories" element={<Categories />} />
      <Route path="/data" element={<Data />} />
      <Route path="/maps" element={<Maps />} />
      <Route path="/maps/*" element={<Maps />} />
    </Routes>
  );
};

export default PrivateRoutes;
