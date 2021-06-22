//import Routers
import { useHistory } from 'react-router-dom';

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

export function Home() {

  const history = useHistory();

  //Estados
  const { user, signInWithGoogle } = useAuth();

  //Funções

  // Navegar para Criar Sala
  async function handleCreateRoom() {

    //Se não existir user 
    if (!user) {
      //Chamar função de Login com Google
      await signInWithGoogle();
    }
    // Enviar para history o caminho da Nova Página
    history.push('/rooms/new');
  }

  return (

    <div id="page-auth">

      <aside>

        <img src={illustrationImg} alt="Ilustração"></img>
        <strong>Crie salas  de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>

      </aside>

      <main>

        <div className="main-content">

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

          <form>
            <input
              type="text"
              placeholder="Digite o código da Sala"
            />
            <Button type="submit">Entrar na sala</Button>
          </form>

        </div>
        
      </main>

    </div>
  );

}