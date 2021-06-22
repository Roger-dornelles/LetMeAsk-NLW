import { useHistory } from 'react-router-dom';


//images
import illustration from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIcon from '../assets/images/google-icon.svg';

// styles
import '../styles/auth.scss';

//components
import {Button} from '../components/Button';

import { useAuth } from '../hooks/useAuth';

export const Home = () =>{
    const { user,signInWithGoogle } =useAuth();
    
    const history = useHistory();
    
    const handleCreateRoom = async ()=>{
        if(!user){
           await signInWithGoogle();
        }

        history.push('/rooms/new');
        
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
                    <button className="create-room" onClick={handleCreateRoom}>
                        <img src={googleIcon} alt="" />
                        Crie sua sala com o google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form>
                        <input type="text" placeholder="digite o código da sala" />
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>

    )
}