import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

function DeleteMedicine(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const deleteCall = (e) => {
        try {
            axios.delete(`https://the-me-manager-backend.vercel.app/api/medicine/${e.currentTarget.value}`)
            .then(function (response) {
                // console.log(response.data)
                if(response.status == 200) {
                    props.change()
                    props.setAlertDetails({
                        isVisible: true,
                        alertTitle: "Success!",
                        alertStatus: "success",
                        alertDescription: response.data
                    })
                }
                else if(response.status == 201) {
                    props.setAlertDetails({
                        isVisible: true,
                        alertTitle: "Warning!",
                        alertStatus: "warning",
                        alertDescription: response.data
                    })
                }
                else {
                    props.setAlertDetails({
                        isVisible: true,
                        alertTitle: "Error!",
                        alertStatus: "error",
                        alertDescription: response.data
                    })
                }
            });
        }
        catch(e) {
            props.setAlertDetails({
                isVisible: true,
                alertTitle: "Error!",
                alertStatus: "error",
                alertDescription: "Oops! Something went wrong. Its not you its us."
            })
        }
    }

    return (
    <>
        <Button colorScheme='red' variant='ghost' onClick={onOpen}>
            <DeleteIcon/>
        </Button>

        <Modal isOpen={isOpen} onClose={onClose} size={'lg'} isCentered>
            <ModalOverlay />
            <ModalContent>
            <ModalBody display={'flex'} justifyContent={'space-around'}>
                <Heading size={'sm'} display={'flex'} alignItems={'center'}>Are sure you want to delete?</Heading>
                <Box>
                    <Button colorScheme='red' mr={3}  value={props.value} onClick={deleteCall} size='md' variant={'outline'}>
                        Delete
                    </Button>
                    <Button colorScheme='teal' mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                </Box>
            </ModalBody>
            </ModalContent>
        </Modal>
    </>
  );
}

export default DeleteMedicine;