import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { number, array, string } from "prop-types";
import {
  useGetPatientsQuery,
  useGetAppointmentsQuery,
} from "../../../redux/features/api/apiSlice.js";
import {
  setAppointmentsPieTotalCounts,
  setAppointmentsPieMonths,
  setAppointmentsPieSeries,
  setAppointmentsPieOptions,
} from "../../../redux/slices/chartAppointmentsPieSlice.js";
import ReactApexChart from "react-apexcharts";

const ChartPieAppointments = ({ dataName, color, widthChart }) => {
  const options = useSelector(
    (state) => state.chartAppointmentsPie.appointmentsPieOptions
  );
  const series = useSelector(
    (state) => state.chartAppointmentsPie.appointmentsPieSeries
  );
  const months = useSelector(
    (state) => state.chartAppointmentsPie.appointmentsPieMonths
  );
  const totalCounts = useSelector(
    (state) => state.chartAppointmentsPie.appointmentsPieTotalCounts
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
    // Verileri aylara göre gruplamak için bir fonksiyon
    function groupDataByMonth(data) {
      let groupedData = {};
      let months = [];
      let totalDataCounts = [];
      let dateParts;
      data.map((item) => {
        if (dataName === "appointments") {
          dateParts = item.date.split(".");
        } else {
          dateParts = item.createdAt.split(".");
        }

        let [day, month, year] = dateParts;

        let key = `${year}-${month}`;

        groupedData[key] = [...(groupedData[key] || []), item];
      });

      // Her ay için toplam veriyi hesapla
      Object.keys(groupedData).forEach((key) => {
        months = [...months, key]; // Ayı diziyi ekle
        totalDataCounts = [...totalDataCounts, groupedData[key].length]; // Toplam veri sayısını diziyi ekle
      });
      return { months, totalDataCounts };
    }
    if (
      !patientsLoading &&
      !appointmentsLoading &&
      !patientsError &&
      !appointmentsError &&
      patients &&
      appointments
    ) {
      // Gruplanmış veriyi al
      const { months, totalDataCounts } = groupDataByMonth(selectedData);

      dispatch(setAppointmentsPieTotalCounts(totalDataCounts));
      dispatch(setAppointmentsPieMonths(months));
      dispatch(setAppointmentsPieSeries(totalDataCounts.slice(0, 3)));
      dispatch(
        setAppointmentsPieOptions({
          chart: {
            width: widthChart,
            type: "pie",
          },
          labels: months.slice(0, 3),
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
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
    <ReactApexChart
      options={options}
      series={series}
      type="pie"
      width={widthChart}
    />
  );
};

export default ChartPieAppointments;

ChartPieAppointments.propTypes = {
  /*   dataName: string,
  widthChart: number,
  color: array, */
};