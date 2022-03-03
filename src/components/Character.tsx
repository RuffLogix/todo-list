
import { Avatar, Flex, Heading } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react"

const Character:FC = () => {

    const [level , setLevel] = useState(1);
    const [exp , setExp] = useState(0);

    useEffect(()=>{
        if(localStorage.getItem('player_level')){
            setLevel(parseInt(localStorage.getItem('player_level')));
        }
        if(localStorage.getItem('player_exp')){
            setExp(parseInt(localStorage.getItem('player_exp')));
        }
    });

    return (
        <Flex>
            <Flex direction={"column"} mr={3}>
                <Heading size={"sm"}>Lv.{level}</Heading>
                <Heading size={"sm"}>{exp}/{Math.floor(100*Math.pow(1.25,level))}</Heading>
            </Flex>
            <Avatar size={"md"}/>
        </Flex>
    )
}

export default Character;