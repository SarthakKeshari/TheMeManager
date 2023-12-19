import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import React from "react";

function AddMedicine({change}) {
    let nameInput = React.createRef();
    let mfgInput = React.createRef();
    let expInput = React.createRef();

    const { isOpen, onOpen, onClose } = useDisclosure()

    const addEntry = (e) => {
        onClose()
        // console.log(nameInput.current.value, mfgInput.current.value, expInput.current.value)
        if(nameInput.current.value)
            addCall(nameInput.current.value, mfgInput.current.value, expInput.current.value)
    }

    const addCall = (name, mfg, exp) => {
        axios.post(`http://localhost:8080/api/medicine`, {
            name: name,
            mfg: mfg,
            exp: exp
        }).then(function (response) {
            console.log(response.data)
            change()
        });
    }  

    return (
    <>
        <Box>
            <Button onClick={onOpen}><AddIcon/>&nbsp; Add Medicine</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing={3}>
                        <Input ref={nameInput} placeholder='Medicine Name' size='md'/>
                        <Input ref={mfgInput} placeholder="Manufacturing Date" size="md" type="month"/>
                        <Input ref={expInput} placeholder="Expiry Date" size="md" type="month"/>
                    </Stack>
                </ModalBody>
                <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={addEntry}>
                    Add
                </Button>
                </ModalFooter>
            </ModalContent>
            </Modal>
        </Box>
    </>
  );
}

export default AddMedicine;