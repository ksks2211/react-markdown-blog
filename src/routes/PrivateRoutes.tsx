import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import HeaderTitleProvider from "../contexts/HeaderTitleProvider";
import SuspenseLoader from "../components/common/SuspenseLoader";

const Home = lazy(() => import("../pages/HomePage"));
const Posts = lazy(() => import("../pages/PostListPage"));
const Categories = lazy(() => import("../pages/CategoriesPage"));
const Tags = lazy(() => import("../pages/TagsPage"));
const Post = lazy(() => import("../pages/PostPage/PostPage"));
const PostsByCategory = lazy(() => import("../pages/PostListByCategoryPage"));
const PostCreate = lazy(() => import("../pages/PostCreatePage"));
const PostUpdate = lazy(() => import("../pages/PostUpdatePage"));

const PrivateRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <SuspenseLoader>
            <Home />
          </SuspenseLoader>
        }
      />
      <Route
        path="/home"
        element={
          <SuspenseLoader>
            <Home />
          </SuspenseLoader>
        }
      />
      <Route
        path="/posts"
        element={
          <SuspenseLoader>
            <Posts />
          </SuspenseLoader>
        }
      />
      <Route
        path="/posts/create"
        element={
          <SuspenseLoader>
            <PostCreate />
          </SuspenseLoader>
        }
      />
      <Route
        path="/posts/:id"
        element={
          <SuspenseLoader>
            <Post />
          </SuspenseLoader>
        }
      />
      <Route
        path="/posts/update/:id"
        element={
          <SuspenseLoader>
            <PostUpdate />
          </SuspenseLoader>
        }
      />
      <Route
        path="/categories"
        element={
          <SuspenseLoader>
            <Categories />
          </SuspenseLoader>
        }
      />

      <Route
        path="/categories/*"
        element={
          <SuspenseLoader>
            <HeaderTitleProvider>
              <PostsByCategory />
            </HeaderTitleProvider>
          </SuspenseLoader>
        }
      />
      <Route
        path="/tags"
        element={
          <SuspenseLoader>
            <Tags />
          </SuspenseLoader>
        }
      />
    </Routes>
  );
};

export default PrivateRoutes;
