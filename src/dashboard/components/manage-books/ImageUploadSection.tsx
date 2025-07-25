import ImagePreviewGallery from "@/components/ImagePreviewGallery";
import FileUploadButton from "../FileUploadButton";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

interface ImageUploadSectionProps {
  previewImageList: string[];
  currPreview: string | null;
  setCurrPreview: (img: string | null) => void;
  handleOnUploadThumbnail: (files: File[]) => void;
  handleOnUploadSlider: (files: File[]) => void;
  handleDeletePreview: (img: string) => void;
}

const ImageUploadSection = ({
  previewImageList,
  currPreview,
  setCurrPreview,
  handleOnUploadThumbnail,
  handleOnUploadSlider,
  handleDeletePreview,
}: ImageUploadSectionProps) => {
  const uploadConfigs = [
    {
      name: "thumbnail",
      label: "Upload thumbnail",
      onUpload: handleOnUploadThumbnail,
      multiple: false,
    },
    {
      name: "delete",
      label: "Delete",
    },
    {
      name: "slider",
      label: "Upload slider",
      onUpload: handleOnUploadSlider,
      multiple: true,
    },
  ];
  return (
    <div className="flex w-full flex-col gap-2 overflow-hidden">
      <ImagePreviewGallery
        images={previewImageList.filter(
          (img): img is string => typeof img === "string",
        )}
        currPreview={currPreview}
        setCurrPreview={setCurrPreview}
      />
      <div
        className={`grid w-full grid-cols-1 gap-4 ${previewImageList[0] !== undefined || previewImageList.length > 1 ? "md:grid-cols-3" : "md:grid-cols-2"}`}
      >
        {uploadConfigs.map((cfg) => {
          if (cfg.name === "delete") {
            return previewImageList[0] !== undefined ||
              previewImageList.length > 1 ? (
              <div key={cfg.label} className="flex flex-col items-center gap-2">
                <label className="text-xs font-medium text-gray-600 dark:text-gray-300">
                  {cfg.label}
                </label>
                <Button
                  variant="flat"
                  size="sm"
                  className="max-w-fit rounded-lg border-2 border-dashed border-gray-300 transition-colors duration-200 hover:border-red-400 dark:border-gray-600"
                  onPress={() => {
                    if (currPreview) handleDeletePreview(currPreview);
                  }}
                >
                  <Icon
                    icon="pixel:trash-solid"
                    className="text-2xl text-red-400 opacity-70"
                  />
                </Button>
              </div>
            ) : null;
          } else {
            return (
              <div key={cfg.label} className="flex flex-col items-center gap-2">
                <label className="text-xs font-medium text-gray-600 dark:text-gray-300">
                  {cfg.label}
                </label>
                <FileUploadButton
                  size="sm"
                  accept="image/png,image/jpeg"
                  startContent={
                    <Icon
                      icon="ic:baseline-cloud-upload"
                      className="text-primary text-2xl opacity-70"
                    />
                  }
                  onUpload={cfg.onUpload}
                  multiple={cfg.multiple}
                  className="hover:border-primary w-full rounded-lg border-2 border-dashed border-gray-300 transition-colors duration-200 dark:border-gray-600"
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default ImageUploadSection;
