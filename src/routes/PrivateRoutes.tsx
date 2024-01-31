import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../components/common/Loader";
import { scrollToTheTop } from "../helpers/scrollUtils";
import HeaderTitleProvider from "../contexts/HeaderTitleProvider";

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
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        }
      />
      <Route
        path="/home"
        element={
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        }
      />
      <Route
        path="/posts"
        element={
          <Suspense fallback={<Loader />}>
            <Posts />
          </Suspense>
        }
      />
      <Route
        path="/posts/create"
        element={
          <Suspense fallback={<Loader />}>
            <PostCreate />
          </Suspense>
        }
      />
      <Route
        path="/posts/:id"
        element={
          <Suspense fallback={<Loader />}>
            <Post />
          </Suspense>
        }
      />
      <Route
        path="/categories"
        element={
          <Suspense fallback={<Loader />}>
            <Categories />
          </Suspense>
        }
      />

      <Route
        path="/categories/*"
        element={
          <Suspense fallback={<Loader />}>
            <HeaderTitleProvider>
              <PostsByCategory />
            </HeaderTitleProvider>
          </Suspense>
        }
      />
      <Route
        path="/tags"
        element={
          <Suspense fallback={<Loader />}>
            <Tags />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default PrivateRoutes;
