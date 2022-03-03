import { Button, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react';
import { FC , useState } from 'react';

const NewTask:FC<{onNewTask:any}> = ({onNewTask}) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [title , setTitle] = useState("");
    const [tags , setTags] = useState("");
    const [details , setDetails] = useState("");
    const [exp , setEXP] = useState("");
    const toast = useToast();

    const addTask = () => {
        let data = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
        let newData = {
                tags : JSON.parse(`["`+tags.replaceAll(`,`,`","`)+`"]`),
                details : JSON.parse(`["`+details.replaceAll(`,`,`","`)+`"]`),
                title : title,
                image : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallup.net%2Fwp-content%2Fuploads%2F2016%2F01%2F245438-artwork-fantasy_art-RPG-video_games.jpg&f=1&nofb=1",
                experience : parseInt(exp),
        }

        let entire = data.filter(element => {
            return JSON.stringify(element)===JSON.stringify(newData);
        })

        if(entire.length){
            toast({
                title: "แจ้งเตือน",
                description: "ไม่สามรถเพิ่มข้อมูลที่เหมือนกันได้",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            onClose();
        }else{
            data.push(newData);
            localStorage.setItem('tasks',JSON.stringify(data));
            toast({
                title: "แจ้งเตือน",
                description: "เพิ่มข้อมูลสำเร็จ",
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            onNewTask();
            onClose();
        }
    }

    const updateTitle = (e) => {setTitle(e.target.value);}
    const updateTags = (e) => {setTags(e.target.value);}
    const updateDetails = (e) => {setDetails(e.target.value);}
    const updateEXP = (e) => {setEXP(e.target.value);}

    return (
        <>
            <Button colorScheme={"green"} ml={3} onClick={onOpen}>
                New
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        เพิ่มรายการ
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormLabel>Title</FormLabel>
                        <Input type={"text"} onChange={updateTitle}/>
                        <FormLabel>Tags</FormLabel>
                        <Input type={"text"} onChange={updateTags}/>
                        <FormLabel>Details</FormLabel>
                        <Input type={"text"} onChange={updateDetails}/>
                        <FormLabel>EXP</FormLabel>
                        <Input type={"text"} onChange={updateEXP}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme={"green"} onClick={addTask}>
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default NewTask;