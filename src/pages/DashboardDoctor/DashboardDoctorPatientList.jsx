import DoctorPatientList from "../../components/DoctorDashboard/DoctorPatientList";
import TitleCard from "../../components/UI/Cards/TitleCard";

const DashboardDoctorPatientList = () => {
  return (
    <>
      <div className="xl:px-8 px-2 pt-6">
        <TitleCard title={"P A T I E N T S - L I S T"} />
        <div className="w-full my-6 grid xl:grid-cols-8 grid-cols-1 gap-6">
          <div className="xl:col-span-12 w-full">
            <DoctorPatientList />
          </div>
        </div>
      </div>
    </>
  );
};
export default DashboardDoctorPatientList;
