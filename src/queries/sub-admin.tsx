import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/apiServices";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

type UpdateSubadminPayload = {
  id: string;
  permissions: any;
};

export const useGetSubAdminList = () => {
  return useQuery<any>({
    queryKey: ["Subasminlist"],
    queryFn: handlegetSubadminlist,
    select(data) {
      if (data?.data?.responseCode === 200) {
        return data.data.result;
      } else {
        return [];
      }
    },
  });
};

const handlegetSubadminlist = async () => {
  try {
    const response = await api({
      url: "/subadmin/getSubAdminList",
      method: "GET",
    });
    return response;
  } catch (error: any) {
    // toast.error(error?.response?.data?.responseMessage);
    return error.response?.data;
  }
};

/**************************************Add sub admin  ******************************/

export const useAddsubadmin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: any) => handleAdddata(data),
    onSuccess: (data) => {
      if (data.responseCode === 200) navigate("/sub-admin");
    },
  });
};

export const handleAdddata = async (data: any) => {
  try {
    const response = await api({
      url: "/subadmin/addSubAdmin",
      method: "POST",
      data,
    });
    if (response?.data?.responseCode === 200) {
      toast.success(response?.data.responseMessage);
      return response.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.responseMessage);
    return error.response?.data;
  }
};

/******************************************** delete subadmin  **************************/
export const useDeletesubadmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) => handledeletesubadmin(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Subasminlist"] });
    },
  });
};

export const handledeletesubadmin = async (id: number | string) => {
  try {
    const response = await api({
      url: "/subadmin/deleteSubAdmin",
      method: "DELETE",
      data: { subAdminId: Number(id) },
    });
    if (response?.data?.responseCode === 200) {
      toast.success(response?.data?.responseMessage);
    }
  } catch (error: any) {
    // toast.error(error?.response?.data?.responseMessage);
  }
};

/**************************************************View subadmin ************************/

export const handleViewSubadmin = async (id: string | undefined) => {
  try {
    const response = await api({
      url: "/subadmin/viewSubAdmin",
      method: "GET",
      params: {
        id: id,
      },
    });
    if (response?.data?.responseCode === 200) {
      // toast.success(response?.data?.responseMessage);
      return response;
    }
  } catch (error: any) {
    // toast.error(error?.response?.data?.responseMessage);
    return error;
  }
};

export const useViewSubadmin = (id: string | undefined) => {
  return useQuery({
    queryKey: ["subadmin", id],
    queryFn: () => handleViewSubadmin(id),
    enabled: !!id,
    select(data) {
      if (data?.data?.responseCode == 200) {
        return data?.data?.result;
      }
      return {};
    },
  });
};

/************************************* update subadmin ******************/

export const handleUpdateSubadmin = async (data: UpdateSubadminPayload) => {
  try {
    const response = await api({
      url: "/subadmin/updateSubadmin",
      method: "PUT",
      data: data,
    });
    if (response?.data?.responseCode === 200) {
      toast.success(response?.data?.responseMessage);
      return response;
    }
  } catch (error: any) {
    // toast.error(error?.response?.data?.responseMessage);
    return error;
  }
};

export const useUpdateSubadmin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: UpdateSubadminPayload) => handleUpdateSubadmin(data),
    onSuccess: (data) => {
      if (data?.data?.responseCode === 200) navigate("/sub-admin");
    },
  });
};
