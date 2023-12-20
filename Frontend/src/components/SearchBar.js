import { Search2Icon } from "@chakra-ui/icons";
import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

function SearchBar(props) {
    const [searchValue, setSearchValue] = useState("")

    useEffect(() => {
        props.incomingSearchValue(searchValue); 
    },[searchValue])

    useEffect(() => {
        if (props.resetSearch) {
          setSearchValue("");
          props.resetSearchTrigger(false)
        }
    }, [props.resetSearch]);

    return (
    <>
        <Box>
            <InputGroup>
                <InputLeftElement pointerEvents='none'>
                    <Search2Icon color='gray.300' />
                </InputLeftElement>
                <Input type='text' placeholder='Search...' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
            </InputGroup>
        </Box>
    </>
  );
}

export default SearchBar;