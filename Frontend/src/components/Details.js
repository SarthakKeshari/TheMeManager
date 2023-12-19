import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, Container, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AddMedicine from "./Medicines/AddMedicine";
import UpdateMedicine from "./Medicines/UpdateMedicine";
import "./Medicines/Medicine.css"

function Details(props) {
    const {search} = useLocation();
    const searchParams = React.useMemo(() => new URLSearchParams(search), [search]);
    const filename = searchParams.get("detailOf")

    const [refresh, setRefresh] = useState(true)
    const [tableData, setTableData] = useState([])
    const [updateEntry, setUpdateEntry] = useState("")
    const { isOpen, onOpen, onClose } = useDisclosure()

    let nameInput = React.createRef();
    let mfgInput = React.createRef();
    let expInput = React.createRef();

    const updaeEntry = (e) => {
        onClose()
        // console.log(nameInput.current.value, mfgInput.current.value, expInput.current.value)
        if(nameInput.current.value)
            addCall(nameInput.current.value, mfgInput.current.value, expInput.current.value)
    }

    const alterRefresh = () => {
        setRefresh(!refresh)
    }

    const updateActivate = (e) => {
        onOpen()
        getByNameCall(e)
    }

    const getCall = () => {
        axios.get(`https://the-me-manager-backend.vercel.app/api/medicine`)
        .then(function (response) {
            console.log(response.data)
            setTableData(response.data);
        });
    }

    const getByNameCall = (e) => {
        axios.get(`https://the-me-manager-backend.vercel.app/api/medicine/${e.currentTarget.value}`)
        .then(function (response) {
            console.log(response.data)
            setUpdateEntry(response.data[0]);
        });
    }

    const addCall = (name, mfg, exp) => {
        axios.post(`https://the-me-manager-backend.vercel.app/api/medicine`, {
            name: name,
            mfg: mfg,
            exp: exp
        }).then(function (response) {
            console.log(response.data)
            getCall();
        });
    }

    const updateCall = () => {

    }

    const deleteCall = (e) => {
        axios.delete(`https://the-me-manager-backend.vercel.app/api/medicine/${e.currentTarget.value}`)
        .then(function (response) {
            console.log(response.data)
            getCall();
        });
    }

    useEffect(() => {
        getCall()
    }, [refresh])
    

    return (
    <>
        <Container maxW='container.lg' p={5}>  
            <Heading display="flex" flexDirection={"column"} alignItems="center" mb={2}>Medicines</Heading>     
            <hr/>  
            <Box display="flex" justifyContent="end" mt={8} mb={2}>
                <AddMedicine change={alterRefresh}/>
            </Box>
            <TableContainer border='1px' borderColor='gray.200' borderRadius='10'>
                <Table variant='simple'>
                    <TableCaption>Currently available Medicines</TableCaption>
                    <Thead>
                    <Tr key="header">
                        <Th>Name</Th>
                        <Th isNumeric>Mfg. Date</Th>
                        <Th isNumeric>Exp. Date</Th>
                        <Th isNumeric></Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                        {tableData.map((row,i) => {
                        return (
                                <Tr key={row.name+"::"+i}>
                                    <Td>{row.name}</Td>
                                    <Td isNumeric>{row.mfg}</Td>
                                    <Td isNumeric>{row.exp}</Td>
                                    <Td isNumeric>
                                        <UpdateMedicine value={row.name} change={alterRefresh}/>
                                        <Button colorScheme='red' variant='ghost' value={row.name} onClick={deleteCall}>
                                            <DeleteIcon/>
                                        </Button>
                                    </Td>
                                </Tr>
                            )
                        })}
                        
                    </Tbody>
                </Table>
            </TableContainer>
        </Container>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Update Medicine Detail</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Stack spacing={3}>
                    <Input ref={nameInput} placeholder='Medicine Name' size='md' value={updateEntry?.name} required/>
                    <Input ref={mfgInput} placeholder="Manufacturing Date" size="md" value={updateEntry?.mfg} type="month"/>
                    <Input ref={expInput} placeholder="Expiry Date" size="md" value={updateEntry?.exp} type="month"/>
                </Stack>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
                </Button>
                <Button variant='ghost'>Secondary Action</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    </>
  );
}

export default Details;