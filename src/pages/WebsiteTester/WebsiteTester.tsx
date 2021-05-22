import React, { useEffect, useState } from 'react';
import { ConfigModel } from '../Config/config.model';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';


type Props = {
  config: ConfigModel,
};


const WebsiteTester = ({ config }: Props) => {
  const [isLinkAlreadySent, setIsLinkAlreadySent] = useState<boolean>();
  const [isLinkAlreadySentStringified, setIsLinkAlreadySentStringified] = useState<string>('');

  useEffect(() => {

    async function getCurrentTabUrl() {
      let currentUrl: string | undefined = window.location.href;

      if (chrome.tabs) {
        [{ url: currentUrl }] = await chrome.tabs.query({ active: true, currentWindow: true })
      }
      return currentUrl;
    }

    async function isCurrentUrlAlreadySent() {
      const currentUrl = await getCurrentTabUrl();

      const results = []; //await githubService.findLinkInRepository(currentUrl);

      setTimeout(() => setIsLinkAlreadySent(results.length > 0), 1000);
    }

    isCurrentUrlAlreadySent();

    // TODO - on component unmount it should abort the request
  }, []);

  useEffect(() => {
    let stingified = '';

    if (isLinkAlreadySent !== undefined) {
      stingified = isLinkAlreadySent.toString();
    }

    setIsLinkAlreadySentStringified(stingified);

  }, [isLinkAlreadySent]);

  useEffect(() => {
    console.log({ isLinkAlreadySent, config });
    if (isLinkAlreadySent === undefined || config === undefined) {
      return;
    }
  }, [config, isLinkAlreadySent])


  if (isLinkAlreadySent === undefined) {
    return <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin/>}/>
  }

  return (
    <div>
      <span>Is Link Already Sent: {isLinkAlreadySentStringified}</span>
    </div>
  );
};

export default WebsiteTester;
