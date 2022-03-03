import { CheckCircleIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { AspectRatio, Badge, useToast, Image, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent , ModalHeader, ModalOverlay, Td, Tooltip, Tr, UnorderedList, useDisclosure } from "@chakra-ui/react";
import { FC } from "react";
import task from "../interfaces/task.interface";

const TodoTask:FC<{props:task , onTaskChange:Function}> = ({props , onTaskChange}) => {

    const {title , details , experience , image , tags} = props;
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast();

    const levelUp = () => {
        let curr_level = localStorage.getItem('player_level') ? parseInt(localStorage.getItem('player_level')) : 1;
        let exp = localStorage.getItem('player_exp') ? parseInt(localStorage.getItem('player_exp')) : 0;
        while(exp >= Math.floor(100*Math.pow(1.25,curr_level))){
            exp -= Math.floor(100*Math.pow(1.25,curr_level));
            curr_level += 1;
        }
        localStorage.setItem('player_level' , (curr_level)+'');
        localStorage.setItem('player_exp' , (exp)+'');
    }

    const doneAction = () => {
        let data = JSON.parse(localStorage.getItem('tasks'));

        let preExp = localStorage.getItem('player_exp') ? parseInt(localStorage.getItem('player_exp')) : 0;
        localStorage.setItem('player_exp',(preExp+experience)+'');
        levelUp();

        data = data.filter(element => {
            return element["title"] !== title && element["details"] !== details && element["tags"] !== tags
        });
        localStorage.setItem('tasks',JSON.stringify(data));
        toast({
            title: "แจ้งเตือน",
            description: "ทำงานเสร็จแล้ว !!",
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
        onTaskChange();
    }

    return (
        <Tr>
            <Td>
                {title}
                <Tooltip label={"คำอธิบายเพิ่มเติม"}>
                    <InfoOutlineIcon ml={3} onClick={onOpen} color={"blue.500"} />
                </Tooltip>
            </Td>
            <Td>
                {tags.map(element => {
                    return (
                        <Badge colorScheme={"orange"} mr={1}>{element}</Badge>
                    )
                })}
            </Td>
            <Td>{experience}</Td>
            <Td>
                <Tooltip label={"เสร็จสิ้น"}>
                    <CheckCircleIcon onClick={doneAction} color={"green.500"} />
                </Tooltip>
            </Td>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        รายละเอียด
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <AspectRatio ratio={16/9}>
                            <Image src={image} borderRadius={"5px"}/>
                        </AspectRatio>
                        <UnorderedList mt={5}>
                        {details.map((element) => {
                            return <ListItem>{element}</ListItem>
                        })}
                        </UnorderedList>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Tr>
    );
};

export default TodoTask;
