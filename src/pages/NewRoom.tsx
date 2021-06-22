import { Link  } from 'react-router-dom';


//images
import illustration from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
//import googleIcon from '../assets/images/google-icon.svg';

// styles
import '../styles/auth.scss';
import {Button} from '../components/Button';



export function NewRoom(){


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
                    
                    <form>
                        <input type="text" placeholder="Nome da sala" />
                        <Button type="submit">Criar sala</Button>
                    </form>
                    <p>Quer entrar em uma sala já existente? <Link to="/">Clique Aqui</Link></p>
                </div>
            </main>
        </div>

    )
}