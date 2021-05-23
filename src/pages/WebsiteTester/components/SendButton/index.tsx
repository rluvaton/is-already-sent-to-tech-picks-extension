import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import './index.css';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { ButtonProps } from 'antd/lib/button/button';

type Props = {
  send: () => Promise<void>;
  size?: SizeType;
  onlyIcon?: boolean;
}

const onlyIconsProps: ButtonProps = {
  type: 'ghost',
  shape: 'circle'
}

const SendButton = ({ send, size = 'middle', onlyIcon = false }: Props) => {
  const [onlyIconsPropsIfNeeded, setOnlyIconsPropsIfNeeded] = useState(onlyIcon ? onlyIconsProps : {});

  useEffect(() => {
    setOnlyIconsPropsIfNeeded(onlyIcon ? onlyIconsProps : {})
  }, [onlyIcon])

  return (
    <>
      <Button className={`send-btn ${onlyIcon && 'only-icon'}`}
              type="primary" size={size} icon={<SendOutlined />}
              onClick={send}
              {...onlyIconsPropsIfNeeded}>{onlyIcon || 'Send'}</Button>
    </>
  )
};

export default SendButton;
