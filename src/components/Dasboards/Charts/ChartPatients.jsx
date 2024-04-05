import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPatientsTotalCounts,
  setPatientsSeries,
  setPatientsOptions,
} from "../../../redux/slices/chartPatientsSlice.js";
import { useGetDailyPatientCountQuery } from "../../../redux/features/api/apiSlice.js";
import ReactApexChart from "react-apexcharts";

const ChartPatients = () => {
  const options = useSelector((state) => state.chartPatients.patientsOptions);
  const series = useSelector((state) => state.chartPatients.patientsSeries);
  const totalCounts = useSelector(
    (state) => state.chartPatients.patientsTotalCounts
  );
  const dispatch = useDispatch();

  const {
    data: patients,
    error: patientsError,
    isLoading: patientsLoading,
  } = useGetDailyPatientCountQuery();

  useEffect(() => {
    if (!patientsLoading && !patientsError && patients) {
      dispatch(setPatientsTotalCounts(patients.totalCount));

      dispatch(
        setPatientsSeries([
          {
            name: "Total",
            data: patients.data,
          },
        ])
      );
      dispatch(
        setPatientsOptions({
          chart: {
            type: "line",
            height: 200,
            toolbar: {
              show: false, // x-ekseni araç çubuğunu gizle
            },
            line: {
              show: false, // Çubuk çizgisini gösterme
            },
          },
          colors: "#32b8d5",
          plotOptions: {
            bar: {
              horizontal: false,
              borderRadius: 2,
              columnWidth: "85%",
              endingShape: "rounded",
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            show: true,
            width: 2,
            colors: ["transparent"],
          },
          legend: {
            show: false,
          },
          xaxis: {
            categories: patients.categories,
            labels: {
              show: false, // x-ekseni etiketlerini gizle
            },
            grid: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false, // X ekseni işaretlerini gizle
            },
          },
          yaxis: {
            grid: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
            labels: {
              show: false,
            },
            axisTicks: {
              show: false, // Y ekseni işaretlerini gizle
            },
          },
          grid: {
            show: false,
          },
          fill: {
            opacity: 1,
          },
        })
      );
    }
  }, [dispatch, patients, patientsLoading, patientsError]);

  if (patientsLoading) return <div>Loading...</div>;
  if (patientsError) return <div>Error: {patientsError.toString()}</div>;

  return (
    <>
      <div className="flex justify-start col-span-5">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={100}
          width={"100%"}
        />
      </div>
      <div className="flex flex-col col-span-3">
        <h4 className="text-3xl font-medium text-right mr-5">{totalCounts}</h4>
        <p className={`text-sm flex gap-2 text-right text-[#32b8d5] mr-5`}>
          Patients Total
        </p>
      </div>
    </>
  );
};

export default ChartPatients;
