//import { useState,FormEvent} from 'react';
import { useHistory, useParams } from 'react-router-dom'

// images
import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg'


//components
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';

//styles
import '../styles/room.scss';

// Hooks
//import {useAuth} from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { useTheme } from '../hooks/useTheme';

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
    const {theme} = useTheme();
    
    //const {user} = useAuth();
    const {questions, title} = useRoom(roomId);

    const handleEndRoom = async()=>{
        database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        });
        history.push('/');
    };

    const handleQuestionDelete = async (questionId:string)=>{
        if(window.confirm('Você deseja excluir esta pergunta?')){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();

        }

    };

    const handleCheckQuestionAaAnswered = async (questionId:string)=>{
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered:true,
        });
    };

    const handleHighLightQuestion = async (questionId:string)=>{
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighLighted:true,
        });
    };

    return (

        <div id="page-room" className={theme}>
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
                                isAnswered={question.isAnswered}
                                isHighLighted={question.isHighLighted}
                            >
                                {!question.isAnswered &&(
                                        <>
                                            <button
                                                type="button"
                                                onClick={()=>handleCheckQuestionAaAnswered(question.id)}
                                            >
                                                <img src={checkImg} alt="Marcar pergunta como respondida" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={()=>handleHighLightQuestion(question.id)}
                                            >
                                                <img src={answerImg} alt="Dar destaque a pergunta" />
                                            </button>
                                        </>
                                    )
                                }
                                <button
                                    type="button"
                                    onClick={()=>handleQuestionDelete(question.id)}
                                >
                                    <img src={deleteImg} alt="Remover pergunta" />
                                </button>
                            </Question>
                        
                        )
                    })}
                </div>

            </main>

        </div>
    )
};