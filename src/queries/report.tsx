import toast from "react-hot-toast";
import { api } from "../services/apiServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { convertDataFormateForServer, PayloadText } from "../utils";

export const fetchReportList = async ( filter: FilterType) => {
    try {
      const response = await api({
        url: `/admin/reportList`,
        method: "GET",
        params: {
        
       
          search: filter?.search || undefined,
          withdrawStatus:
            filter?.filter === "Pending"
              ? "PENDING"
              : filter?.filter === "Verified"
                ? "VERIFIED" 
                : filter?.filter === "Rejected"
                ? "REJECTED" 
                :  filter?.filter,
          // ReportStatus: filter?.filter || undefined,
          fromDate: filter?.fromDate
            ? convertDataFormateForServer(filter?.fromDate)
            : undefined,
          toDate: filter?.toDate
            ? convertDataFormateForServer(filter?.toDate)
            : undefined,
          limit: 10,
          page: filter?.page || 1,
        },
      });
      return response;
    } catch (error: any) {
      console.error("API error:", error);
      return error?.response;
    }
  };
  export const useReportList = ( filter: FilterType) => {
    return useQuery({
      queryKey: ["ReportList", filter],
      queryFn: () => fetchReportList( filter),
      select(data) {
        if (data?.data?.responseCode === 200) {
          return data?.data?.result;
        } else {
          return null;
        }
      },
     
    });
  };
  
  