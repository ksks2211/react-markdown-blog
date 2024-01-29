import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../components/common/Loader";
import { scrollToTheTop } from "../helpers/scrollUtils";

const Home = lazy(() => import("../pages/HomePage"));
const Posts = lazy(() => import("../pages/PostListPage"));
const Categories = lazy(() => import("../pages/CategoriesPage"));
const Tags = lazy(() => import("../pages/TagsPage"));
const Post = lazy(() => import("../pages/PostPage/PostPage"));
const PostsByCategory = lazy(() => import("../pages/PostListByCategoryPage"));
const PostCreate = lazy(() => import("../pages/PostCreatePage/PostCreatePage"));

const PrivateRoutes: React.FC = () => {
  scrollToTheTop();

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/create" element={<PostCreate />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:id" element={<PostsByCategory />} />
        <Route path="/tags" element={<Tags />} />
      </Routes>
    </Suspense>
  );
};

export default PrivateRoutes;
