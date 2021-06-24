//import { useState,FormEvent} from 'react';
import { useHistory, useParams } from 'react-router-dom'

// images
import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';


//components
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';

//styles
import '../styles/room.scss';

// Hooks
//import {useAuth} from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

//services
//import { database } from '../services/firebase';

type RoomParams = {
    id:string;
}

export const AdminRoom = ()=>{
    const history = useHistory();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    
    //const {user} = useAuth();
    const {questions, title} = useRoom(roomId);

    const handleEndRoom = async()=>{
        database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        });
        history.push('/');
    }

    const handleQuestionDelete = async (questionId:string)=>{
        if(window.confirm('Você deseja excluir esta pergunta?')){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();

        }

    }

    return (

        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="letmeask" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button 
                        isOutlined
                        onClick={handleEndRoom}
                        >
                            Encerrar sala
                        </Button>

                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length}</span>} 
                </div>

                <div className="question-list">

                    {questions.map(question =>{
                        return(
                            <Question 
                                key={question.id}
                                content={question.content}
                                author={question.author}
                            >
                                <button
                                    type="button"
                                    onClick={()=>handleQuestionDelete(question.id)}
                                >
                                    <img src={deleteImg} alt="remover pergunta" />
                                </button>
                            </Question>
                        
                        )
                    })}
                </div>

            </main>

        </div>
    )
};