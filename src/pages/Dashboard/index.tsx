import { useGetDashboardCount } from "../../queries/dashboard";
import AnimatedCounter from "../../components/AnimatedCounter";
import {
  Users,
  UserCheck,
  Briefcase,
  Ticket,
  Activity,
  XCircle,
  CheckCircle,
  IndianRupee,
} from "lucide-react";

const Dashboard = () => {
  const { data, isLoading } = useGetDashboardCount();

  const stats = [
    {
      label: "Total Users",
      value: data?.totalUserCount,
      icon: Users,
      color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30",
    },
    {
      label: "Total Taskers",
      value: data?.totalTaskerCount,
      icon: UserCheck,
      color: "text-green-600 bg-green-100 dark:bg-green-900/30",
    },
    {
      label: "Total Hirers",
      value: data?.totalHirerCount,
      icon: Briefcase,
      color: "text-purple-600 bg-purple-100 dark:bg-purple-900/30",
    },
    {
      label: "Active Tickets",
      value: data?.openTicketCount,
      icon: Ticket,
      color: "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30",
    },
    {
      label: "Active Tasks",
      value: data?.activeTaskCount,
      icon: Activity,
      color: "text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30",
    },
    {
      label: "Cancelled Revenue",
      value: data?.canclledTaskRenenue?.totalAmount,
      prefix: "₹ ",
      icon: IndianRupee,
      color: "text-red-600 bg-red-100 dark:bg-red-900/30",
    },
    {
      label: "Cancelled Tasks",
      value: data?.canclledTaskRenenue?.totalCount,
      icon: XCircle,
      color: "text-red-600 bg-red-100 dark:bg-red-900/30",
    },
    {
      label: "Completed Revenue",
      value: data?.completedTaskRenenue?.totalAmount,
      prefix: "₹ ",
      icon: IndianRupee,
      color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30",
    },
    {
      label: "Completed Tasks",
      value: data?.completedTaskRenenue?.totalCount,
      icon: CheckCircle,
      color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30",
    },
  ];

  return (
    <div className="w-full flex flex-col mt-[1%] px-6">
      <h3 className="text-2xl font-bold mb-8 dark:text-white">
        Dashboard Overview
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="relative bg-white dark:bg-gray-800 
                         rounded-xl p-6 shadow-md 
                         hover:shadow-xl hover:-translate-y-2
                         transition-all duration-300 
                         border border-gray-200 dark:border-gray-700"
            >
              {/* Gradient Top Border */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-t-xl"></div>

              {/* Header */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.label}
                </p>

                <div
                  className={`p-3 rounded-full ${item.color} flex items-center justify-center`}
                >
                  <Icon size={20} />
                </div>
              </div>

              {/* Value */}
              <p className="text-3xl font-bold mt-5 text-gray-800 dark:text-white">
                {isLoading ? (
                  "..."
                ) : (
                  <AnimatedCounter
                    value={Number(item.value) || 0}
                    prefix={item.prefix || ""}
                  />
                )}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;