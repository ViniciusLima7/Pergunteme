//import Hooks
import { useHistory, useParams } from 'react-router-dom';
import { useRoom } from '../hooks/useRoom';
import { useTheme } from '../hooks/useTheme';


// import Images
import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';


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
  const {theme} = useTheme();

//Funções
function backHome(){
  history.push(`/`);
}

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

  async function handleCheckQuestionAnswered(questionId:string){
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
       isAnswered: true,
    })
  }

  async function handleHighlightQuestion(questionId:string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighLighted: true,
    })
  }

  return (
    <div id="page-room" className={theme}>

      <header>

        <div className="content">
          <img 
          src={logoImg} 
          alt="Logo"
          onClick={backHome}
          ></img>
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
                isAnswered={question.isAnswered}
                isHighLighted={question.isHighLighted}
              >
                {!question.isAnswered &&(
                  // Fragmento não atrapalha o css e não e mostrado no html
                  <>
                  <button 
                  type="button"
                  onClick={ () =>handleCheckQuestionAnswered(question.id)}
                >
                  <img src={checkImg} alt="Marcar Pergunta como Respondida"></img>
                </button>
                <button 
                  type="button"
                  onClick={ () =>handleHighlightQuestion(question.id)}
                >
                  <img src={answerImg} alt="Dar Destaque Pergunta"></img>
                </button>
                  </>
                )}
                

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