import React from "react";
import BackComponent from "../../components/backcomponent/BackComponent";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import DataEditor from "../../components/JoditDataEditor/DataEditor";

import { useParams } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../../components/ui/button/Button";
import { useNavigate } from "react-router";
import LoadingScreen from "../../components/common/LoadingScreen";
import { useEditStaticContent, useViewStaticContent } from "../../queries/static-content";
interface StaticContent {
  title: string;
  description: string;
}

const EditStaticContent: React.FC = () => {
  const navigate = useNavigate();
  const { id, type } = useParams<{ id: string; type: string }>();

  
  
  const ViewContentType = type;

  
  const { data, isPending } = useViewStaticContent(ViewContentType);
  const { mutate } = useEditStaticContent(() =>
    navigate("/static-content-mangment")
  );

  console.log(data,"jhbhbhbb");


  const formik = useFormik<StaticContent>({
    initialValues: {
      title: data ? data?.data?.result?.title : "",
      description: data ? data?.data?.result?.description : "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required."),
      description: Yup.string().required("Description is required."),
    }),
    onSubmit: (values) => {
      mutate({
        _id: data ? data?.data?.result?._id : undefined,
        title: values?.title,
        description: values?.description,
      });
    },
  });
  return (
    <div>
      <BackComponent
        text="Edit Static Content"
        backpageroute="/static-content-mangment"
      />

      <div className="mt-10">
        <div className="max-w-sm">
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            value={formik.values.title}
            name="title"
            onChange={formik.handleChange}
            id="title"
            // disabled={true}
            placeholder="Enter Title"
          />
          {formik.touched.title && formik.errors.title && (
            <span className="text-red-500 text-xs">{formik.errors.title}</span>
          )}
        </div>

        <div>
          <p className="mt-4 mb-2 font-medium text-base text-[#344054] dark:text-white">
            Description
          </p>
          <DataEditor
            disabled={false}
            content={formik?.values?.description}
            onChange={(newContent: string) =>
              formik.setFieldValue("description", newContent)
            }
          />
          {formik.touched.description && formik.errors.description && (
            <span className="text-red-500 text-xs">
              {formik.errors.description}
            </span>
          )}
        </div>

       
          <div className="mt-4">
            <Button
              onClick={() => formik.handleSubmit()}
              children="Update"
              className="w-[120px]"
            />
          </div>
        
      </div>
      {isPending && <LoadingScreen />}
    </div>
  );
};

export default EditStaticContent;
