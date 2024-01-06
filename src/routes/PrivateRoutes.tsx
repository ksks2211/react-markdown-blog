import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("../pages/HomePage"));
const Posts = lazy(() => import("../pages/PostListPage"));
const Categories = lazy(() => import("../pages/CategoriesPage"));
const Data = lazy(() => import("../pages/DataPage"));
const Post = lazy(() => import("../pages/PostPage"));
const PostsByCategory = lazy(() => import("../pages/PostListByCategoryPage"));
const PostCreate = lazy(() => import("../pages/PostCreatePage"));

const PrivateRoutes: React.FC = () => {
  return (
    <Routes>
      <Suspense fallback={<div>Loading...</div>}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/create" element={<PostCreate />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:id" element={<PostsByCategory />} />
        <Route path="/data" element={<Data />} />
      </Suspense>
    </Routes>
  );
};

export default PrivateRoutes;
