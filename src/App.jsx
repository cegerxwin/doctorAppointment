import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { mainRoutes } from "./routes/mainRoutes";
import { authRoutes } from "./routes/authRoutes";
import { adminRoutes } from "./routes/adminRoutes";
import { doctorRoutes } from "./routes/doctorRoutes";
import { patientRoutes } from "./routes/patientRoutes";
import { useAuthChecker } from "./components/hooks/AuthChecker";
import useTokenExpirationHandler from "./components/hooks/useTokenExpirationHandler";
import "tippy.js/dist/tippy.css";

const App = () => {
  useTokenExpirationHandler();
  useAuthChecker();

  const router = createBrowserRouter([
    ...mainRoutes,
    ...authRoutes,
    ...adminRoutes,
    ...doctorRoutes,
    ...patientRoutes,
  ]);

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
