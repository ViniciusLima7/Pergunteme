//import Hooks
import { useHistory, useParams } from 'react-router-dom';
//import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';

// import Images
import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';

//import components
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';


//import css
import '../styles/room.scss';
import { database } from '../services/firebase';


//types





type RoomParams = {
  id: string;
}

export function AdminRoom() {

  // const { user } = useAuth();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { title, questions } = useRoom(roomId);


  async function handleEndRoom(){
    await database.ref(`rooms/${roomId}`).update({ 
      endedAt: new Date(),
    });

    history.push('/');
  }


 async function handleDeleteQuestion(questionId:string){

    if(window.confirm('Tem certeza que deseja excluir a pergunta?')){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  return (
    <div id="page-room">

      <header>

        <div className="content">
          <img src={logoImg} alt="Logo"></img>
          <div>
            <RoomCode code={roomId}></RoomCode>
            <Button isOutlined onClick={handleEndRoom}>Encerrar Sala</Button>
          </div>
        </div>

      </header>

      <main>

        <div className="room-title">
          <h1>Sala {title}</h1>

          {questions.length > 0
            &&

            <span>
              {questions.length} Pergunta(s)
            </span>}
        </div>


        <div className="question-list">
          {questions.map(question => {
            return (
              <Question
                //performance
                key={question.id}
                content={question.content}
                author={question.author}
              >
                <button 
                  type="button"
                  onClick={ () =>handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="deletar Pergunta"></img>
                </button>
              </Question>

            );
          })}
        </div>
      </main>

    </div>
  );
}