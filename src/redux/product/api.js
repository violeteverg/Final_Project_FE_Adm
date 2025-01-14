import { baseUrl } from "@/lib/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  tagTypes: ["PRODUCT_LIST", "PRODUCT_ID"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/product`,
  }),
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["PRODUCT_LIST"],
    }),
    getProduct: builder.query({
      query: ({ page, limit, search }) => {
        console.log(page, limit);
        return {
          url: `/findAll?page=${page}&limit=${limit}&search=${search}`,
        };
      },
      transformResponse: (response) => {
        return response;
      },
      providesTags: ["PRODUCT_LIST"],
    }),
    getProductId: builder.query({
      query: ({ id }) => ({
        url: `/findId/${id}`,
        method: "GET",
      }),
      providesTags: ["PRODUCT_ID"],
    }),
    updateProduct: builder.mutation({
      query: ({ data, id }) => ({
        url: `/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["PRODUCT_LIST", "PRODUCT_ID"],
    }),
    deleteProduct: builder.mutation({
      query: ({ id, body }) => ({
        url: `/delete/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["PRODUCT_LIST", "PRODUCT_ID"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetProductQuery,
  useGetProductIdQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
