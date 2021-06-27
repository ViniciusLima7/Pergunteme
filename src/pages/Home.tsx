//import Firebase
import { database } from '../services/firebase';
//import Routers e toaster
import { useHistory } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

// import Images
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

//import scss 
import '../styles/auth.scss';

//Import Components
import { Button } from '../components/Button';

//Import Hooks
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { FormEvent, useState } from 'react';

export function Home() {

  const history = useHistory();
  const {theme,toggleTheme} = useTheme();

  //Estados
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  //Funções

  // Navegar para Criar Sala
  async function handleCreateRoom() {

    //Se não existir user 
    if (!user) {
      //Chamar função de Login com Google
      //se await for true continua o código
      await signInWithGoogle();
    }
    // Enviar para history o caminho da Nova Página
    history.push('/Room/New');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    //trim verifica os espaços
    if (roomCode.trim() === '') {
      toast.error("Primeiro,  digite o código da Sala");
      return;
      
    }

    //buscar todos os dados dessa sala .get()
    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    //Se Sala não existir
    if(!roomRef.exists()){
      toast.error("Sala Não Existe");
      return ;
    }
      //Se a Sala está fechada
    if(roomRef.val().endedAt){
      toast.error("Sala Fechada");
      return;
    }

    //Se você for o admin entrar na tela de admin
    if(roomRef.val().authorId === user?.id){
      history.push(`Room/admin/${roomCode}`);
 
    } else{
      history.push(`Room/${roomCode}`);
    }
  }

  return (

    <div id="page-auth" className={theme}>

      <aside>


        <img src={illustrationImg} alt="Ilustração"></img>
        <strong>Crie salas  de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>

      </aside>

      <main>
        
        <div className="main-content">
        
        <button 
        onClick={toggleTheme}
        className="alter-theme"
        >
          Mudar Tema
        </button>
          <img src={logoImg} alt="Logo"></img>
          <button
            onClick={handleCreateRoom}
            className="create-room"
          >
           
            <img src={googleIconImg} alt="Logo Google"></img>
            Crie sua sala com o Google
          </button>

          <div className="separator">
            ou entre em uma sala existente
          </div>

          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da Sala"
              //Toda vez que o user digitar alguma coisa pegar esse valor
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar na sala</Button>
            <Toaster 
                position="bottom-right"
                reverseOrder={false}
            />
          </form>

        </div>

      </main>

    </div>
  );

}