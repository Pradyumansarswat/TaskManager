import React from "react";
import { useChangepasswordMutation } from "../redux/slices/api/userApiSlice";
import { toast } from "sonner";
import ModalWrapper from "./ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "./Textbox";
import Loading from "./Loader";
import Button from "./Button";
import { useForm } from "react-hook-form";

const ChangePassword = ({ open, setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [changeUserPassword, { IsLoading }] = useChangepasswordMutation();
  const handleOnSubmit = async (data) => {
    if (data.password !== data.cpass) {
      toast.warning("Passwords do not match");
      return;
    }
    try {
      const res = await changeUserPassword(data).unwrap();
      toast.success("Password changed successfully");
      setTimeout(() => {
        setOpen(false);
      }, 1500);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="">
          <Dialog.Title
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4"
          >
            Change Password
          </Dialog.Title>
          <div className="mt-2 flex flex-col gap-6">
            <Textbox
              placeholder="Enter your New password"
              type="password"
              name="password"
              className="w-full rounded"
              label="New Password"
              register={register("password", {
                required: "New Password is required",
              })}
              error={errors.password ? errors.password.message : ""}
            ></Textbox>
            <Textbox
              placeholder="Confirm New password"
              type="password"
              name="cpass"
              className="w-full rounded"
              label="Confirm New Password"
              register={register("cpass", {
                required: "Confirm New Password is required",
              })}
              error={errors.cpass ? errors.cpass.message : ""}
            ></Textbox>
          </div>

          {IsLoading ? (
            <div>
              <Loading />
            </div>
          ) : (
            <div className="py-3 mt-4 sm:flex sm:flex-row-reverse">
              <Button
                type="submit"
                className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-800 "
                label="save"
                
              />
              <button
                type="button"
                className="bg-white px-5 text-sm font-semibold text-gray-900  sm:auto"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </ModalWrapper>
    </>
  );
};

export default ChangePassword;
