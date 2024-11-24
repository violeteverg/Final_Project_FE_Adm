import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:3000/api/order";

export const orderApi = createApi({
  reducerPath: "orderApi",
  tagTypes: ["ORDER_LIST", "ORDER_ID", "ORDER_STAT"],
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getOrder: builder.query({
      query: ({ page, limit, search }) => {
        console.log(page, limit);
        return {
          url: `/admin/findAll?page=${page}&limit=${limit}&search=${search}`,
        };
      },
      transformResponse: (response) => {
        return response;
      },
      providesTags: ["ORDER_LIST"],
    }),
    getStatOrder: builder.query({
      query: () => {
        return {
          url: `/admin/stat`,
        };
      },
      transformResponse: (response) => {
        return response?.result;
      },
      providesTags: ["ORDER_STAT"],
    }),
    getOrderId: builder.query({
      query: ({ id }) => ({
        url: `/admin/findId/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        console.log(response.data, "ini response order id");
        return response.data;
      },
      providesTags: ["ORDER_ID"],
    }),
  }),
});

export const { useGetOrderQuery, useGetStatOrderQuery, useGetOrderIdQuery } =
  orderApi;
