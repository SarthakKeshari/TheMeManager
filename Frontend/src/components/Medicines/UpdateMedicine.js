import { EditIcon } from "@chakra-ui/icons";
import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

function UpdateMedicine(props) {
    const [newMedName, setNewMedName] = useState("")
    const [oldMedName, setOldMedName] = useState("")
    const [mfg, setMfg] = useState("")
    const [exp, setExp] = useState("")
    const { isOpen, onOpen, onClose } = useDisclosure()

    let nameInput = React.createRef();
    let mfgInput = React.createRef();
    let expInput = React.createRef();

    const updateActivate = (e) => {
        onOpen()
        getByNameCall(e)
    }

    const updateEntry = () => {
        onClose()
        updateCall()
    }

    const getByNameCall = (e) => {
        axios.get(`http://localhost:8080/api/medicine/${e.currentTarget.value}`)
        .then(function (response) {
            console.log(response.data)
            setOldMedName(response.data[0].name);
            setNewMedName(response.data[0].name);
            setMfg(response.data[0].mfg);
            setExp(response.data[0].exp);
        });
    }

    const updateCall = () => {
        axios.put(`http://localhost:8080/api/medicine`, {
            oldName: oldMedName,
            newName: newMedName,
            mfg: mfg,
            exp: exp
        }).then(function (response) {
            console.log(response.data)
            props.change()
        });
    }

    return (
    <>
        <Button colorScheme='teal' variant='ghost' value={props.value} onClick={updateActivate}>
            <EditIcon/>
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Update Medicine Detail</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Stack spacing={3}>
                    <Input ref={nameInput} placeholder='Medicine Name' size='md' value={newMedName} onChange={(e) => setNewMedName(e.target.value)}/>
                    <Input ref={mfgInput} placeholder="Manufacturing Date" size="md" value={mfg} onChange={(e) => setMfg(e.target.value)} type="month"/>
                    <Input ref={expInput} placeholder="Expiry Date" size="md" value={exp} onChange={(e) => setExp(e.target.value)} type="month"/>
                </Stack>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={updateEntry}>
                    Update
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    </>
  );
}

export default UpdateMedicine;