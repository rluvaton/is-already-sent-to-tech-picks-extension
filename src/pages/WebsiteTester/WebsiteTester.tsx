import React, { useCallback, useEffect, useState } from 'react';
import { ConfigModel } from '../Config/config.model';
import { Space, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import LinkAlreadySent from './components/LinkAlreadySent/';
import './WebsiteTester.css'
import * as chromeExtensionService from '../../services/chrome-extension';
import SendButton from './components/SendButton';
import { LinkType } from '../Config/link-type.enum';

type Props = {
  config: ConfigModel,
};

const WebsiteTester = ({ config }: Props) => {
  const [currentUrl, setCurrentUrl] = useState<string>();
  const [isLinkAlreadySent, setIsLinkAlreadySent] = useState<boolean>();

  const send = useCallback(async () => {
    switch (config?.whatsappSentType) {
      case LinkType.PREDEFINED_WHATSAPP_GROUP_LINK:
        // sendToWhatsappGroup(currentUrl);
        console.log(currentUrl);
        break;

      case LinkType.NONE:
      default:
        return;
    }
  }, [config, currentUrl]);

  useEffect(() => {
    async function getCurrentTabUrl() {
      let currentUrl: string | undefined = window.location.href;

      if (chromeExtensionService.isInChromeExtension()) {
        [{ url: currentUrl }] = await chromeExtensionService.queryTabs({ active: true, currentWindow: true });
      }
      return currentUrl;
    }

    async function isCurrentUrlAlreadySent() {
      const currentUrl = await getCurrentTabUrl();
      setCurrentUrl(currentUrl);

      const results = [5]; //await githubService.findLinkInRepository(currentUrl);

      setTimeout(() => setIsLinkAlreadySent(results.length > 0), 1000);
    }

    isCurrentUrlAlreadySent();

    // TODO - on component unmount it should abort the request
  }, []);

  useEffect(() => {
    console.log({ isLinkAlreadySent, config });
    if (isLinkAlreadySent === undefined || config === undefined) {
      return;
    }
  }, [config, isLinkAlreadySent])

  // TODO - need to show when error occur
  if (isLinkAlreadySent === undefined) {
    return <Spin style={{ padding: '26px' }} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin/>}/>
  }

  return (
    <Space direction="vertical" className={`website-tester ${isLinkAlreadySent && 'already-sent'}`}>
      {isLinkAlreadySent ? <LinkAlreadySent send={send}/> : <SendButton send={send}/>}
    </Space>
  );
};

export default WebsiteTester;
