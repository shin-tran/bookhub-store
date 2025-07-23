import type { ApiResult } from "@/types/api";
import instance from "@services/axiosCustomize";
import { useMutation } from "@tanstack/react-query";

export type UploadFileParams = {
  file: File;
  folder: string;
};

const handleUploadFile = async ({
  file,
  folder,
}: UploadFileParams): Promise<ApiResult<{ fileUploaded: string }>> => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "upload-type": folder,
    },
  };
  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", file);
  const response = await instance.post(
    "/api/v1/file/upload",
    bodyFormData,
    config,
  );
  return response.data;
};

export function useUploadFile() {
  return useMutation({
    mutationFn: (params: UploadFileParams) => handleUploadFile(params),
  });
}
