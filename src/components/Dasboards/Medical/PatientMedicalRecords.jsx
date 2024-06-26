import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  useGetPatientByIdQuery,
  useGetAppointmentsByPatientAndDateQuery,
} from "../../../redux/features/api/apiSlice.js";
import Spinner from "../../UI/Spinner.jsx";
import { FaBoxArchive, FaRegCalendarDays, FaUser } from "react-icons/fa6";
import BloodType from "../Services/BloodType.jsx";
import { Link } from "react-router-dom";
import { countries } from "../Services/Countries.jsx";
import { bloodGroups } from "../Services/BloodGroups.jsx";
import { format } from "date-fns";
import PatientStickyLink from "../Services/PatientStickyLink.jsx";

const PatientMedicalRecords = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: patientId } = useParams();
  const selectedDate = new Date().toISOString().split("T")[0]; // Set the selected date to today

  const {
    data: appointments,
    isLoading: isLoadingAppointment,
    isError: isErrorAppointment,
  } = useGetAppointmentsByPatientAndDateQuery(
    { patientId },
    {
      skip: !patientId,
    }
  );

  const {
    data: patient,
    isError,
    isLoading,
  } = useGetPatientByIdQuery(patientId);

  if (isLoading || isLoadingAppointment) return <p>Loading...</p>;
  if (isError || isErrorAppointment) return <p>Error fetching patient.</p>;

  const patientName = `${patient.name}${patient.surname}`;

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
            src={
              patient.photo !== "null" &&
              patient.photo !== null &&
              patient.photo !== ""
                ? patient.photo
                : patient.gender === 2
                ? "/images/male.png"
                : patient.gender === 1
                ? "/images/female.png"
                : "/images/agender.png"
            }
            alt={patientName}
            className="mt-[-120px] ml-[100px] w-36 h-36 rounded-full object-cover border border-dashed border-cyan-500 p-2 items-center"
          />
        </div>

        <div className="grid grid-cols-12 gap-6 my-8 items-center">
          <div className="col-span-12 flex flex-col items-center justify-center gap-6 lg:col-span-4 bg-white rounded-xl border-[1px] border-border p-6 lg:sticky top-28 ">
            <div className="gap-2 flex-col justify-center items-center text-center">
              <h2 className="text-sm font-semibold">
                {patient.name} {patient.surname}
              </h2>
              <p className="text-xs text-gray-500">{patient.email}</p>
              <p className="text-xs">{patient.phone}</p>
            </div>

            <div className="flex flex-col items-center justify-center gap-3 px-2 xl:px-12 w-full">
              <PatientStickyLink
                patientId={patientId}
                patientName={patientName}
              />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-8 bg-white rounded-xl border-[1px] border-border p-6">
            <div className="flex justify-between items-center gap-4 p-1 mb-2">
              <h1 className="text-sm font-medium sm:block hidden">
                Medical Record
              </h1>
            </div>
            <div className="bg-cyan-50 items-start grid grid-cols-12 gap-4 rounded-xl border-[1px] border-cyan-100 p-6">
              <div className="col-span-12 md:col-span-2">
                <p className="text-xs text-black font-medium">13, Jan 2021</p>
              </div>
              <div className="col-span-12 md:col-span-6 flex flex-col gap-2">
                <p className="text-xs text-main font-light">
                  <span className="font-medium">Complaint:</span> Bleeding Gums,
                  Toothache, bad breath
                </p>
                <p className="text-xs text-main font-light">
                  <span className="font-medium">Diagnosis:</span> Gingivitis,
                  Caries, Periodontitis
                </p>
                <p className="text-xs text-main font-light">
                  <span className="font-medium">Treatment:</span> Filling,
                  Post&amp;Core, Implant, Extraction
                </p>
                <p className="text-xs text-main font-light">
                  <span className="font-medium">Prescription:</span>{" "}
                  Paracetamol, Amoxicillin, Ibuprofen, Asp...
                </p>
              </div>
              <div className="col-span-12 md:col-span-4 flex flex-rows gap-2 ml-28">
                <button className="flex justify-center items-center text-sm bg-cyan-300 hover:bg-cyan-500 hover:text-amber-500 text-white border-cyan-50 border-opacity-5 hover:border-cyan-500 rounded-md w-2/4 md:w-10 h-10">
                  <img src="/images/eye.png" alt="detail" className="h-7" />
                </button>
                <button className="flex justify-center items-center text-sm bg-red-300 hover:bg-red-500 hover:text-amber-500 text-white border-red-50 border-opacity-5 hover:border-red-500 rounded-md w-2/4 md:w-10 h-10">
                  <img src="/images/delete.png" alt="detail" className="h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientMedicalRecords;
