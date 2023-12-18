import { Box, Image, Link, SimpleGrid } from "@chakra-ui/react";
import MenuCard from "./MenuCard";

function Home() {
  return (
    <>
        <Box boxShadow='md'>
            <Image
            src='/images/titleBar.png'
            alt='Title Bar Image'
            borderRadius='lg'
            />
        </Box>
        <Box px={5} pt={10}>
            <SimpleGrid minChildWidth='320px' spacing='40px'>
                <MenuCard img='/images/medicine.png' filename='Medicines'/>
                <MenuCard img='/images/books.png' filename='Books'/>
                <MenuCard img='/images/wardrobe.png' filename='Wardrobe'/>
                <MenuCard img='/images/finance.png' filename='Finance'/>
            </SimpleGrid>                

        </Box>
    </>
  );
}

export default Home;
