import { FC, useEffect, useState } from 'react';
import { AspectRatio, Box, Container, Flex, Heading, Spacer, Table, Tbody, Text, Th, Thead, Tooltip, Tr } from '@chakra-ui/react';
import TodoTask from './components/TodoTask';
import QuestList from './components/QuestList';
import task from './interfaces/task.interface';
import NewTask from './components/NewTask';
import Character from './components/Character';

const App:FC = () => {

  const [data , setData] = useState([]);

  useEffect(() => {
    if(localStorage.getItem('tasks') && data!==JSON.parse(localStorage.getItem('tasks'))){
      setData(JSON.parse(localStorage.getItem('tasks')));
    }
  },[]); 

  const updateData = () =>{
    setData(JSON.parse(localStorage.getItem('tasks')));
  }

  return (
    <div className="App">
      <Box bg={"rgb(32,32,35)"} color={"rgb(235,235,235)"}>

      <Container maxWidth={"container.xl"} p={5} bg={"rgb(32,32,35)"}>
        <Flex>
          <Heading size={"md"} fontFamily={"Kanit"}>
            <Tooltip label={"Todo list สำหรับผู้ที่ต้องการความ Productive และ อยากเพลิดเพลินกับโลกของ RPG (??)"}>
            🔥 RPG TODO-List
            </Tooltip>
          </Heading>
          <Spacer/>
          <Character/>
        </Flex>
      </Container>

      <Container maxW={"container.lg"}>
        <Flex direction={"column"}>

          <Box className={"daily-quests"} mt={3} mb={3}>
            <Flex>
              <Heading size={"lg"} fontFamily={"Kanit"}>📖 Daily Quests : เควสรายวัน</Heading>
            </Flex>
            <QuestList updateStorage={updateData}/>
          </Box>

          <Box className={"todo-list"} mt={3} mb={3}>
            <Flex>
              <Heading size={"lg"} fontFamily={"Kanit"}>
                  🧾 Todo Lists
              </Heading>
              <NewTask onNewTask={updateData}/>
            </Flex>
            <Table mt={5}>
              <Thead bg={"rgb(45,45,45)"}>
                <Tr>
                  <Th color={"rgb(235,235,235)"}>Title</Th>
                  <Th color={"rgb(235,235,235)"}>Tags</Th>
                  <Th color={"rgb(235,235,235)"}>Exp</Th>
                  <Th color={"rgb(235,235,235)"}>Done</Th>
                </Tr>
              </Thead>
              <Tbody bg={"rgb(235,235,235)"} color={"rgb(32,32,35)"}>
                {
                  data.map(element => {
                    let props_value:task = {
                      details:element['details'],
                      experience:element['experience'],
                      image:element['image'],
                      tags:element['tags'],
                      title:element['title']
                    }
                    
                    return (
                      <TodoTask props={props_value} onTaskChange={updateData}/>
                    )
                  })
                }
              </Tbody>
            </Table>
          </Box>
          
        </Flex>

        <div className={"footer"}>
          <AspectRatio ratio={19/1}>
            <Text color={"gray.600"}>made by RuffLogix</Text>
          </AspectRatio>
        </div>
      </Container>    
      </Box>
    </div>
  );
}

export default App;