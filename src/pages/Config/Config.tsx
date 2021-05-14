import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  getWhatsAppDirectInvitationUrlFromRegularInvitationUrl,
  isValidWhatsappChatInvitationLinkUnExpanded,
  validateWhatsAppInvitationLink
} from '../../services/whatsapp';

const Config = ({ setDirectInvitationUrl }: { setDirectInvitationUrl: Dispatch<SetStateAction<string>> }) => {
  const [whatsAppInvitationUrl, setWhatsAppInvitationUrl] = useState<string>('');
  const [expandedWhatsAppInvitationUrl, setExpandedWhatsAppInvitationUrl] = useState<string>();

  async function validateWhatsAppInvitationLinkFully() {
    setExpandedWhatsAppInvitationUrl(await validateWhatsAppInvitationLink(whatsAppInvitationUrl));
  }

  useEffect(() => {
    let messageLink = '';

    if(!isValidWhatsappChatInvitationLinkUnExpanded(expandedWhatsAppInvitationUrl ?? '')) {
      return;
    }

    if (expandedWhatsAppInvitationUrl) {
      messageLink = getWhatsAppDirectInvitationUrlFromRegularInvitationUrl(expandedWhatsAppInvitationUrl) ?? messageLink;
    }

    debugger;
    setDirectInvitationUrl(messageLink);
  }, [expandedWhatsAppInvitationUrl, setDirectInvitationUrl]);

  function sendIfEnterPressed(event: any) {
    if (event.keyCode === 13) {
      event.preventDefault();

      validateWhatsAppInvitationLinkFully()
    }
  }

  return (
    <div>
      <div>
        <input id="whatsapp-invitation-link"
               placeholder="WhatsApp invitation link"
               value={whatsAppInvitationUrl}
               onKeyUp={sendIfEnterPressed}
               onChange={(event) => setWhatsAppInvitationUrl(event.target.value)}
               style={{ color: !!expandedWhatsAppInvitationUrl ? 'green' : 'red', width: '386px' }}/>
        <button onClick={validateWhatsAppInvitationLinkFully}>Save</button>
      </div>
    </div>
  );
};

export default Config;
