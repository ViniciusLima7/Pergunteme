//import images
import { toast, Toaster } from 'react-hot-toast';
import copyImg from '../assets/images/copy.svg';

//import scss
//import '../styles/room-code.scss';
import '../styles/room-code.scss';

//Types

type RoomCodeProps = {
  code: string;
}

export function RoomCode(props: RoomCodeProps) {


  //Funções
  function copyRoomCodeToClipboard() {
    //Copiar texto no navegador
    toast.success('Copiado');
    navigator.clipboard.writeText(props.code);

    // colocar toast quando copiar
  }

  return (
    <>
      <button
        className="room-code"
        onClick={copyRoomCodeToClipboard}
      >
        <div>
          <img src={copyImg} alt="Copiar Código da Sala"></img>
        </div>
        <span> Sala #{props.code}</span>
      </button>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </>
  );
}