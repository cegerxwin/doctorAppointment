import ErrorPage from "../pages/ErrorPage";
import DashboardDoctorLayout from "../layouts/DashboardDoctorLayout/DashboardDoctorLayout";
import DashboardDoctorPage from "../pages/DashboardDoctor/DashboardDoctorPage";
import ProtectedRoute from "../components/Security/ProtectedRoute";
import DashboardDoctorAppointmentList from "../pages/DashboardDoctor/DashboardDoctorAppointmentList";
import DashboardDoctorPatientList from "../pages/DashboardDoctor/DashboardDoctorPatientList";

export const doctorRoutes = [
  {
    path: "/dashboard/doctor/",
    element: (
      // <ProtectedRoute allowedRoles={["Doctor"]}>
      <DashboardDoctorLayout />
      // </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <DashboardDoctorPage />,
      },
      {
        path: "appointments",
        element: <DashboardDoctorAppointmentList />,
      },
      {
        path: "patients",
        element: <DashboardDoctorPatientList />,
      },
    ],
  },
];
