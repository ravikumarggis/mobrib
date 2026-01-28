import React, { useEffect } from "react";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import TextArea from "../form/input/TextArea";
import Button from "../ui/button/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import NeonSpinner from "../common/NeonSpinner";
import { useFundLock, useUpdateFundLock } from "../../queries/fundLock";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedData: any;
  email: string;
}

const WithdrawalLimitModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  selectedData,
  email,
}) => {
  //   useEffect(() => {
  //     const handleEsc = (e: KeyboardEvent) => {
  //       if (e.key === "Escape") onClose();
  //     };
  //     window.addEventListener("keydown", handleEsc);
  //     return () => window.removeEventListener("keydown", handleEsc);
  //   }, [onClose]);

  if (!isOpen) return null;
  const {
    mutate,
    isPending,
    isSuccess: AddFundSuccess,
  } = useFundLock(() => {});
  const {
    mutate: UpdateFundLock,
    isPending: UpdateFundLockPending,
    isSuccess: UpdateFundLockSuccess,
  } = useUpdateFundLock(() => {});

  const formik = useFormik({
    initialValues: {
      email: selectedData?.user?.email || email,
      amount: selectedData?.dailyWithdrawLimit || "",
      description: selectedData?.description || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      email: Yup.string().email().required("Email is required."),
      amount: Yup.number().required("Amount is required."),
      description: Yup.string().required("Description is required."),
    }),
    onSubmit: (values) => {
      const payload = {
        email: values?.email || undefined,
        description: values?.description || undefined,
        dailyWithdrawLimit: values?.amount || undefined,
        isFreezWithdraw: true,
        type: "WITHWROW_LIMIT",
      };
      if (selectedData) {
        UpdateFundLock({
          ...payload,
          id: selectedData?.id,
        });
      } else {
        mutate(payload);
      }
    },
  });

  useEffect(() => {
    if (AddFundSuccess || UpdateFundLockSuccess) {
      onClose();
    }
  }, [AddFundSuccess, UpdateFundLockSuccess]);

  return (
    <div className="fixed inset-0 z-50 flex items-center  justify-center bg-black/50 backdrop-blur-xs">
      <div className=" border border-gray-300  dark:border-gray-700   bg-white  dark:bg-gray-900 rounded-xl shadow-md w-full max-w-md p-6 animate-fadeIn">
        <div className="flex items-center justify-between border-b  border-gray-300  dark:border-gray-700 pb-4">
          <h3 className="text-lg font-medium text-heading  text-gray-800 dark:text-white/90">
            Withdrawal Limit
          </h3>

          <button
            onClick={onClose}
            className="w-9 h-9 flex justify-center items-center rounded-md dark:text-white"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="grid gap-4 py-6">
          <div>
            <Label>Email</Label>
            <Input
              type="text"
              name="email"
              value={formik.values.email}
              placeholder="Enter the email"
              onChange={formik.handleChange}
            />
            {formik.touched.email && formik.errors.email && (
              <span className="text-red-500 text-xs">
                {formik.errors.email as string}
              </span>
            )}
          </div>

          <div>
            <Label>Amount</Label>
            <Input
              type="number"
              name="amount"
              value={formik.values.amount}
              placeholder="Enter the amount"
              onChange={formik.handleChange}
            />
            {formik.touched.amount && formik.errors.amount && (
              <span className="text-red-500 text-xs">
                {formik.errors.amount as string}
              </span>
            )}
          </div>

          <div>
            <Label>Description</Label>
            <TextArea
              value={formik.values.description}
              onChange={(val) => {
                formik.setFieldValue("description", val);
              }}
            />
          </div>
          {formik.touched.description && formik.errors.description && (
            <p className="text-red-500 text-xs -mt-5">
              {formik.errors.description as string}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-3  pt-0">
          <Button onClick={onClose} className="px-4 py-2">
            Cancel
          </Button>

          <Button
            onClick={() => formik.handleSubmit()}
            className="px-4 py-2"
            size="sm"
            startIcon={
              (isPending || UpdateFundLockPending) && <NeonSpinner size="6" />
            }
            disabled={isPending || UpdateFundLockPending}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalLimitModal;
