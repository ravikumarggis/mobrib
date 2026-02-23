import React from "react";
import BackComponent from "../../components/backcomponent/BackComponent";
import Label from "../../components/form/Label";
import TextArea from "../../components/form/input/TextArea";
import Button from "../../components/ui/button/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import LoadingScreen from "../../components/common/LoadingScreen";
import { useLocation, useNavigate } from "react-router";
import { useAddUpdateFAQ } from "../../queries/FAQManagement";

interface FormValues {
  question: string;
  answer: string;
}

const AddUpdateFAQ: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { type, selectedData } = location?.state || {};

  const { mutate, isPending } = useAddUpdateFAQ(() => {
    navigate("/faq-list");
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      question: selectedData?.question || "",
      answer: selectedData?.answer || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      question: Yup.string().required("Question is required."),
      answer: Yup.string().required("Answer is required."),
    }),
    onSubmit: (values) => {
      mutate({
        question: values.question,
        answer: values.answer,
        _id : type === "editFAQ" ? selectedData?._id : undefined,
      });
    },
  });

  return (
    <div className="w-full">
      <BackComponent text="FAQ's" />

      <div className="mt-5 border rounded-lg p-4 border-gray-300 dark:border-gray-700">
        {/* Question */}
        <div className="mb-4">
          <Label>
            <p>Enter Question</p>
          </Label>
          <TextArea
            disabled={type === "viewFAQ"}
            value={formik.values.question}
            onChange={(value: string) =>
              formik.setFieldValue("question", value)
            }
            onBlur={() => formik.setFieldTouched("question", true)}
            placeholder="Enter question..."
          />
          {formik.touched.question && formik.errors.question && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors.question}
            </p>
          )}
        </div>

        {/* Answer */}
        <div className="mb-4">
          <Label>
            <p>Enter Answer</p>
          </Label>
          <TextArea
            disabled={type === "viewFAQ"}
            value={formik.values.answer}
            onChange={(value: string) =>
              formik.setFieldValue("answer", value)
            }
            onBlur={() => formik.setFieldTouched("answer", true)}
            placeholder="Enter answer..."
          />
          {formik.touched.answer && formik.errors.answer && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors.answer}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center items-center mt-4 w-full">
          <Button
            disabled={type === "viewFAQ"}
            className="px-14 w-full sm:w-auto"
            onClick={() => formik.handleSubmit()}
          >
            Submit
          </Button>
        </div>
      </div>

      {isPending && <LoadingScreen />}
    </div>
  );
};

export default AddUpdateFAQ;