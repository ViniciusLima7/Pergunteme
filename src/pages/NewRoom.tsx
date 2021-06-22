import {Link} from 'react-router-dom';

// import Images
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

//import scss 

import '../styles/auth.scss';
import {Button} from '../components/Button';
import { useAuth} from '../hooks/useAuth'
export function NewRoom() {

  const {user} = useAuth();

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
          <br></br>
          {/* ? Se for undefined verificar   */}
          <h1>Olá {user?.name}</h1> 
          <h2>Criar uma nova Sala</h2>
          <form>
            <input
              type="text"
              placeholder="Nome da Sala"
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>Quer entrar em uma sala já existente?
            <Link to="/">Clique Aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}