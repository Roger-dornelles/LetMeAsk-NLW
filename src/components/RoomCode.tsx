import  copyImg  from '../assets/images/copy.svg';

import '../styles/room-code.scss';


type RoomCodeProps = {
    code:string;
}
export const RoomCode = (props: RoomCodeProps)=>{

    const copyRoomCodeToClipboard = ()=>{
        navigator.clipboard.writeText(props.code)
    }

    return(
        <button className="room-code" onClick={copyRoomCodeToClipboard}>

            <div>
                <img src={copyImg} alt="copy room code" />
            </div>
            <span>SALA {props.code}</span>
        </button>
            
    )
}