import React, { useState, useEffect } from "react";
import BackComponent from "../../components/backcomponent/BackComponent";
import DataEditor from "../../components/JoditDataEditor/DataEditor";
import { useParams } from "react-router";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import LoadingScreen from "../../components/common/LoadingScreen";
import { useViewStaticContent } from "../../queries/static-content";
const ViewStaticContent: React.FC = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const ViewContentID = id;
  const { data, isPending } = useViewStaticContent(ViewContentID);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (data?.data?.result?.description) {
      setContent(data.data.result.description);
    }
  }, [data]);
  return (
    <div>
      <BackComponent
        text="Static Content Details"
        backpageroute="/static-content-mangment"
      />
      <div className="mt-10">
        <div className="max-w-sm">
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            value={data?.data?.result?.title}
            name="title"
            id="title"
            placeholder="Enter Title"
            disabled={true}
          />
        </div>
        <p className="mt-4 mb-2 font-bold text-base text-[#344054] dark:text-white">
          Description
        </p>
        <DataEditor
          disabled={true}
          content={data?.data?.result?.description}
          onChange={(newContent) => setContent(newContent)}
        />
      </div>

      {isPending && <LoadingScreen />}
    </div>
  );
};

export default ViewStaticContent;
