import React, { useCallback, useEffect, useState } from 'react';
import { ConfigModel } from '../Config/config.model';
import { Alert, Space, Spin } from 'antd';
import { LoadingOutlined, GithubOutlined } from '@ant-design/icons';
import LinkAlreadySent from './components/LinkAlreadySent/';
import './WebsiteTester.css'
import * as chromeExtensionService from '../../services/chrome-extension';
import SendButton from './components/SendButton';
import { LinkType } from '../Config/link-type.enum';
import * as techPicksArchive from '../../services/techpicks-archive';

type Props = {
  config: ConfigModel,
};

const WebsiteTester = ({ config }: Props) => {
  const [currentUrl, setCurrentUrl] = useState<string>();
  const [error, setError] = useState<Error | any>();
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

      if (!currentUrl) {
        return currentUrl;
      }

      const isLinkAlreadySentResult = await techPicksArchive.isLinkAlreadySent(currentUrl);

      setIsLinkAlreadySent(isLinkAlreadySentResult);
    }

    isCurrentUrlAlreadySent().catch(err => setError(err));

    // TODO - on component unmount it should abort the request
  }, []);

  useEffect(() => {
    console.log({ isLinkAlreadySent, config });
    if (isLinkAlreadySent === undefined || config === undefined) {
      return;
    }
  }, [config, isLinkAlreadySent])

  // TODO - Extract to component
  if(error) {
    console.error('If you see this, please add it to your issue', error);
    return <Alert
      style={{width: 'max-content'}}
      message="There was an error"
      showIcon
      description={<>There was an error when trying to find out if your link is already been sent or not (error message={error.message})<br/>Please open an issue at <GithubOutlined onClick={() => {
        const newURL = 'https://github.com/rluvaton/is-already-sent-to-tech-picks-extension';
        chrome.tabs.create({ url: newURL });}
      }/></>}
      type="error"
    />
  }

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
