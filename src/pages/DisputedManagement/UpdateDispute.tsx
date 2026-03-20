import { useState } from "react";
import { IndianRupee } from "lucide-react";
import Button from "../../components/ui/button/Button";
import BackComponent from "../../components/backcomponent/BackComponent";
import LoadingScreen from "../../components/common/LoadingScreen";
import { useUpdateDispute } from "../../queries/dispute";
import { useLocation, useNavigate } from "react-router";

const UpdateDispute = () => {

    const location = useLocation();
  const { state } = location.state || {};

  const navigate = useNavigate()
  
  const [action, setAction] = useState("");

  const [amounts, setAmounts] = useState({
    posterAmount: "",
    taskerAmount: "",
    fee: "",
  });

  const { mutate: updateDispute, isPending } = useUpdateDispute();

  /* ==========================
     HANDLE AMOUNT CHANGE
  ========================== */
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmounts((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* ==========================
     HANDLE SUBMIT
  ========================== */
  const handleSubmit = () => {
    if (!action) {
      alert("Please select action");
      return;
    }

    let payload: any = {
      action,
      disputeId : state
    };

    // 👉 Only send these fields for PARTIAL_PAYMENT
    if (action === "PARTIAL_PAYMENT") {
      payload = {
        ...payload,
        posterAmount: Number(amounts.posterAmount) || 0,
        taskerAmount: Number(amounts.taskerAmount) || 0,
        fee: Number(amounts.fee) || 0,
      };
    }

  

    updateDispute(payload, {
      onSuccess: () => {
        // ✅ Reset form after success
        setAction("");
        setAmounts({
          posterAmount: "",
          taskerAmount: "",
          fee: "",
        });
        navigate("/dispute")
        
      },
    });
  };

  if (isPending) {
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
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </div>

      </div>
    </div>
  );
};

export default UpdateDispute;