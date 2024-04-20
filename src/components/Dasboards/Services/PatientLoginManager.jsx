import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { setUserLogin } from "../../../redux/slices/usersSlice";
import { useGetPatientByIdQuery } from "../../../redux/features/api/apiSlice";
import useDefaultImage from "../../hooks/useDefaultImage";
import { FaUser } from "react-icons/fa";
import { IoLogOut, IoSettings } from "react-icons/io5";

const PatientLoginManager = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { userId } = useSelector((state) => state.users.userLogin);
  const { data: patient, isError, isLoading } = useGetPatientByIdQuery(userId);
  const defaultImage = useDefaultImage(patient);
  const ref = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setUserLogin({ userId: 0, username: "", token: "" }));
    setDropdownOpen(false);
    navigate("/auth/login");
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (dropdownOpen && ref.current && !ref.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [dropdownOpen]);

  if (isLoading) return <div>Yükleniyor...</div>;
  if (isError) return <div>Hasta detayları yüklenirken hata oluştu</div>;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-4"
        aria-expanded={dropdownOpen}>
        <img
          src={defaultImage}
          alt="user"
          className="w-12 h-12 rounded-full border border-border object-cover"
        />
        <span className="mr-9">
          {patient?.name} {patient?.surname}
        </span>
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <Link
            to="/dashboardPatientProfile"
            onClick={toggleDropdown}
            className="flex justify-start items-center px-4 py-2 font-semibold text-sm text-gray-700 hover:bg-gray-100">
            <FaUser className="ml-0.5 mr-2 text-slate-500 w-4 h-4" />
            Profile
          </Link>
          <Link
            to="/settings"
            onClick={toggleDropdown}
            className="flex justify-start items-center px-4 py-2 font-semibold text-sm text-gray-700 hover:bg-gray-100">
            <IoSettings className="mr-2 text-slate-500 w-5 h-5" />
            Settings
          </Link>
          <hr className="my-1" />
          <button
            onClick={handleLogout}
            className="flex justify-start items-center w-full font-semibold text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            <IoLogOut className="mr-2 text-red-500 w-6 h-6" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default PatientLoginManager;
