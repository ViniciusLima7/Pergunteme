//import images
import copyImg from '../assets/images/copy.svg';

//import scss
import '../styles/room-code.scss';

//Types

type RoomCodeProps = {
  code: string;
}

export function RoomCode(props: RoomCodeProps) {

  function copyRoomCodeToClipboard() {
    //Copiar texto no navegador
    navigator.clipboard.writeText(props.code);
  }

  return (
    <button
      className="room-code"
      onClick={copyRoomCodeToClipboard}
    >
      <div>
        <img src={copyImg} alt="Copiar Código da Sala"></img>
      </div>
      <span> Sala #{props.code}</span>
    </button>
  );
}