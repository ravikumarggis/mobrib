import { useGetDashboardCount } from "../../queries/dashboard";

const Dashboard = () => {


     const { data } = useGetDashboardCount();

     console.log(data,"datadata");
     
    const stats = [
      { label: "Total Users", value: data?.totalUserCount },
      { label: "Total Task", value: data?.totalTaskerCount },
      { label: "Total Hirer", value: data?.totalHirerCount },
      { label: "Total Ticket", value: data?.openTicketCount },
      { label: "Active Task", value: data?.activeTaskCount },
    ];
  
    return (
      <div className="w-full flex flex-col  mt-[5%]">
        
        {/* DASHBOARD CARDS */}
        {/* <div className="mb-8 border p-5 rounded border-gray-300 dark:border-gray-700"> */}
          <h3 className="text-lg font-semibold mb-6 dark:text-white">
            Dashboard Overview
          </h3>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {stats.map((item, index) => (
              <div
                key={index}
                className="border rounded p-4 border-gray-200 dark:border-gray-600 
                           hover:shadow-md transition duration-300"
              >
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.label}
                </p>
                <p className="text-2xl font-semibold mt-2 dark:text-white">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        {/* </div> */}
      </div>
    );
  };
  
  export default Dashboard;