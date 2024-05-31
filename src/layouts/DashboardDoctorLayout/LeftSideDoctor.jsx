import { NavLink } from "react-router-dom";
import { IoHome, IoSettingsOutline } from "react-icons/io5";
import { FaUserInjured } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { AiFillMedicineBox } from "react-icons/ai";
import { TbClockRecord } from "react-icons/tb";
import { MdOutlineNotificationsNone } from "react-icons/md";

const LeftSideDoctor = () => {
  const linkDizi = [
    {
      id: 1,
      name: "Dashboard",
      pageName: "DashboardHome",
      path: "/dashboard/doctor",
      icon: <IoHome />,
      end: true,
    },
    {
      id: 2,
      name: "My Appointments List",
      pageName: "myAppointments",
      path: "/dashboard/doctor/appointments",
      icon: <TbClockRecord />,
    },
    {
      id: 3,
      name: "My Patients",
      pageName: "DoctorsHome",
      path: "/dashboard/doctor/patients",
      icon: <FaUserInjured />,
    },
    {
      id: 4,
      name: "Notifications",
      pageName: "NotificationsHome",
      path: "/dashboard/doctor/notifications",
      icon: <MdOutlineNotificationsNone />,
    },
    {
      id: 5,
      name: "My Profile",
      pageName: "PatientProfile",
      path: "/dashboard/doctor/profile",
      icon: <FaUserDoctor />,
    },
    {
      id: 6,
      name: "My Settings",
      pageName: "SettingsHome",
      path: "/dashboard/doctor/settings",
      icon: <IoSettingsOutline />,
    },
  ];

  if (linkDizi === "") {
    return (
      <div className="flex items-center justify-center place-content-center">
        <img
          className="w-20 h-20 animate-spin"
          src="/loading.png"
          alt="Loading icon"
        />
      </div>
    );
  }
  return (
    <ul className="flex flex-col py-4 space-y-1">
      <li className="px-5 hidden md:block">
        <div className="flex flex-row items-center h-8">
          <div className="text-sm font-light tracking-wide text-gray-400 uppercase">
            Doctor Dashboard
          </div>
        </div>
      </li>
      {linkDizi.map(({ id, path, icon, name, end }) => (
        <li key={id}>
          <NavLink
            to={path}
            end={end}
            className={({ isActive }) =>
              `relative flex flex-row items-center h-11 focus:outline-none dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-cyan-500 dark:hover:border-gray-800 pr-6 ${
                isActive ? "bg-cyan-100 border-cyan-500" : "hover:bg-cyan-50 "
              }`
            }>
            <span className="inline-flex justify-center items-center ml-4">
              {icon}
            </span>

            <span className="ml-2 text-sm tracking-wide truncate">{name}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
export default LeftSideDoctor;
