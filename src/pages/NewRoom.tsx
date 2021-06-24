import { Link, useHistory } from 'react-router-dom';
import { FormEvent,useState } from 'react';

import { database } from '../services/firebase';

import { useAuth } from '../hooks/useAuth';


//images
import illustration from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
//import googleIcon from '../assets/images/google-icon.svg';

// styles
import '../styles/auth.scss';
import {Button} from '../components/Button';



export function NewRoom(){
    const history = useHistory();
    const { user } = useAuth();
    const [newRoom, setNewRoom] = useState('');

    const handleCreateRoom = async (event: FormEvent) => {
        event.preventDefault();
        
        if(newRoom.trim() === ''){

            return;
        };

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title:newRoom,
            authorId: user?.id
        })

        history.push(`/rooms/${firebaseRoom.key}`)
    }


    return(
        <div id="page-auth">
            <aside>
                <img src={illustration} alt="Imagem simbolizando perguntas e respostas" />
                <strong>Toda pergunta tem uma resposta</strong>
                <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
            </aside>

            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                   <h2>Criar uma nova sala</h2>
                    
                    <form onSubmit={handleCreateRoom}>
                        <input type="text" placeholder="Nome da sala" value={newRoom} onChange={event => setNewRoom(event.target.value)} />
                        <Button type="submit">Criar sala</Button>
                    </form>
                    <p>Quer entrar em uma sala já existente? <Link to="/">Clique Aqui</Link></p>
                </div>
            </main>
        </div>

    )
}