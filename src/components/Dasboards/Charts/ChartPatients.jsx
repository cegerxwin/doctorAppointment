import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { number, string } from "prop-types";
import {
  setPatientsTotalCounts,
  setPatientsDailyCounts,
  setPatientsSeries,
  setPatientsOptions,
} from "../../../redux/slices/chartPatientsSlice.js";
import {
  useGetPatientsQuery,
  useGetAppointmentsQuery,
} from "../../../redux/features/api/apiSlice.js";
import ReactApexChart from "react-apexcharts";

const ChartPatients = ({ color, days, dataName, chartType }) => {
  const options = useSelector((state) => state.chartPatients.patientsOptions);
  const series = useSelector((state) => state.chartPatients.patientsSeries);
  const dailyCounts = useSelector(
    (state) => state.chartPatients.patientsDailyCounts
  );
  const totalCounts = useSelector(
    (state) => state.chartPatients.patientsTotalCounts
  );

  const dispatch = useDispatch();

  const {
    data: patients,
    error: patientsError,
    isLoading: patientsLoading,
  } = useGetPatientsQuery();
  const {
    data: appointments,
    error: appointmentsError,
    isLoading: appointmentsLoading,
  } = useGetAppointmentsQuery();

  let selectedData = dataName === "patients" ? patients : appointments;

  useEffect(() => {
    if (
      !patientsLoading &&
      !appointmentsLoading &&
      !patientsError &&
      !appointmentsError &&
      patients &&
      appointments
    ) {
      let counts = {};
      // Initialize total count
      let totalCounts = 0;
      if (days === 30) {
        // Sort data by date (most recent date at the top)
        const sortedRes = [...selectedData].sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA;
        });

        // Get the last 30 days
        selectedData = sortedRes;
      }
      selectedData.map((item) => {
        const date = item.createdAt;
        if (counts[date]) {
          counts[date]++;
        } else {
          counts[date] = 1;
        }
        // Increment total count
        totalCounts++;
        return null;
      });

      dispatch(setPatientsTotalCounts(totalCounts));
      dispatch(setPatientsDailyCounts(counts));
      dispatch(
        setPatientsSeries([
          {
            name: "Total",
            data: Array.from(Object.values(counts).slice(0, 7)),
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
          colors: color,
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
            categories: Object.keys(counts).slice(0, 7),
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
  }, [
    dispatch,
    patients,
    appointments,
    patientsLoading,
    appointmentsLoading,
    patientsError,
    appointmentsError,
  ]);

  // Yükleme durumu kontrolü
  if (patientsLoading || appointmentsLoading) return <div>Loading...</div>;
  // Hata durumu kontrolü
  if (patientsError) return <div>Error: {patientsError.toString()}</div>;
  if (appointmentsError)
    return <div>Error: {appointmentsError.toString()}</div>;

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
        <p className={`text-sm flex gap-2 text-right text-[${color}] mr-5`}>
          Patients Total
        </p>
      </div>
    </>
  );
};

export default ChartPatients;

ChartPatients.propTypes = {
  // color: string,
  // days: number,
  // dataName: string,
  // chartType: string,
};