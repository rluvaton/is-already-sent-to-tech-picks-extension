import React, { Dispatch, SetStateAction, useState } from 'react';
import './Config.css';
import { Button, Divider, Form, Layout, Select, Typography } from 'antd';
import WhatsAppInvitationLinkInput from './components/WhatsAppInvitationLinkInput/';
import { LinkType } from './link-type.enum';
import { getWhatsAppDirectInvitationUrlFromRegularInvitationUrl } from '../../services/whatsapp';
import { ConfigModel } from './config.model';
import { FormProps } from 'antd/lib/form/Form';
import { FormItemLabelProps } from 'antd/lib/form/FormItemLabel';
import { FormItemInputProps } from 'antd/lib/form/FormItemInput';

const { Content } = Layout;
const { Option } = Select;
const { Text } = Typography;

export interface ConfigProps {
  config?: ConfigModel;
  setConfig: Dispatch<SetStateAction<ConfigModel | undefined>>;
}

const layout: FormProps = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 16 },
  },
  labelAlign: 'right',
};

const saveLayout: FormItemLabelProps & FormItemInputProps = {
  wrapperCol: {
    md: { offset: 8, span: 2 },
    span: 24
  },
  labelCol: {span: 0}
};

const Config = ({ config, setConfig }: ConfigProps) => {
  const [linkType, setLinkType] = useState<LinkType>(LinkType.NONE);
  const [tempConfig, setTempConfig] = useState(config);

  const onFinish = (values: any) => {
    const progressValues = { ...values };
    console.log('Success:', values);

    switch (values.whatsappSentType) {
      case LinkType.PREDEFINED_WHATSAPP_GROUP_LINK:
        progressValues.whatsappGroupDirectInvitationLink = getWhatsAppDirectInvitationUrlFromRegularInvitationUrl(values.whatsappGroupInvitationLink);
        break;
    }

    setConfig(progressValues);
  };

  return (
    <Content style={{ padding: '50px' }}>

      <div>
        <Form
          {...layout}
          initialValues={tempConfig}
          onValuesChange={(formValues) => setTempConfig({ ...tempConfig, ...formValues })}
          onFinish={onFinish}
        >
          <Form.Item
            label="WhatsApp send type"
            name="whatsappSentType"
          >
            <Select defaultValue={LinkType.NONE} onChange={(value) => setLinkType(value)}>
              <Option title="I only want to know if a link is already sent or not" value={LinkType.NONE}>None</Option>
              <Option title="Open WhatsApp and propose to send the checked link to group"
                      value={LinkType.PREDEFINED_WHATSAPP_GROUP_LINK}>Prepare message to WhatsApp Group (Coming
                Soon)</Option>
              <Option title="Open WhatsApp and propose to send the checked link to the opened chat"
                      value={LinkType.SELECT_ON_WHATSAPP_OPEN}>Manually Select When Opening WhatsApp (Coming
                Soon)</Option>
            </Select>
          </Form.Item>


          <WhatsAppInvitationLinkInput hidden={linkType !== LinkType.PREDEFINED_WHATSAPP_GROUP_LINK}/>

          <Form.Item {...saveLayout} className="submit-column">
            <Button type="primary" htmlType="submit">Save</Button>
          </Form.Item>
        </Form>

        <div>
          <Divider orientation="left" className="privacy-note-divider">Privacy</Divider>
          <Text type="secondary" className="privacy-note">We don't send or share any of the data you provide here</Text>
        </div>
      </div>
    </Content>
  );
};

export default Config;
