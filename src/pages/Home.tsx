import { useHistory } from 'react-router-dom';
import { FormEvent,useState } from 'react';


//images
import illustration from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIcon from '../assets/images/google-icon.svg';

// styles
import '../styles/auth.scss';

//components
import {Button} from '../components/Button';

//contextApi
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';


import { database } from '../services/firebase';

export const Home = () =>{
    const { user,signInWithGoogle } =useAuth();
    const {theme,toggleTheme} = useTheme();

    
    const history = useHistory();
    
    const [ roomCode, setRoomCode ] = useState('');
    
    const handleCreateRoom = async ()=>{
        if(!user){
           await signInWithGoogle();
        }
        history.push('/rooms/new');
        
    }

    const handleJoinRoom = async (event:FormEvent)=>{

        event.preventDefault();
        if(roomCode.trim() === ''){
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if(!roomRef.exists()){
            alert('Room does not exists');
            return;
        };

        if(roomRef.val().endedAt){
            alert('Room already closed.');
            return;
        }

        history.push(`/rooms/${roomCode}`);


    }

    
    


    return(
        <div id="page-auth" className={theme}>
            <aside>
                <img src={illustration} alt="Imagem simbolizando perguntas e respostas" />
                <strong>Toda pergunta tem uma resposta</strong>
                <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
            </aside>

            <main>
               <span>Alterar tema: </span> 
               <button className="btn"onClick={toggleTheme}>{theme}</button>

                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <button className="create-room" onClick={handleCreateRoom}>
                        <img src={googleIcon} alt="" />
                        Crie sua sala com o google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input type="text" placeholder="digite o código da sala" 
                            value={roomCode} 
                            onChange={event =>setRoomCode(event.target.value)} 
                        />
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>

    )
}