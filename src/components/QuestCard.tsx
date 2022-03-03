import { AspectRatio, Badge, Box, Button, Flex, Heading, Image, ListItem, Spacer, Text, Tooltip, UnorderedList, useToast, WrapItem } from "@chakra-ui/react";
import QuestData from '../data/quests.json';
import { FC } from "react";

const QuestCard:FC<{idx:number , onNewTask:Function}> = ({idx , onNewTask}) => {

    const {tags , image , title , details , experience} = QuestData[idx];
    const toast = useToast();

    const addTask = () => {
        let data = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
        let newData = {
                tags : tags,
                details : details,
                title : title,
                image : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallup.net%2Fwp-content%2Fuploads%2F2016%2F01%2F245438-artwork-fantasy_art-RPG-video_games.jpg&f=1&nofb=1",
                experience : experience,
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
            })
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
        }
    }

    return (
        <WrapItem>
            <Box width={"250px"} height={"375px"} border={"1px"} m={1} p={3} borderRadius={"5px"}>
                {
                    tags.map((element) => {
                        return <Badge colorScheme={"purple"} mr={2}>{element}</Badge>
                    })
                }
                <AspectRatio ratio={16 / 9} mt={3} mb={3}>
                    <Image src={image} borderRadius={"5px"}/>
                </AspectRatio>
                <Heading size={"md"} fontFamily={"Kanit"}>{title}</Heading>
                <Box p={2}bg={"rgb(235,235,235)"} color={"rgb(45,45,45)"} mt={2} mb={2} borderRadius={"5px"}>
                <UnorderedList>
                    {details.map((element) => {
                        return <ListItem>{element}</ListItem>
                    })}
                </UnorderedList>
                </Box>
                <Flex direction={"row"}>
                    <Text bg={""} color={"rgb(235,235,235)"} fontSize={"sm"} fontFamily={"Kanit"} mt={1}>⭐ {experience} EXP</Text>
                    <Spacer/>
                    <Tooltip label={"ค่าประสบการณ์ "+experience+" EXP"}>
                        <Button colorScheme={"red"}  size={"xs"} mt={0.5} onClick={addTask}>
                            Accept
                        </Button>
                    </Tooltip>
                </Flex>
            </Box>
        </WrapItem>
    );
}

export default QuestCard;