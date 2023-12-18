import { Card, CardBody, Image} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function MenuCard(props) {
  return (
    <Link to={`/details?detailOf=`+props.filename}>
        <Card maxW='sm'>
            <CardBody>
                <Image
                src={props.img}
                alt=''
                borderRadius='lg'
                />
            </CardBody>        
        </Card>
    </Link>
  );
}

export default MenuCard;
