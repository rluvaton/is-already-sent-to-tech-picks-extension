import React, { Dispatch, SetStateAction } from 'react';
import WhatsAppInvitationLinkInput from './components/WhatsAppInvitationLinkInput/';

const Config = ({ setDirectInvitationUrl }: { setDirectInvitationUrl: Dispatch<SetStateAction<string>> }) => {

  return (
    <div>
      <WhatsAppInvitationLinkInput setDirectInvitationUrl={setDirectInvitationUrl}/>
    </div>
  );
};

export default Config;
