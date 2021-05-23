import React from 'react';
import { Alert } from 'antd';
import './index.css';
import faceWithHandOverMouth from '../../../../assets/face-with-hand-over-mouth.png';
import SendButton from '../SendButton';

type Props = {
  send: () => Promise<void>
}

const LinkAlreadySent = ({ send }: Props) => {
  return (
    <>
      <Alert className="link-already-sent-alert" message={<>The link already sent<br/>Do you still wanna sent it?</>}
             type="warning" showIcon
             action={<SendButton send={send} onlyIcon/>}
             icon={<img src={faceWithHandOverMouth} height="32px" width="32px" alt="face with hand over mouth"/>}/>
    </>
  )
};

export default LinkAlreadySent;
