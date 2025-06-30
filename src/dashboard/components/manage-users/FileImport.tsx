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

const FileImport = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
                  accept=".csv,.xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
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
                  onUpload={(files) => {
                    console.log(files[0]);
                  }}
                  multiple={false}
                  className="hover:border-primary h-full w-full rounded-lg border-2 border-dashed border-gray-300 transition-colors duration-200 dark:border-gray-600"
                />

                <Table aria-label="User list">
                  <TableHeader>
                    <TableColumn>Full Name</TableColumn>
                    <TableColumn>Email</TableColumn>
                    <TableColumn>Phone Number</TableColumn>
                  </TableHeader>
                  <TableBody emptyContent={"No rows to display."}>
                    {/* <TableRow>
                      <TableCell>test</TableCell>
                      <TableCell>testttttttttt@gmail.com</TableCell>
                      <TableCell>test</TableCell>
                    </TableRow> */}
                  </TableBody>
                </Table>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
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
