import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { mainRoutes } from "./routes/mainRoutes";
import { authRoutes } from "./routes/authRoutes";
import { adminRoutes } from "./routes/adminRoutes";
import { doctorRoutes } from "./routes/doctorRoutes";
import { patientRoutes } from "./routes/patientRoutes";
import { useAuthChecker } from "./components/hooks/AuthChecker";

const App = () => {
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
