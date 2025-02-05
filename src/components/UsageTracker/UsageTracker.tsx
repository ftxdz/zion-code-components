import { useEffect, useState, useMemo } from 'react';
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
  // Cookie 操作的工具函数
  const CookieUtil = {
    set(name: string, value: string, days: number = 1) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      const expires = `expires=${date.toUTCString()}`;
      document.cookie = `${name}=${value};${expires};path=/`;
    },

    get(name: string): string | null {
      const cookieName = `${name}=`;
      const cookies = document.cookie.split(';');
      for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.indexOf(cookieName) === 0) {
          return cookie.substring(cookieName.length, cookie.length);
        }
      }
      return null;
    }
  };

  // 获取初始值
  const getInitialValue = () => {
    const savedDate = CookieUtil.get(DATE_KEY);
    const currentDate = new Date().toDateString();
    
    console.log("初始化检查：", {
      savedDate,
      currentDate,
      isNull: !savedDate,
      isNotToday: savedDate !== currentDate,
      currentStorage: CookieUtil.get(STORAGE_KEY)
    });

    // 如果没有保存日期，初始化为今天
    if (!savedDate) {
      console.log("初始化日期");
      // 初始化日期
      CookieUtil.set(DATE_KEY, currentDate);
      // 初始化计数
      CookieUtil.set(STORAGE_KEY, '0');
      return 0;
    }
    
    if (savedDate !== currentDate) {
      console.log("不是今天");
      // 重置日期
      CookieUtil.set(DATE_KEY, currentDate);
      // 重置计数
      CookieUtil.set(STORAGE_KEY, '0');
      return 0;
    }
    
    const currentUsage = parseInt(CookieUtil.get(STORAGE_KEY) || '0');
    console.log("返回当前使用次数：", currentUsage);
    return currentUsage;
  };

  // 使用 useMemo 来缓存初始值，但确保在组件挂载时就执行
  const initialValue = useMemo(() => {
    const value = getInitialValue();
    // 确保初始化后立即更新 cookie
    if (!CookieUtil.get(DATE_KEY)) {
      CookieUtil.set(DATE_KEY, new Date().toDateString());
      CookieUtil.set(STORAGE_KEY, '0');
    }
    return value;
  }, []);

  const [usage, setUsage] = useState<number>(initialValue);
  const [prevTrigger, setPrevTrigger] = useState<number | undefined>(propData.trigger);

  // 增加使用次数
  const incrementUsage = () => {
    const newUsage = usage + 1;
    console.log("增加使用次数：", { oldUsage: usage, newUsage });
    CookieUtil.set(STORAGE_KEY, newUsage.toString());
    setUsage(newUsage);
  };

  // 初始化时检查
  useEffect(() => {
    console.log("qwert - 组件初始化");
  }, []);

  // 当触发变量改变时增加计数
  useEffect(() => {
    console.log("asdf - trigger更新", propData.trigger);
    if (propData.trigger !== undefined && propData.trigger !== prevTrigger) {
      incrementUsage();
      setPrevTrigger(propData.trigger);
    }
  }, [propData.trigger]);

  // 更新外部状态
  useEffect(() => {
    console.log("usage更新：", usage);
    propState.currentUsage?.set(usage);
  }, [usage]);

  return null; // 这是一个逻辑组件，不需要渲染任何内容
} 