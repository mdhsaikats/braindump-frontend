import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import MyIdeas from "./pages/MyIdeas";
import Saved from "./pages/Saved";
import Profile from "./pages/Profile";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";


const Placeholder = ({ title }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-800">
    <h2 className="text-2xl font-bold mb-2">{title} Page</h2>
    <p className="text-slate-500">This page is under construction.</p>
  </div>
);

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-800">
    <h2 className="text-3xl font-extrabold mb-2 text-rose-600">404</h2>
    <p className="text-slate-500 mb-4">
      Oops! The page you are looking for doesn't exist.
    </p>
    <a
      href="/"
      className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
    >
      Go Home
    </a>
  </div>
);

const router = createBrowserRouter([
  // Standalone Auth routes (Full screen, no Navbar)
  {
    path: "/",
    element: <Auth />,
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: <Auth />,
  },

  // Main App routes wrapped with Layout (Navbar + Main Content)
  {
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: [
      {
        path: "/explore",
        element: <Home />,
      },
      {
        path: "/my-ideas",
        element: <MyIdeas />,
      },
      {
        path: "/saved",
        element: <Saved />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;

