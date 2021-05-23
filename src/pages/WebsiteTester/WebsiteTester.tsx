import React, { useEffect, useState } from 'react';
import { ConfigModel } from '../Config/config.model';
import { Space, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import LinkAlreadySent from './components/LinkAlreadySent/';
import './WebsiteTester.css'
import * as chromeExtensionService from '../../services/chrome-extension';
import SendButton from './components/SendButton';

type Props = {
  config: ConfigModel,
};

const WebsiteTester = ({ config }: Props) => {
  const [isLinkAlreadySent, setIsLinkAlreadySent] = useState<boolean>();

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

  async function send() {

  }

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
