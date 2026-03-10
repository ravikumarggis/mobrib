import React from "react";
import BackComponent from "../../components/backcomponent/BackComponent";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import LoadingScreen from "../../components/common/LoadingScreen";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { useSendNotification } from "../../queries/notification";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronDown } from "lucide-react";

const roles = [
  { id: 1, name: "Hirer" },
  { id: 2, name: "Tasker" },
  { id: 3, name: "ALL" },
];

interface NotificationPayload {
  role?: any;
  heading: any;
  msg: any;
}

const SendNotification: React.FC = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useSendNotification(() =>
    navigate("/send-notification")
  );

  const formik = useFormik<NotificationPayload>({
    initialValues: {
      role: "",
      heading: "",
      msg: "",
    },
    validationSchema: Yup.object({
      role: Yup.string().required("Role is required"),
      heading: Yup.string().required("Heading is required"),
      msg: Yup.string().required("Message is required"),
    }),
    onSubmit: (values) => {
      const payload = {
        heading: values.heading,
        msg: values.msg,
        ...(values.role !== "ALL" && { role: values.role }),
      };

      mutate(payload);
    },
  });

  return (
    <div className="flex-row w-full justify-center items-center ">
      <BackComponent text="Send Notification" backpageroute="/" />

      <div className="mt-10 space-y-6 w-full justify-center items-center ">
        {/* ROLE */}
        {/* <div className="max-w-sm">
          <Label htmlFor="role">Role</Label>
          <select
            name="role"
            id="role"
            value={formik.values.role}
            onChange={formik.handleChange}
            className="border rounded-lg w-full p-2"
          >
            <option value="">Select Role</option>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="ALL">All</option>
          </select>

          {formik.touched.role && formik.errors.role && (
            <span className="text-red-500 text-xs">
              {formik.errors.role}
            </span>
          )}
        </div> */}
        <div className="w-full max-w-sm">
          <Listbox
            value={roles.find((r) => r.name === formik.values.role)}
            onChange={(value) => {
              formik.setFieldValue("role", value?.name);
            }}
          >
            <Label>Role</Label>

            <ListboxButton className="rounded-lg border border-gray-200 dark:border-gray-800 text-sm flex items-center justify-between w-full px-3 py-2.5 text-gray-500 dark:text-white">
              <p>{formik.values.role || "Select Role"}</p>
              <ChevronDown size={18} />
            </ListboxButton>

            <ListboxOptions
              anchor="bottom start"
              className="rounded-lg border bg-white dark:bg-black shadow-md mt-1 w-[200px]"
            >
              {roles.map((role) => (
                <ListboxOption
                  key={role.id}
                  value={role}
                  className="cursor-pointer px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 dark:bg-black bg-white text-gray-400 dark:text-white/30"
                >
                  {role.name}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Listbox>

          {formik.touched.role && formik.errors.role && (
            <span className="text-red-500 text-xs">{formik.errors.role}</span>
          )}
        </div>

        {/* HEADING */}
        <div className="max-w-sm">
          <Label htmlFor="heading">Heading</Label>
          <Input
            type="text"
            name="heading"
            value={formik.values.heading}
            onChange={formik.handleChange}
            id="heading"
            placeholder="Enter Heading"
          />

          {formik.touched.heading && formik.errors.heading && (
            <span className="text-red-500 text-xs">
              {formik.errors.heading}
            </span>
          )}
        </div>

        {/* MESSAGE */}
        <div className="max-w-sm">
          <Label htmlFor="msg">Message</Label>
          <textarea
            name="msg"
            value={formik.values.msg}
            onChange={formik.handleChange}
            className="border rounded-lg w-full p-2 text-black dark:text-white"
            rows={4}
            placeholder="Enter message"
          />

          {formik.touched.msg && formik.errors.msg && (
            <span className="text-red-500 text-xs">{formik.errors.msg}</span>
          )}
        </div>

        {/* BUTTON */}
        <div>
          <Button
            onClick={() => formik.handleSubmit()}
            children="Send Notification"
            className="w-[180px]"
          />
        </div>
      </div>

      {isPending && <LoadingScreen />}
    </div>
  );
};

export default SendNotification;
