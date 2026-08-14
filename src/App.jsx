// src/App.jsx
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Layout from "./layout/Layout";
import Home from "./pages/Home";

const Placeholder = ({ title }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-800">
    <h2 className="text-2xl font-bold mb-2">{title} Page</h2>
    <p className="text-slate-500">This page is under construction.</p>
  </div>
);

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-800">
    <h2 className="text-3xl font-extrabold mb-2 text-rose-600">404</h2>
    <p className="text-slate-500 mb-4">Oops! The page you are looking for doesn't exist.</p>
    <a href="/" className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors">
      Go Home
    </a>
  </div>
);

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/explore",
        element: <Home />, // Or a separate Explore component when ready
      },
      {
        path: "/my-ideas",
        element: <Placeholder title="My Ideas" />,
      },
      {
        path: "/saved",
        element: <Placeholder title="Saved" />,
      },
      {
        path: "/login",
        element: <Placeholder title="Login" />,
      },
      {
        path: "*",
        element: <NotFound />,
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;