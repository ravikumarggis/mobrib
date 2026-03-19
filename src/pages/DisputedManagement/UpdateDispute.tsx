import { useEffect, useState } from "react";
import { IndianRupee } from "lucide-react";
import Button from "../../components/ui/button/Button";
import BackComponent from "../../components/backcomponent/BackComponent";
import LoadingScreen from "../../components/common/LoadingScreen";

const UpdateDispute = () => {
  const [action, setAction] = useState("");

  const [amounts, setAmounts] = useState({
    posterAmount: "",
    taskerAmount: "",
    fee: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ==========================
     HANDLE AMOUNT CHANGE
  ========================== */
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmounts({
      ...amounts,
      [e.target.name]: e.target.value,
    });
  };

  /* ==========================
     HANDLE SUBMIT
  ========================== */
  const handleSubmit = () => {
    if (!action) {
      alert("Please select action");
      return;
    }

    const payload: any = {
      action,
    };

    if (action === "PARTIAL_PAYMENT") {
      payload.posterAmount = Number(amounts.posterAmount);
      payload.taskerAmount = Number(amounts.taskerAmount);
      payload.fee = Number(amounts.fee);
    }

    console.log("Final Payload:", payload);

    // 👉 Call your API here
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Submitted Successfully");
    }, 1000);
  };

  if (isSubmitting) {
    return <LoadingScreen />;
  }

  return (
    <div className="w-full justify-center">
      <BackComponent text="Update Dispute" />

      <div className="mt-4 rounded-xl shadow-md p-8 border border-gray-200 dark:border-gray-700">

        {/* ==========================
            ACTION DROPDOWN
        ========================== */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 dark:text-white">
            Select Action
          </label>

          <select
            value={action}
            onChange={(e) => setAction(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border 
                       border-gray-300 dark:border-gray-600
                       bg-white dark:bg-gray-700 
                       focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
          >
            <option value="">Select Action</option>
            <option value="REFUND_POSTER">Refund Poster</option>
            <option value="PAY_TASKER">Pay Tasker</option>
            <option value="PARTIAL_PAYMENT">Partial Payment</option>
            <option value="REJECTED_DISPUTE">Reject Dispute</option>
          </select>
        </div>

        {/* ==========================
            CONDITIONAL FIELDS
        ========================== */}
        {action === "PARTIAL_PAYMENT" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Poster Amount */}
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                Poster Amount
              </label>
              <div className="relative">
                <IndianRupee
                  size={18}
                  className="absolute left-3 top-3 text-gray-400"
                />
                <input
                  type="number"
                  name="posterAmount"
                  value={amounts.posterAmount}
                  onChange={handleAmountChange}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border 
                             border-gray-300 dark:border-gray-600
                             bg-white dark:bg-gray-700 
                             focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
                />
              </div>
            </div>

            {/* Tasker Amount */}
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                Tasker Amount
              </label>
              <div className="relative">
                <IndianRupee
                  size={18}
                  className="absolute left-3 top-3 text-gray-400"
                />
                <input
                  type="number"
                  name="taskerAmount"
                  value={amounts.taskerAmount}
                  onChange={handleAmountChange}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border 
                             border-gray-300 dark:border-gray-600
                             bg-white dark:bg-gray-700 
                             focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
                />
              </div>
            </div>

            {/* Fee */}
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                Fee
              </label>
              <div className="relative">
                <IndianRupee
                  size={18}
                  className="absolute left-3 top-3 text-gray-400"
                />
                <input
                  type="number"
                  name="fee"
                  value={amounts.fee}
                  onChange={handleAmountChange}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border 
                             border-gray-300 dark:border-gray-600
                             bg-white dark:bg-gray-700 
                             focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
                />
              </div>
            </div>

          </div>
        )}

        {/* ==========================
            SUBMIT BUTTON
        ========================== */}
        <div className="mt-8 flex justify-end">
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>

      </div>
    </div>
  );
};

export default UpdateDispute;