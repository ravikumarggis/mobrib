import { useEffect, useCallback } from "react";
import { useTimer } from "react-timer-hook";

interface UsePersistentTimerProps {
  durationInSeconds: number;
  storageKey: string;
  onExpire?: () => void;
  startOnMount: boolean;
}

export const usePersistentTimer = ({
  durationInSeconds,
  storageKey,
  onExpire,
  startOnMount,
}: UsePersistentTimerProps) => {
  const getExpiryTimestamp = () => {
    const saved = localStorage.getItem(storageKey);
    if (saved) return new Date(saved);

    const expiry = new Date();
    expiry.setSeconds(expiry.getSeconds() + durationInSeconds);
    localStorage.setItem(storageKey, expiry.toString());
    return expiry;
  };

  const { seconds, minutes, restart, isRunning } = useTimer({
    expiryTimestamp: startOnMount ? getExpiryTimestamp() : new Date(),
    onExpire: () => {
      localStorage.removeItem(storageKey);
      if (onExpire) onExpire();
    },
  });

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      restart(new Date(saved));
    }
  }, []);

  const restartTimer = useCallback(() => {
    const newExpiry = new Date();
    newExpiry.setSeconds(newExpiry.getSeconds() + durationInSeconds);
    localStorage.setItem(storageKey, newExpiry.toString());
    restart(newExpiry);
  }, [durationInSeconds, restart, storageKey]);

  return {
    minutes,
    seconds,
    isRunning,
    restartTimer,
  };
};
