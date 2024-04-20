import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useGetPatientByIdQuery } from "../../redux/features/api/apiSlice.js";
import Spinner from "../../components/UI/Spinner.jsx";
import useDefaultImage from "../../components/hooks/useDefaultImage";
import {
  FaBoxArchive,
  FaRegCalendarDays,
  FaUser,
  FaHeartPulse,
} from "react-icons/fa6";
import BloodType from "../Dasboards/Services/BloodType.jsx";
import { Link } from "react-router-dom";

const PatientProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useSelector((state) => state.users.userLogin);
  const { data: patient, isError, isLoading } = useGetPatientByIdQuery(userId);

  const defaultImage = useDefaultImage(patient);
  if (isError) return <div>Error: {isError.toString()}</div>;

  if (isLoading) return <Spinner />;

  return (
    <>
      <div className="xl:px-8 px-2">
        <div className="flex items-center text-center gap-4">
          <div className="mt-10 flex gap-4 bg-white border border-cyan-500 border-dashed rounded-lg py-3 px-4 text-md w-full">
            <div className="p-3">
              <button
                className="bg-white border border-cyan-500 border-dashed rounded-lg text-md p-3"
                onClick={() => navigate(-1)}
                href="/patients">
                <img src="/images/leftArrow.png" alt="go back" />
              </button>
            </div>
            <div>
              <span className="absolute ml-[52px] mt-[88px] font-semibold bg-red-500 rounded-full px-2 py-0.5 text-sm text-white text-center">
                {patient.bloodGroup !== null && patient.bloodGroup !== "" ? (
                  <BloodType bloodType={patient.bloodGroup} />
                ) : (
                  "--"
                )}
              </span>
            </div>
            <div className="p-4 ml-36">
              <h1 className="text-xl font-semibold">
                {patient.name} {patient.surname}
              </h1>
              <p className="text-xs text-gray-500">{patient.phone}</p>
            </div>
          </div>
        </div>
        <div>
          <img
            src={defaultImage}
            alt={`${patient.name} ${patient.surname}`}
            className="mt-[-120px] ml-[100px] w-36 h-36 rounded-full object-cover border border-dashed border-cyan-500 p-2 items-center"
          />
        </div>

        <div className="grid grid-cols-12 gap-6 my-8 items-start">
          <div className="col-span-12 flex flex-col items-center justify-center gap-6 lg:col-span-4 bg-white rounded-xl border-[1px] border-border p-6 lg:sticky top-28 ">
            <div className="gap-2 flex-col justify-center items-center text-center">
              <h2 className="text-sm font-semibold">
                {patient.name} {patient.surname}
              </h2>
              <p className="text-xs text-gray-500">{patient.email}</p>
              <p className="text-xs">{patient.phone}</p>
            </div>

            <div className="flex flex-col gap-3 px-2 xl:px-12 w-full">
              <Link
                to="/dashboardPatientProfile"
                className="bg-green-500 text-white text-sm gap-4 flex items-center w-full p-4 rounded">
                <FaBoxArchive /> My Profile
              </Link>
              <Link
                to="/addMedical"
                className="bg-cyan-50 text-cyan-500 hover:bg-cyan-500 hover:text-white text-sm gap-4 flex items-center w-full p-4 rounded">
                <FaBoxArchive /> Medical Records
              </Link>
              <button className="bg-cyan-50 text-cyan-500 hover:bg-cyan-500 hover:text-white text-sm gap-4 flex items-center w-full p-4 rounded">
                <FaRegCalendarDays />
                Appointments
              </button>
              <button className="bg-cyan-50 text-cyan-500 hover:bg-cyan-500 hover:text-white text-sm gap-4 flex items-center w-full p-4 rounded">
                <FaUser /> Patient information
              </button>
              <button className="bg-cyan-50 text-cyan-500 hover:bg-cyan-500 hover:text-white text-sm gap-4 flex items-center w-full p-4 rounded">
                <FaHeartPulse />
                Health information
              </button>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-8 bg-white rounded-xl border-[1px] border-cyan-500 p-6">
            <div className="flex flex-col gap-4">
              <div className="flex gap-3 flex-col w-full col-span-6">
                <p className="text-sm">Profile Image</p>
                <div className="w-full text-center grid grid-cols-12 gap-4">
                  <div
                    className="px-6 lg:col-span-10 sm:col-span-8 col-span-12 pt-5 pb-6 border-2 border-dashed border-cyan-100 rounded-md cursor-pointer"
                    role="presentation"
                    tabIndex="0">
                    <input type="file" tabIndex="-1" />
                    <span className="mx-auto flex justify-center"></span>
                    <p className="text-sm mt-2">Drag your image here</p>
                    <em className="text-xs text-gray-400">
                      (Only *.jpeg and *.png images will be accepted)
                    </em>
                  </div>
                  <div className="lg:col-span-2 sm:col-span-4 col-span-12">
                    <img
                      src="http://placehold.it/300x300"
                      alt="preview"
                      className=" w-full h-32 rounded object-cover"
                    />
                  </div>
                </div>
              </div>
              {/* start */}
              <div className="flex w-full flex-col gap-3">
                <div className="text-sm relative w-full flex justify-between gap-8">
                  <div className="w-full">
                    <label className="text-black text-sm ">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={patient.name}
                      disabled
                      className="w-full bg-transparent text-sm mt-3 p-2 border border-cyan-100 font-light rounded-lg focus:border focus:border-cyan-500"
                    />
                  </div>
                  <div className="w-full">
                    <label className="text-black text-sm ">Surname</label>
                    <input
                      type="text"
                      name="surname"
                      value={patient.surname}
                      disabled
                      className="w-full bg-transparent text-sm mt-3 p-2 border border-cyan-100 font-light rounded-lg focus:border focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>
              {/* finish */}
              {/* start */}
              <div className="flex w-full flex-col gap-3">
                <div className="text-sm relative w-full flex justify-between gap-8">
                  <div className="w-full">
                    Nationality:
                    <div>
                      <label>
                        <input type="radio" value="Seçenek 1" />
                        Seçenek 1
                      </label>
                    </div>
                    <div>
                      <label>
                        <input type="radio" value="Seçenek 2" />
                        Seçenek 2
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              {/* finish */}
              <div className="flex w-full flex-col gap-3">
                <div className="text-sm relative w-full ">
                  <div className="w-full">
                    <label className="text-black text-sm ">Phone Number</label>
                    <input
                      type="text"
                      className="w-full bg-transparent text-sm mt-3 p-4 border border-cyan-100 font-light rounded-lg focus:border focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>
              <div className="text-sm w-full">
                <label className="text-black text-sm ">Surname</label>
                <input
                  type="text"
                  className="w-full bg-transparent text-sm mt-3 p-4 border border-cyan-100 font-light rounded-lg focus:border focus:border-cyan-500"
                />
              </div>
              <div className="text-sm w-full">
                <label className="text-black text-sm ">Phone Number</label>
                <input
                  type="number"
                  className="w-full bg-transparent text-sm mt-3 p-4 border border-cyan-100 font-light rounded-lg focus:border focus:border-cyan-500"
                />
              </div>
              <div className="text-sm w-full">
                <label className="text-black text-sm ">Email</label>
                <input
                  type="email"
                  className="w-full bg-transparent text-sm mt-3 p-4 border border-cyan-100 font-light rounded-lg focus:border focus:border-cyan-500"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <button className="w-full flex justify-center items-center flex-rows gap-4 hover:opacity-80 transitions bg-red-500 text-white text-sm font-medium px-2 py-4 rounded">
                  Delete Doctor
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    className="text-white text-xl"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8ZM6 10V20H18V10H6ZM9 12H11V18H9V12ZM13 12H15V18H13V12ZM7 5V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V5H22V7H2V5H7ZM9 4V5H15V4H9Z"></path>
                  </svg>
                </button>
                <button className="w-full flex justify-center items-center flex-rows gap-4 hover:opacity-80 transitions bg-green-700 text-white text-sm font-medium px-2 py-4 rounded">
                  Save Changes
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="text-white text-xl"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientProfile;
