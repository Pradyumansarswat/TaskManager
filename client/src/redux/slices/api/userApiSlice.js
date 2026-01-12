import { apiSlice } from "../apiSlice";

const USER_URL = "/user"

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/profile`,
                method: "PUT",
                body: data,
                credentials: "include",
            }),
        }),


        getTeamlist: builder.query({
            query: () => ({
                url: `${USER_URL}/get-team`,
                method: "GET",
                credentials: "include",
            }),
        }),


        deleteUser: builder.mutation({
            query: (id) => ({
                url: `${USER_URL}/${id}`,
                method: "DELETE",
                credentials: "include",
            }),
        }),


        userAction: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/${data.id}`,
                method: "PUT",
                body: data,
                credentials: "include",
            }),
        }),

        getnotifications: builder.query({
            query: () => ({
                url: `${USER_URL}/notifications`,
                method: "GET",
                credentials: "include",
            }),
        }),

        markNotiAsRead: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/read-noti?isReadType=${data.type}&id=${data?.id}`,
                method: "PUT",
                body: data,
                credentials: "include",
            }),
        }),

        changepassword: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/change-password`,
                method: "PUT",
                body: data,
                credentials: "include",
            }),
        }),

        forgotPassword: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/forgot-password`,
                method: "POST",
                body: data,
            }),
        }),

        resetPassword: builder.mutation({
            query: ({ token, password }) => ({
                url: `${USER_URL}/reset-password/${token}`,
                method: "POST",
                body: { password },
            }),
        }),


    }),
});


export const { useUpdateUserMutation, useGetTeamlistQuery, useDeleteUserMutation, useUserActionMutation, useChangepasswordMutation, useMarkNotiAsReadMutation, useGetnotificationsQuery, useForgotPasswordMutation, useResetPasswordMutation } = userApiSlice