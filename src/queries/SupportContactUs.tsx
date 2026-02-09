
import { api } from "../services/apiServices";
import { useQuery } from "@tanstack/react-query";
import { convertDataFormateForServer, PayloadText } from "../utils";

const handleSupportContactUs = async (filter?: any) => {
    try {
        const response = await api({
            url: "/admin/newsLatterList",
            method: "GET",
            params: {
                isNewUser: filter?.isNewUser ? PayloadText.UserTag(filter?.isNewUser) : undefined,
                mobileNumber: filter?.mobileNumber || undefined,
                email: filter?.email || undefined,
                reasonType: filter?.reasonType || undefined,
                // fromDate: filter?.fromDate
                //     ? convertDataFormateForServer(filter?.fromDate)
                //     : undefined,
                // toDate: filter?.toDate
                //     ? convertDataFormateForServer(filter?.toDate)
                //     : undefined,
                page: filter?.page ? filter?.page : undefined,
                limit: 10
            },
        });
        if (response?.data?.responseCode === 200) {
            return response?.data;
        } else {
            return null;
        }
    } catch (error: any) {
        return error?.response?.data;
    }
};

export const useSupportContactUs = (filter?: any) => {
    return useQuery({
        queryKey: ["SupportContactUs", filter],
        queryFn: () => handleSupportContactUs(filter),
    });
};