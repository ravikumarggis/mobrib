import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { usePersistentTimer } from "../../hooks/usePersistentTimer";
import { api } from "../../services/apiServices";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../queries/auth";
import NeonSpinner from "../common/NeonSpinner";
import { useNavigate } from "react-router";

export default function SignInForm() {
  const [isExpired, setIsExpired] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const navigate = useNavigate();
  const { minutes, seconds, restartTimer } = usePersistentTimer({
    durationInSeconds: 30,
    storageKey: "otp-countdown",
    onExpire: () => setIsExpired(true),
    startOnMount: false,
  });

  const {
    mutateAsync: mutateLoginAccount,
    isPending: mutateLoginAccountPending,
  } = useMutation({
    mutationFn: ({
      mobileNumber,
      otp,
    }: {
      mobileNumber: string;
      otp: string;
    }) => {
      return login(mobileNumber, otp);
    },
    onSuccess: (data) => {
      if (data?.data?.responseCode == 200) {
        toast.success(data?.data?.responseMessage);
        // localStorage.setItem("token", data?.data?.result?.token);
        sessionStorage.setItem("token", data?.data?.result?.token);
        navigate("/user-list");
      } else {
        toast.error(data?.data?.responseMessage);
      }
    },
  });

  const formik = useFormik({
    initialValues: {
      mobileNumber: "",
      password: "",
      otp: "",
    },
    validationSchema: Yup.object({
      mobileNumber: Yup.string()
        .trim()
        .matches(/^\d{10}$/, "Enter a valid 10-digit number")
        .required("Required"),
      otp: Yup.string().required("OTP is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      mutateLoginAccount({
        mobileNumber: values.mobileNumber,
        otp: values.otp,
      });
    },
  });

  const resendOtp = async () => {
    try {
      const mobile = String(formik.values.mobileNumber).trim();
      const password = String(formik.values.password).trim();

      if (!mobile) {
        toast.error("Mobile number is required.");
        return;
      }

      if (!/^\d{10}$/.test(mobile)) {
        toast.error("Enter a valid 10-digit mobile number.");
        return;
      }

      if (!password) {
        toast.error("Password is required.");
        return;
      }

      const response = await api({
        url: "/admin/adminLogin",
        method: "POST",
        data: { mobileNumber: mobile , password:password },
      });

      if (response?.data?.responseCode == 200) {
        restartTimer();
        setIsExpired(false);
        setShowOtp(true)
        toast.success(
          `${response?.data?.responseMessage} and your otp is ${response?.data?.result}`
        );
              } else {
        toast.error(response?.data?.responseMessage);
      }
    } catch (error: any) {
      console.error("Resend OTP Error:", error);
      toast.error(
        error?.response?.data?.responseMessage ||
        "Failed to resend OTP. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your mobile number and OTP to sign in!
            </p>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div className="space-y-6">
              {/* Mobile Number */}
              <div>
                <Label>
                  Mobile Number <span className="text-error-500">*</span>
                </Label>
                <div >
                  <Input
                    name="mobileNumber"
                    type="tel"
                    length={10}
                    placeholder="Enter 10-digit number"
                    className="pr-[62px]"
                    value={formik.values.mobileNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.mobileNumber && formik.errors.mobileNumber
                    }
                  />
                  
                </div>
               
                {formik.touched.mobileNumber && formik.errors.mobileNumber && (
                  <p className="text-sm text-error-500 mt-1">
                    {formik.errors.mobileNumber}
                  </p>
                )}
              </div>
              <div>
                <Label>
                 Password <span className="text-error-500">*</span>
                </Label>
               
                <div className="relative">
                  <Input
                    name="password"
                    
                    length={10}
                    placeholder="Enter password"
                    className="pr-[62px]"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.password && formik.errors.password
                    }
                  />
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 border-l border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                    {isExpired ?  (
                      <span className="cursor-pointer" onClick={resendOtp}>
                        Request OTP
                      </span>
                    ) : (
                      <span>
                        {String(minutes).padStart(2, "0")}:
                        {String(seconds).padStart(2, "0")}s
                      </span>
                    )}
                  </span>
                </div>
                {formik.touched.mobileNumber && formik.errors.mobileNumber && (
                  <p className="text-sm text-error-500 mt-1">
                    {formik.errors.mobileNumber}
                  </p>
                )}
              </div>

              <div>
                <Label>
                  OTP <span className="text-error-500">*</span>
                </Label>
                <Input
                  max="4"
                  type="tel"
                  name="otp"
                  length={4}
                  placeholder="Enter OTP"
                  value={formik.values.otp}
                  disabled={!showOtp}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.otp && formik.errors.otp}
                />
                {formik.touched.otp && formik.errors.otp && (
                  <p className="text-sm text-error-500 mt-1">
                    {formik.errors.otp}
                  </p>
                )}
              </div>

              {/* Submit */}
              <div>
                <Button
                  type="submit"
                  className="w-full"
                  size="sm"
                  startIcon={
                    mutateLoginAccountPending && <NeonSpinner size="6" />
                  }
                  disabled={mutateLoginAccountPending}
                >
                  Sign in
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
