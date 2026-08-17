import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import MyIdeas from "./pages/MyIdeas";
import Saved from "./pages/Saved";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute";

const Placeholder = ({ title }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-800 dark:text-slate-200">
    <h2 className="text-2xl font-bold mb-2">{title} Page</h2>
    <p className="text-slate-500 dark:text-slate-400">This page is under construction.</p>
  </div>
);

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-800 dark:text-slate-200">
    <h2 className="text-3xl font-extrabold mb-2 text-rose-600 dark:text-rose-500">404</h2>
    <p className="text-slate-500 dark:text-slate-400 mb-4">
      Oops! The page you are looking for doesn't exist.
    </p>
    <a
      href="/"
      className="px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-white transition-colors"
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
        path: "/about",
        element: <About />,
      },
      {
        path: "/privacy",
        element: <Privacy />,
      },
      {
        path: "/terms",
        element: <Terms />,
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
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

