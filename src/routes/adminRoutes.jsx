import ErrorPage from "../pages/ErrorPage";
import DashboardAdminLayout from "../layouts/DashboardAdminLayout/DashboardAdminLayout";
import DashboardAdminPage from "../pages/DashboardAdmin/DashboardAdminPage";
import DashboardAdminPatientsPage from "../pages/DashboardAdmin/DashboardAdminPatientsPage";
import PatientProfile from "../components/Dasboards/Patients/PatientProfile";
import DashboardAdminDoctorsPage from "../pages/DashboardAdmin/DashboardAdminDoctorsPage";
import DashboardAdminAppointmentsPage from "../pages/DashboardAdmin/DashboardAdminAppointmentsPage";
import DoctorProfile from "../components/Dasboards/Doctors/DoctorProfile";
import AppointmentProfile from "../components/Dasboards/Appointments/AppointmentProfile";
import AddDoctor from "../components/Dasboards/Doctors/AddDoctor";
import RolesList from "../components/Dasboards/Roles/RolesList";
import UsersList from "../components/Dasboards/User/UsersList";
import MedicinesList from "../components/Dasboards/Medicine/MedicinesList";
import LinksList from "../components/Dasboards/Links/LinksList";
import HolidaysList from "../components/Dasboards/Holidays/HolidaysList";
import DoctorWorkingDaysList from "../components/Dasboards/DoctorWorkingDays/DoctorWorkingDaysList";
import BranchesList from "../components/Dasboards/Branches/BranchesList";
import ProtectedRoute from "../components/Security/ProtectedRoute";
import Settings from "../components/Dasboards/Settings/Settings";
import UserRolesForm from "../components/Dasboards/UserRoles/UserRolesForm";

export const adminRoutes = [
  {
    path: "/dashboard/admin/",
    element: (
      <ProtectedRoute allowedRoles={["Admin"]}>
        <DashboardAdminLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <DashboardAdminPage />,
      },
      {
        path: "patients",
        element: <DashboardAdminPatientsPage />,
      },
      {
        path: "patient/:id/:name",
        element: <PatientProfile />,
      },
      {
        path: "doctors",
        element: <DashboardAdminDoctorsPage />,
      },
      {
        path: "doctor/:id/:name",
        element: <DoctorProfile />,
      },
      {
        path: "addDoctor",
        element: <AddDoctor />,
      },
      {
        path: "appointments",
        element: <DashboardAdminAppointmentsPage />,
      },
      {
        path: "appointment/:id/:pname/:dname",
        element: <AppointmentProfile />,
      },
      {
        path: "medicines",
        element: <MedicinesList />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "roles",
        element: <RolesList />,
      },
      {
        path: "users",
        element: <UsersList />,
      },
      {
        path: "userroles",
        element: <UserRolesForm />,
      },
      {
        path: "links",
        element: <LinksList />,
      },
      {
        path: "holidays",
        element: <HolidaysList />,
      },
      {
        path: "doctorWorkingDays",
        element: <DoctorWorkingDaysList />,
      },
      {
        path: "branches",
        element: <BranchesList />,
      },
    ],
  },
];
