import { FormEvent } from 'react';
// import Router
import {Link, useHistory} from 'react-router-dom';

// import Images
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

//import scss 
import '../styles/auth.scss';

//Import Component
import {Button} from '../components/Button';

//import Hooks
import { useAuth} from '../hooks/useAuth'
import { useState } from 'react';

//import firebase e Toaster
import { database } from '../services/firebase';
import {toast, Toaster} from 'react-hot-toast';

export function NewRoom() {

  const {user} = useAuth();
  const history = useHistory();


  //Estados
  const [newRoom,setNewRoom] =useState('');

    //  Criar Sala
    async function handleCreateRoom(event:FormEvent) {
      //Fazer formulário n recarregar
      event.preventDefault();
      //trim verifica os espaços
      if(newRoom.trim() === '') {
        toast.error("Primeiro,  digite o nome da sala");
        return;
        
        
      }
      //roomRef recebe minha categoria rooms
      const roomRef = database.ref('rooms');

      //inserir informação em rooms
      const firebaseRoom = await roomRef.push({
        title: newRoom,
        authorId: user?.id,

      });

      //Redirecionar para Rooms/key do firebase
      history.push(`/Room/admin/${firebaseRoom.key}`);
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
          <br></br>
          {/* ? Se for undefined verificar   */}
          <h1>Olá {user?.name}</h1> 
          <h2>Criar uma nova Sala</h2>

          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da Sala"
              //Toda vez que o user digitar alguma coisa pegar esse valor
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">Criar sala</Button>
            <Toaster
              position="bottom-right"
              reverseOrder={false}
            />
          </form>

          <p>Quer entrar em uma sala já existente?
            <Link to="/">Clique Aqui</Link>
          </p>

        </div>

      </main>
      
    </div>
  );
}