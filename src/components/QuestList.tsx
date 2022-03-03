import { Center, Wrap} from '@chakra-ui/react';
import { FC } from 'react';
import QuestCard from './QuestCard';

const QuestList:FC<{updateStorage:Function}> = ({updateStorage}) => {
    return (
        <Center mt={5} >
            <Wrap>
                <QuestCard idx={0} onNewTask={updateStorage}/>
                <QuestCard idx={1} onNewTask={updateStorage}/>
                <QuestCard idx={2} onNewTask={updateStorage}/>
            </Wrap>
        </Center>
    );
}

export default QuestList;