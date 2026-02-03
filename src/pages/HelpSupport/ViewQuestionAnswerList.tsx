import React from "react";
import BackComponent from "../../components/backcomponent/BackComponent";
import TextArea from "../../components/form/input/TextArea";
import { useLocation, useParams } from "react-router";
import { useViewQA } from "../../queries/helpandspport";
import DataNotFound from "../../components/common/DataNotFound";
import LoadingScreen from "../../components/common/LoadingScreen";

const ViewQuestionAnswerList: React.FC = () => {
  const { id } = useParams<string>();
  const location = useLocation();
  const subCategroListID = location.state;
  const { data, isPending } = useViewQA(Number(id));
  return (
    <div>
      <div>
        <BackComponent
          text="View Question/Answer"
        // backpageroute={`/view-subcategory/$`}
        />
      </div>
      <div className="mt-10 flex flex-col space-y-4">
        {data?.data?.result?.questionData?.map((item: any) => {
          return (
            <>
              <TextArea
                value={`Question: ${item?.question}`}
                disabled={true}
                placeholder="Write Question here...."
              />
              <TextArea
                disabled={true}
                value={`Answer: ${item?.answer}`}
                placeholder="Werite Answer here...."
              />
            </>
          );
        })}
      </div>

      {data?.data?.result?.questionData?.length == 0 && <DataNotFound />}
      {isPending && <LoadingScreen />}
    </div>
  );
};

export default ViewQuestionAnswerList;
