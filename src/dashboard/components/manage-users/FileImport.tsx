import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import FileUploadButton from "./FileUploadButton";
import { Buffer } from "Buffer";
import { Workbook } from "exceljs";
import { useState } from "react";
import Papa from "papaparse";

interface UploadFile {
  name: string;
  arrayBuffer(): Promise<ArrayBuffer>;
}

interface UserList {
  fullName: string;
  email: string;
  password: string;
  phone: string;
}

const FileImport = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [userList, setUserList] = useState<UserList[]>([]);
  const [fileName, setFileName] = useState<string>("");

  const handleOnUpload = async (files: UploadFile[]): Promise<void> => {
    try {
      const file = files[0];
      setFileName(file.name);
      const arrBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrBuffer);
      const workbook = new Workbook();

      const fileName = file.name.toLowerCase();
      if (fileName.endsWith(".csv")) {
        const csvText = new TextDecoder("utf-8").decode(buffer);

        const parseResult = Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          delimiter: ",",
          quoteChar: '"',
          escapeChar: '"',
          transformHeader: (header: string) => {
            const normalizedHeader = header.toLowerCase().trim();
            const headerMapping: { [key: string]: string } = {
              fullname: "fullName",
              email: "email",
              phone: "phone",
              password: "password",
            };
            return headerMapping[normalizedHeader] || normalizedHeader;
          },
          transform: (value: string) => {
            return value ? value.toString().trim() : "";
          },
        });

        if (parseResult.errors.length > 0) {
          console.error("CSV parsing errors:", parseResult.errors);
        }

        const csvData = parseResult.data as UserList[];
        const newUsers: UserList[] = [];

        csvData.forEach((row) => {
          if (row.email || row.fullName) {
            newUsers.push({
              fullName: row.fullName || "",
              email: row.email || "",
              phone: row.phone || "",
              password: row.password || "",
            });
          }
        });
        setUserList(newUsers);
      } else {
        await workbook.xlsx.load(buffer);
        const newUsers: UserList[] = [];
        workbook.worksheets.forEach((sheet) => {
          const firstRow = sheet.getRow(1);
          if (!firstRow.cellCount) return;

          const keys = firstRow.values as (string | null)[];
          if (!Array.isArray(keys) || keys.length < 2) return;

          sheet.eachRow((row, rowNumber) => {
            if (rowNumber === 1) return;
            const values = row.values as (string | number | null)[];
            const userObj: Partial<UserList> = {};

            for (let i = 1; i < Math.min(keys.length, values.length); i++) {
              const key = keys[i];
              const value = values[i];
              if (key && value !== null && value !== undefined) {
                userObj[key as keyof UserList] = String(value);
              }
            }

            if (userObj.email || userObj.fullName) {
              newUsers.push(userObj as UserList);
            }
          });
        });
        setUserList(newUsers);
      }
    } catch (error) {
      console.error("Error parsing file:", error);
      setUserList([]);
      setFileName("");
    }
  };

  const handleImport = (onClose: () => void) => {
    setUserList([]);
    setFileName("");
    onClose();
  };

  return (
    <>
      <Button
        onPress={onOpen}
        startContent={<Icon icon={"mdi:cloud-upload-outline"} fontSize={20} />}
        color="primary"
      >
        Import
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hideCloseButton
        onClose={() => {
          setUserList([]);
          setFileName("");
        }}
        size="xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Import User List
              </ModalHeader>
              <ModalBody>
                <FileUploadButton
                  size="lg"
                  accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
                  startContent={
                    <div className="flex min-h-[120px] w-full flex-col items-center gap-3 p-6">
                      <Icon
                        icon="ic:baseline-cloud-upload"
                        className="text-primary text-4xl opacity-70"
                      />
                      <div className="space-y-1 text-center">
                        <p className="text-medium font-semibold text-gray-700 dark:text-gray-300">
                          Click or drag file to this area to upload
                        </p>
                        <p className="text-small text-gray-500 dark:text-gray-400">
                          Support for a single upload. Only accept .csv, .xls,
                          .xlsx
                        </p>
                      </div>
                    </div>
                  }
                  onUpload={handleOnUpload}
                  multiple={false}
                  className="hover:border-primary h-full w-full rounded-lg border-2 border-dashed border-gray-300 transition-colors duration-200 dark:border-gray-600"
                />

                {fileName && (
                  <div className="my-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon
                          icon={
                            fileName.toLowerCase().endsWith(".csv")
                              ? "mdi:file-delimited-outline"
                              : "mdi:file-excel"
                          }
                          className={
                            fileName.toLowerCase().endsWith(".csv")
                              ? "text-blue-600"
                              : "text-green-600"
                          }
                        />
                        <span className="text-sm font-medium">{fileName}</span>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {userList.length} users found
                      </div>
                    </div>
                  </div>
                )}

                <Table aria-label="User list">
                  <TableHeader>
                    <TableColumn>Full Name</TableColumn>
                    <TableColumn>Email</TableColumn>
                    <TableColumn>Phone Number</TableColumn>
                    <TableColumn>Status</TableColumn>
                  </TableHeader>
                  <TableBody
                    items={userList}
                    emptyContent={"No users to display. Please upload a file."}
                  >
                    {(item) => (
                      <TableRow
                        key={item.email || item.fullName || Math.random()}
                      >
                        <TableCell>
                          <span
                            className={!item.fullName ? "text-red-500" : ""}
                          >
                            {item.fullName || "Missing"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={!item.email ? "text-red-500" : ""}>
                            {item.email || "Missing"}
                          </span>
                        </TableCell>
                        <TableCell>{item.phone || "N/A"}</TableCell>
                        <TableCell>
                          <span
                            className={
                              item.fullName && item.email
                                ? "text-green-600"
                                : "text-orange-500"
                            }
                          >
                            {item.fullName && item.email
                              ? "Valid"
                              : "Incomplete"}
                          </span>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={() => handleImport(onClose)}>
                  Import
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default FileImport;
