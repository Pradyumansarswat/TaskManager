import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog } from "@headlessui/react";
import { toast } from "sonner";
import ModalWrapper from "./ModalWrapper";
import Textbox from "./Textbox";
import Button from "./Button";
import Loading from "./Loader";
import { useForgotPasswordMutation, useResetPasswordMutation } from "../redux/slices/api/userApiSlice";

const ForgotPassword = ({ open, setOpen }) => {
  const [step, setStep] = useState(1); 
  const [resetToken, setResetToken] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [forgotPassword, { isLoading: isSending }] = useForgotPasswordMutation();
  const [resetPassword, { isLoading: isResetting }] = useResetPasswordMutation();

  const handleEmailSubmit = async ({ email }) => {
    try {
      const res = await forgotPassword({ email }).unwrap();
      setResetToken(res?.token); 
      toast.success("Email verified. Please set a new password.");
      setStep(2);
    } catch (err) {
      toast.error(err?.data?.message || "Email verification failed");
    }
  };

  const handlePasswordSubmit = async (data) => {
    if (data.password !== data.cpass) {
      toast.warning("Passwords do not match");
      return;
    }
    try {
      await resetPassword({
        token: resetToken,
        password: data.password,
      }).unwrap();
      toast.success("Password reset successfully");
      setOpen(false);
      reset();
      setStep(1);
    } catch (err) {
      toast.error(err?.data?.message || "Password reset failed");
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form
        onSubmit={handleSubmit(step === 1 ? handleEmailSubmit : handlePasswordSubmit)}
        className=""
      >
        <Dialog.Title className="text-base font-bold leading-6 text-gray-900 mb-4">
          {step === 1 ? "Verify Email" : "Reset Password"}
        </Dialog.Title>

        {step === 1 && (
          <div className="mt-2 flex flex-col gap-6">
            <Textbox
              placeholder="Enter your email"
              type="email"
              name="email"
              className="w-full rounded"
              label="Email Address"
              register={register("email", {
                required: "Email is required",
              })}
              error={errors.email ? errors.email.message : ""}
            />
          </div>
        )}

        {step === 2 && (
          <div className="mt-2 flex flex-col gap-6">
            <Textbox
              placeholder="Enter your new password"
              type="password"
              name="password"
              className="w-full rounded"
              label="New Password"
              register={register("password", {
                required: "New Password is required",
              })}
              error={errors.password ? errors.password.message : ""}
            />
            <Textbox
              placeholder="Confirm your new password"
              type="password"
              name="cpass"
              className="w-full rounded"
              label="Confirm New Password"
              register={register("cpass", {
                required: "Confirm Password is required",
              })}
              error={errors.cpass ? errors.cpass.message : ""}
            />
          </div>
        )}

        {(isSending || isResetting) ? (
          <div className="mt-4"><Loading /></div>
        ) : (
          <div className="py-3 mt-4 sm:flex sm:flex-row-reverse">
            <Button
              type="submit"
              label={step === 1 ? "Verify Email" : "Save Password"}
              className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-800"
            />
            <button
              type="button"
              className="bg-white px-5 text-sm font-semibold text-gray-900"
              onClick={() => {
                setOpen(false);
                setStep(1);
                reset();
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </ModalWrapper>
  );
};

export default ForgotPassword;
