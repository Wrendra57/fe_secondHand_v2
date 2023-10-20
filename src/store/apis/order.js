import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
  tagTypes: ["Order"],
  endpoints: (build) => ({
    createOrder: build.mutation({
      query: ({ token, body, id_product }) => ({
        url: `api/v1/order/${id_product}`,
        method: "POST",
        body: body,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Order"],
    }),
    checkStatusOrder: build.mutation({
      query: ({ token, id_product }) => ({
        url: `api/v1/order/status/${id_product}`,
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});
export const { useCreateOrderMutation, useCheckStatusOrderMutation } = orderApi;

export default orderApi;
