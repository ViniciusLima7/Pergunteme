//import Hooks
import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// import Images
import logoImg from '../assets/images/logo.svg';


//import components
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { database } from '../services/firebase';

//import css
import '../styles/room.scss';
import toast, { Toaster } from 'react-hot-toast';

//types

type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string,
  isHighLighted: boolean;
  isAnswered: boolean;
}>

type Question = {
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  content: string,
  isHighLighted: boolean;
  isAnswered: boolean;
}

type RoomParams = {
  id: string;
}

export function Room() {

  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;

  //Estados

  const [newQuestion, setNewQuestion] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on('value', room => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighLighted: value.isHighLighted,
          isAnswered: value.isAnswered,
        }
      })
      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    })

  }, [roomId])

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();
    //trim verifica os espaços
    if (newQuestion.trim() === '') {
      toast.error("Primeiro,  digite sua pergunta");
      return;
     
    }

    if (!user) {
      throw new Error('Você não esta logado');
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighLighted: false,
      isAnswered: false
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);
    setNewQuestion('');
  }

  return (
    <div id="page-room">

      <header>

        <div className="content">
          <img src={logoImg} alt="Logo"></img>
          <RoomCode code={roomId}></RoomCode>
        </div>

      </header>

      <main>

        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0
            &&
            <span>
              {questions.length} perguntas
            </span>}
        </div>

        <form onSubmit={handleSendQuestion} >
          <textarea
            placeholder="O que você quer perguntar?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          >
          </textarea>

          <div className="form-footer">
            {user ?
              (
                <div className="user-info">
                  <img src={user.avatar} alt="Avatar"></img>
                  <span>{user.name}</span>
                </div>
              )
              :
              (
                <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
              )}
            <Button type="submit" disabled={!user}>Enviar Pergunta</Button>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
          </div>
        </form>
        {JSON.stringify(questions)}
      </main>

    </div>
  );
}