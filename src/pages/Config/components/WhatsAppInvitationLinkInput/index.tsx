import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button, Input, Space } from 'antd';
import { WhatsAppOutlined } from '@ant-design/icons';
import './index.css'
import {
  getWhatsAppDirectInvitationUrlFromRegularInvitationUrl,
  isValidWhatsappChatInvitationLink
} from '../../../../services/whatsapp';

const WhatsAppInvitationLinkInput = ({ setDirectInvitationUrl }: { setDirectInvitationUrl: Dispatch<SetStateAction<string>> }) => {
  const [whatsAppInvitationUrl, setWhatsAppInvitationUrl] = useState<string>('');
  const [isLinkValid, setIsLinkValid] = useState<boolean>(false);

  function save() {
    if (!isLinkValid) {
      return;
    }

    const messageLink = getWhatsAppDirectInvitationUrlFromRegularInvitationUrl(whatsAppInvitationUrl);

    if (!messageLink) {
      setIsLinkValid(false);
      return;
    }

    setDirectInvitationUrl(messageLink);
  }

  useEffect(() => {
    setIsLinkValid(isValidWhatsappChatInvitationLink(whatsAppInvitationUrl));
  }, [whatsAppInvitationUrl]);

  function sendIfEnterPressed(event: any) {
    if (event.keyCode === 13) {
      event.preventDefault();

      save()
    }
  }

  return (
    <Space className={'whatapp-invitation-url-container'}>
      <Input size="large"
             prefix={<WhatsAppOutlined className={`${isLinkValid ? '' : 'in'}valid-whatsapp-icon`}/>}
             placeholder="WhatsApp Group invitation link (e.g https://chat.whatsapp.com/<code>)"
             value={whatsAppInvitationUrl}
             onKeyUp={sendIfEnterPressed}
             onChange={(event) => setWhatsAppInvitationUrl(event.target.value)}/>
      <Button onClick={save} size={"large"}>Save</Button>
    </Space>
  );
};

export default WhatsAppInvitationLinkInput;
