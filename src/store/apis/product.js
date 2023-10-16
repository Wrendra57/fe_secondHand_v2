import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
  tagTypes: ["Auth"],
  endpoints: (build) => ({
    getListProduct: build.mutation({
      query: ({ limit, offset }) => ({
        url: `api/v1/product/${limit}/${offset}`,
        method: "GET",
      }),
      invalidatesTags: ["Product"],
    }),
    createProduct: build.mutation({
      query: ({ token, body }) => ({
        url: `api/v1/product`,
        method: "POST",
        body: body,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Product"],
    }),
    getProduct: build.mutation({
      query: ({ id }) => ({
        url: `api/v1/product/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});
export const {
  useGetListProductMutation,
  useCreateProductMutation,
  useGetProductMutation,
} = productApi;

export default productApi;
