import React, { useEffect, useState } from 'react';
import { Form, Input } from 'antd';
import { WhatsAppOutlined } from '@ant-design/icons';
import './index.css'
import { isValidWhatsappChatInvitationLink, whatsappChatInventionLinkRegex } from '../../../../services/whatsapp';

// We're using `hidden` and not just an `if` on this component at the parent because then the `isLinkValid` will be resolved to false while it's true
const WhatsAppInvitationLinkInput = ({ hidden }: { hidden: boolean }) => {
  const [whatsAppInvitationUrl, setWhatsAppInvitationUrl] = useState<string>('');
  const [isLinkValid, setIsLinkValid] = useState<boolean>(false);


  useEffect(() => {
    setIsLinkValid(isValidWhatsappChatInvitationLink(whatsAppInvitationUrl));
  }, [whatsAppInvitationUrl]);

  return (
    <Form.Item className={'whatapp-invitation-url-container'}
               label="WhatsApp group invitation link"
               name="whatsappGroupInvitationLink"
               hidden={hidden}
               tooltip={<span>Why do we need it?<br/>Because Whatsapp doesn't support messaging a group programmatically we need that link to get around it</span>}
               rules={[
                 { required: !hidden, message: 'Please paste the link or select other link type' },
                 { pattern: whatsappChatInventionLinkRegex, message: 'Please put a valid link' }
               ]}>
      <Input prefix={<WhatsAppOutlined className={`${isLinkValid ? '' : 'in'}valid-whatsapp-icon`}/>}
             value={whatsAppInvitationUrl}
             placeholder="https://chat.whatsapp.com/<code>"
             onChange={(event) => setWhatsAppInvitationUrl(event.target.value)}
      />
    </Form.Item>
  );
};

export default WhatsAppInvitationLinkInput;
