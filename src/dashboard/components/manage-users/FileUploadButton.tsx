import { addToast, Button, type ButtonProps } from "@heroui/react";
import { useCallback, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

const isAllFiles = (dt: DataTransfer) =>
  dt.types.every((t) => t === "Files" || t === "application/x-moz-file");

const doesAccept = (type: string, accept?: string) => {
  if (!accept) return true;

  const acceptList = accept.split(",").map((c) => c.trim());

  let cond = false;
  for (const acceptor of acceptList) {
    if (acceptor.endsWith("*")) {
      cond ||= type.startsWith(acceptor.slice(0, -1));
    } else {
      cond ||= type === acceptor;
    }
  }
  return cond;
};

const doesAcceptByExtension = (filename: string, accept?: string) => {
  if (!accept) return true;

  const acceptList = accept.split(",").map((c) => c.trim());
  const fileExt = filename.toLowerCase().substring(filename.lastIndexOf("."));

  return acceptList.some((acceptor) => {
    if (acceptor.startsWith(".") || acceptor.startsWith("*.")) {
      const ext = acceptor.startsWith("*.") ? acceptor.substring(1) : acceptor;
      return fileExt === ext.toLowerCase();
    }
    return false;
  });
};

const hasFiles = (dt: DataTransfer) => {
  return dt.types.includes("Files") && isAllFiles(dt);
};

const validateFiles = (files: File[], accept?: string): File[] => {
  if (!accept) return files;

  return files.filter((file) => {
    const mimeValid = doesAccept(file.type, accept);
    const extValid = doesAcceptByExtension(file.name, accept);
    const isValid = mimeValid || extValid;
    return isValid;
  });
};

export default function FileUploadButton({
  accept,
  onUpload,
  acceptProps = { color: "primary" },
  rejectProps = { color: "danger" },
  multiple = false,
  classNames,
  className,
  ...props
}: ButtonProps & {
  classNames?: { wrapper?: string; button?: string };
  onUpload?: (files: File[]) => void;
  acceptProps?: ButtonProps;
  rejectProps?: ButtonProps;
  accept?: string;
  multiple?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [acceptance, setAcceptance] = useState<null | "ACCEPT" | "REJECT">(
    null,
  );

  const onDragEnter = useCallback(
    (e: React.DragEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (
        hasFiles(e.dataTransfer) &&
        (multiple || !e.dataTransfer.items || e.dataTransfer.items.length <= 1)
      ) {
        setAcceptance("ACCEPT");
      } else {
        setAcceptance("REJECT");
      }
    },
    [multiple],
  );

  const onDragOver = useCallback(
    (e: React.DragEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (
        hasFiles(e.dataTransfer) &&
        (multiple || !e.dataTransfer.items || e.dataTransfer.items.length <= 1)
      ) {
        setAcceptance("ACCEPT");
      } else {
        setAcceptance("REJECT");
      }
    },
    [multiple],
  );

  const onDragFinish = useCallback(() => {
    setAcceptance(null);
  }, [setAcceptance]);

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.persist();
      e.stopPropagation();

      const droppedFiles = Array.from(e.dataTransfer.files);

      const validFiles = validateFiles(droppedFiles, accept);

      if (validFiles.length > 0) {
        onUpload?.(validFiles);
      } else {
        addToast({
          title: "Invalid file format",
          description: `Support for a single upload. Only accept .csv, xls, xlsx`,
          color: "danger",
          timeout: 3000,
        });
      }

      setAcceptance(null);
    },
    [accept, onUpload, setAcceptance],
  );

  const onFileChosen = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(e.target.files || []);

      const validFiles = validateFiles(selectedFiles, accept);

      if (validFiles.length > 0) {
        onUpload?.(validFiles);
      } else {
        addToast({
          title: "Invalid file format",
          description: `Support for a single upload. Only accept .csv, xls, xlsx`,
          color: "danger",
          timeout: 3000,
        });
      }

      e.target.value = "";
    },
    [accept, onUpload],
  );

  const onButtonPress = useCallback(() => {
    inputRef.current?.click();
  }, [inputRef]);

  return (
    <form className={classNames?.wrapper}>
      <label htmlFor="_upload">
        <Button
          {...props}
          {...(acceptance === "ACCEPT"
            ? acceptProps
            : acceptance === "REJECT"
              ? rejectProps
              : {})}
          className={twMerge(
            className,
            classNames?.button,
            acceptance === "ACCEPT" && [
              "border-primary/70",
              "bg-primary/5",
              "shadow-lg",
              "transition-all",
              "duration-300",
              acceptProps?.className,
            ],
            acceptance === "REJECT" && [
              "border-danger",
              "bg-danger/5",
              "scale-[0.98]",
              "shadow-lg",
              "transition-all",
              "duration-300",
              rejectProps?.className,
            ],
            acceptance === null && [
              "hover:border-primary/70",
              "hover:bg-gray-50",
              "dark:hover:bg-gray-800/50",
              "transition-all",
              "duration-200",
              "ease-in-out",
            ],
          )}
          onPress={onButtonPress}
          onDragEnter={onDragEnter}
          onDragOver={onDragOver}
          onDragEnd={onDragFinish}
          onDragLeave={onDragFinish}
          onDrop={onDrop}
        />
      </label>
      <input
        type="file"
        role="presentation"
        name="_upload"
        ref={inputRef}
        onChange={onFileChosen}
        accept={accept}
        multiple={multiple}
        className="hidden"
      />
    </form>
  );
}
