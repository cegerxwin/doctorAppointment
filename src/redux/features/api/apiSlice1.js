import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice1 = createApi({
  reducerPath: "api",
  //baseQuery: fetchBaseQuery({ baseUrl: "http://api.makinaburada.net/api/" }),
  // baseQuery: fetchBaseQuery({ baseUrl: "https://bsg37cps-5002.euw.devtunnels.ms/",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:3001/",
    prepareHeaders: (headers) => {
      // LocalStorage'dan token'ı al
      const token = localStorage.getItem("token");
      // Eğer token varsa, header'a ekle
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Get Patients By Page
    // getPatientsPage: builder.query({
    //   query: ({ page = 1, searchTerm, sortField, sortOrder }) =>
    //     `patients?_page=${page}&_limit=10&q=${searchTerm}&_sort=${sortField}&_order=${sortOrder}`,
    // }),
    getPatientsPage: builder.query({
      query: ({ page = 1, searchTerm, sortField, sortOrder }) =>
        // `Patients/SearchPatient?page=${page}&pageSize=10&q=${searchTerm}&sort=${sortField}&sortby=${sortOrder}`,
        `v1/Patients/SearchPatient?page=${page}&pageSize=10&q=${searchTerm}&sort=${sortField}&sortby=${sortOrder}`,
      method: "GET",
    }),
    // Delete Patient By Id
    deletePatient: builder.mutation({
      query: (id) => ({
        url: `Patients/${id}`,
        method: "DELETE",
      }),
    }),
    // Authentication Control
    authentication: builder.mutation({
      query: (loginModel) => ({
        url: `v1/Authentication`,
        method: "POST",
        body: { username: "ali@makinaburada.net", password: "123456" },
      }),
    }),
    addNewPatient: builder.mutation({
      query(newPatient) {
        return {
          url: `v1/Patients`,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: newPatient,
        };
      },
    }),

    updatePatient: builder.mutation({
      query: ({ id, updatedPatient }) => ({
        url: `v1/Patients/${id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: updatedPatient,
      }),
    }),

    getPatientById: builder.query({
      query: (id) => `v1/Patients/${id}`,
      providesTags: (results, error, id) => [{ type: "Post", id: id }],
    }),
    getDoctorById: builder.query({
      query: (id) => `v1/Doctors/${id}`,
      providesTags: (results, error, id) => [{ type: "Post", id: id }],
    }),
    getPatients: builder.query({
      query: () => "v1/Patients",
    }),
    getAppointments: builder.query({
      query: () => "Appointments",
    }),
    getDoctors: builder.query({
      query: () => "v1/Doctors",
    }),
    getBranchs: builder.query({
      query: () => "branchs",
    }),
    getRoles: builder.query({
      query: () => "roles",
    }),
    getUsersRoles: builder.query({
      query: () => "usersRoles",
    }),
    getUsers: builder.query({
      query: () => "users",
    }),
    getExaminations: builder.query({
      query: () => "examinations",
    }),
    getExamMedicines: builder.query({
      query: () => "examMedicines",
    }),
    getMedicines: builder.query({
      query: () => "medicines",
    }),
    getAuthority: builder.query({
      query: () => "authority",
    }),
    getHolidays: builder.query({
      query: () => "holidays",
    }),
    getLinks: builder.query({
      query: () => "links",
    }),
  }),
  keepUnusedDataFor: 30,
  refetchOnMountOrArgChange: 5,
});

export const {
  useGetPatientsPageQuery,
  useAuthenticationMutation,
  useDeletePatientMutation,
  useAddNewPatientMutation,
  useUpdatePatientMutation,
  useGetPatientByIdQuery,
  useGetDoctorByIdQuery,
  useGetPatientsQuery,
  useGetAppointmentsQuery,
  useGetDoctorsQuery,
  useGetBranchsQuery,
  useGetRolesQuery,
  useGetUsersRolesQuery,
  useGetUsersQuery,
  useGetExaminationsQuery,
  useGetExamMedicinesQuery,
  useGetMedicinesQuery,
  useGetAuthorityQuery,
  useGetHolidaysQuery,
  useGetLinksQuery,
} = apiSlice1;