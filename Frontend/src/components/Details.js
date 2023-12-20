import { DeleteIcon } from "@chakra-ui/icons";
import { Button, Container, Grid, GridItem, Heading, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AddMedicine from "./Medicines/AddMedicine";
import UpdateMedicine from "./Medicines/UpdateMedicine";
import "./Medicines/Medicine.css"
import SearchBar from "./SearchBar";

function Details(props) {
    const {search} = useLocation();
    const searchParams = React.useMemo(() => new URLSearchParams(search), [search]);
    const filename = searchParams.get("detailOf")

    const [refresh, setRefresh] = useState(true)
    const [resetSearch, setResetSearch] = useState(false)
    const [tableData, setTableData] = useState([])
    const [originalTableData, setOriginalTableData] = useState([])
    const [searchValue, setSearchValue] = useState()

    const alterRefresh = () => {
        setRefresh(!refresh)
    }

    const getCall = () => {
        axios.get(`https://the-me-manager-backend.vercel.app/api/medicine`)
        .then(function (response) {
            console.log(response.data)
            setTableData(response.data);
            setOriginalTableData(response.data)
        });
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
        setResetSearch(true)
    }, [refresh])

    useEffect(() => {
        const result = originalTableData.filter(
            (e) => {
                const boolArray = Object.entries(e).map(([k,v]) => {
                    if (k!="_id" && v?.includes(searchValue)) {
                        return true;
                    }
                })

                if(boolArray.includes(true)){
                    return true;
                }
                return false;
            }          
        );
        setTableData(result)
    },[searchValue])
    

    return (
    <>
        <Container maxW='container.lg' p={5}>  
            <Heading display="flex" flexDirection={"column"} alignItems="center" mb={2}>Medicines</Heading>     
            <hr/> 
            <Grid templateColumns='repeat(5, 1fr)' gap={4} mt={4} mb={2}>
                <GridItem colSpan={4}>
                    <SearchBar incomingSearchValue={setSearchValue} resetSearchTrigger={setResetSearch} resetSearch={resetSearch}/>
                </GridItem>
                <GridItem>
                    <AddMedicine change={alterRefresh}/>
                </GridItem>
            </Grid> 
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
                        {tableData.length?
                        tableData.map((row,i) => {
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
                        }):
                        <Tr><Td colSpan={4}><Heading color='gray.300' w="100%" as='h6'  size='lg' textAlign="center">No results found</Heading></Td></Tr>
                        }
                        
                    </Tbody>
                </Table>
            </TableContainer>
        </Container>
    </>
  );
}

export default Details;