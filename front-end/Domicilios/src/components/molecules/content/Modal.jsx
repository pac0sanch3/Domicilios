import { V } from "../../../style"; 
import {
  Modal,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
} from "@nextui-org/react";

// eslint-disable-next-line react/prop-types
export const ModalComponte = ({ buttonModal, tittleModal, componente, size, variantButton, colorButton="primary" }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button color={colorButton}  variant={variantButton} onPress={onOpen} className={`${V.radius}`}>
        {buttonModal}
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size={size}
        backdrop="opaque"
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {tittleModal}
              </ModalHeader>
              <ModalBody>{componente}</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>{" "}
    </>
  );
};


