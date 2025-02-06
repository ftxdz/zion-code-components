import { useEffect, useState } from 'react';
import { State } from 'zvm-code-context';

export interface UsageTrackerPropData {
  trigger?: number;           // 触发计数增加的变量
}

export interface UsageTrackerEvent {}

export interface UsageTrackerStateData {
  currentUsage?: State<number>;  // 当前使用次数
}

export interface UsageTrackerProps {
  event: UsageTrackerEvent;
  propData: UsageTrackerPropData;
  propState: UsageTrackerStateData;
}

const STORAGE_KEY = 'usage_counter';
const DATE_KEY = 'usage_date';

export function UsageTracker({ propData, propState }: UsageTrackerProps) {
  // 加密工具
  const CryptoUtil = {
    // 加密密钥
    KEY: 'ZionComponents2024SecureKey12345',
    
    // 将字符串转换为 Uint8Array
    async stringToBuffer(str: string): Promise<Uint8Array> {
      return new TextEncoder().encode(str);
    },

    // 将 Uint8Array 转换为字符串
    async bufferToString(buffer: Uint8Array): Promise<string> {
      return new TextDecoder().decode(buffer);
    },

    // 生成加密密钥
    async generateKey(): Promise<CryptoKey> {
      const keyMaterial = await crypto.subtle.importKey(
        'raw',
        await this.stringToBuffer(this.KEY),
        { name: 'PBKDF2' },
        false,
        ['deriveBits', 'deriveKey']
      );

      return crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          salt: await this.stringToBuffer('ZionSalt'),
          iterations: 100000,
          hash: 'SHA-256'
        },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt']
      );
    },

    // 加密方法
    async encrypt(text: string): Promise<string> {
      try {
        const key = await this.generateKey();
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const timestamp = new Date().getTime().toString();
        const data = `${text}|${timestamp}`;

        const encryptedContent = await crypto.subtle.encrypt(
          {
            name: 'AES-GCM',
            iv: iv
          },
          key,
          await this.stringToBuffer(data)
        );

        const encryptedArray = new Uint8Array(encryptedContent);
        const resultArray = new Uint8Array(iv.length + encryptedArray.length);
        resultArray.set(iv);
        resultArray.set(encryptedArray, iv.length);

        return btoa(String.fromCharCode(...resultArray));
      } catch (e) {
        console.error('Encryption failed:', e);
        return '';
      }
    },

    // 解密方法
    async decrypt(encrypted: string): Promise<string | null> {
      try {
        const key = await this.generateKey();
        const encryptedData = new Uint8Array(
          atob(encrypted)
            .split('')
            .map(char => char.charCodeAt(0))
        );

        const iv = encryptedData.slice(0, 12);
        const data = encryptedData.slice(12);

        const decryptedContent = await crypto.subtle.decrypt(
          {
            name: 'AES-GCM',
            iv: iv
          },
          key,
          data
        );

        const decryptedText = await this.bufferToString(new Uint8Array(decryptedContent));
        const [text] = decryptedText.split('|');
        return text;
      } catch (e) {
        console.error('Decryption failed:', e);
        return null;
      }
    }
  };

  // Cookie 加密存储的工具函数
  const EncryptedCookieUtil = {
    async set(name: string, value: string, days: number = 1) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      const expires = `expires=${date.toUTCString()}`;
      // 存储加密后的值
      const encrypted = await CryptoUtil.encrypt(value);
      document.cookie = `${name}=${encrypted};${expires};path=/`;
    },

    async get(name: string): Promise<string | null> {
      const cookieName = `${name}=`;
      const cookies = document.cookie.split(';');
      for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.indexOf(cookieName) === 0) {
          // 获取并解密值
          const encrypted = cookie.substring(cookieName.length, cookie.length);
          return await CryptoUtil.decrypt(encrypted);
        }
      }
      return null;
    }
  };

  // 获取初始值
  const getInitialValue = async () => {
    const savedDate = await EncryptedCookieUtil.get(DATE_KEY);
    const currentDate = new Date().toDateString();
    
    if (savedDate !== currentDate) {
      // 重置日期
      await EncryptedCookieUtil.set(DATE_KEY, currentDate);
      // 重置计数
      await EncryptedCookieUtil.set(STORAGE_KEY, '0');
      return 0;
    }
    
    const currentUsage = parseInt(await EncryptedCookieUtil.get(STORAGE_KEY) || '0');
    return currentUsage;
  };

  const [usage, setUsage] = useState<number>(0);
  const [prevTrigger, setPrevTrigger] = useState<number | undefined>(propData.trigger);

  // 增加使用次数
  const incrementUsage = async () => {
    const newUsage = usage + 1;
    await EncryptedCookieUtil.set(STORAGE_KEY, newUsage.toString());
    setUsage(newUsage);
  };

  // 当触发变量改变时增加计数
  useEffect(() => {
    if (propData.trigger !== undefined && propData.trigger !== prevTrigger) {
      incrementUsage();
      setPrevTrigger(propData.trigger);
    }
  }, [propData.trigger]);

  // 更新外部状态
  useEffect(() => {
    propState.currentUsage?.set(usage);
  }, [usage]);

  useEffect(() => {
    getInitialValue().then(value => {
      setUsage(value);
      if (!EncryptedCookieUtil.get(DATE_KEY)) {
        EncryptedCookieUtil.set(DATE_KEY, new Date().toDateString());
        EncryptedCookieUtil.set(STORAGE_KEY, '0');
      }
    });
  }, []);

  return null; // 这是一个逻辑组件，不需要渲染任何内容
} 