import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:3000/api/order";

export const orderApi = createApi({
  reducerPath: "orderApi",
  tagTypes: ["ORDER_LIST"],
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
  }),
});

export const { useGetOrderQuery } = orderApi;
