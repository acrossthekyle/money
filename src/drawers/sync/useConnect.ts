'use client';

import { useCallback, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';

export function useConnect() {
  const [error, setError] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const handleOnGenerate = useCallback(async (token: string | null) => {
    const response = await fetch('/sync/exchange', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      setError('Something went wrong, please try again later.');
    }

    setIsConnected(true);
  }, []);

  const handleOnPrepareToConnect = async () => {
    const response = await fetch('/sync/tokenize', { method: 'POST' });

    if (!response.ok) {
      setError('Something went wrong, please try again later.');

      return;
    }

    const data = await response.json();

    setToken(data.token);
  };

  const { open, ready } = usePlaidLink({
    token,
    onExit: () => {
      setToken(null);
    },
    onSuccess: handleOnGenerate,
  });

  return {
    error,
    handleOnConnect: open,
    handleOnPrepareToConnect,
    hasConnectionError: !!error,
    isConnected,
    isReady: ready,
  };
}
