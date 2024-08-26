import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './store/store';
import { RouterProvider,createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home.js'
import { AuthLayout, Login } from './components/index.js'


import AddPost from "./pages/AddPost";
import Signup from './pages/Signup'
import EditPost from "./pages/EditPost";
import Post from "./pages/Post.js"



import AllPosts from "./pages/AllPost.js";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
          {
              path: "/",
              element: <Home />,
          },
          {
              path: "/login",
              element: (
                  <AuthLayout authentication={false}>
                      <Login />
                  </AuthLayout>
              ),
          },
          {
              path: "/signup",
              element: (
                  <AuthLayout authentication={false}>
                      <Signup />
                  </AuthLayout>
              ),
          },
          {
              path: "/all-posts",
              element: (
                  <AuthLayout authentication>
                      {" "}
                      <AllPosts />
                  </AuthLayout>
              ),
          },
          {
              path:'/add-post',
              element: (
                    <AddPost />
              ),
          },
          {
              path: "/edit-post/:slug",
              element: (
                  <AuthLayout authentication>
                      {" "}
                      <EditPost />
                  </AuthLayout>
              ),
          },
          {
            path:"/post/:slug",
            element:<Post/>,
          },
          
      ],
  },
  ])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>

);
setTimeout(() => {
    root.render(
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    );
}, 3000);
