'use client';

import { useEffect, useState } from 'react';

import { useLink, useStore, useSync } from '@/hooks';
import type { DrawerLinkData, Holding } from '@/types';

import { useConnect } from './useConnect';

export function useModel(canSync: boolean) {
  const [canConnect, setCanConnect] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isSynced, setIsSynced] = useState<boolean | null>(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [unsynced, setUnsynced] = useState([]);

  const { onLink } = useLink<DrawerLinkData>();
  const { forecasts, holdings } = useStore();
  const {
    instance,
    isActive,
    isBase,
    isDecked,
    onClose,
    onReset,
    onSync,
  } = useSync();

  const {
    handleOnConnect,
    handleOnPrepareToConnect,
    hasConnectionError,
    isConnected,
    isReady,
  } = useConnect();

  const handleOnSync = async () => {
    setHasError(false);
    setIsSynced(false);
    setIsSyncing(true);

    const response = await fetch('/sync/balances', { method: 'POST' });

    if (!response.ok) {
      setErrorCount(previous => previous + 1);
      setHasError(true);
      setIsSyncing(false);

      return;
    }

    const result = await response.json();

    setErrorCount(0);
    setIsSyncing(false);

    if (result.synced.length > 0) {
      result.synced.forEach((updated: Holding) => {
        holdings.setHolding(updated);
      });

      forecasts.setForecast();
    }

    if (result.unsynced.length > 0) {
      setUnsynced(result.unsynced);
      setIsSynced(null);
    } else {
      setUnsynced([]);
      setIsSynced(true);
    }
  };

  useEffect(() => {
    if (!canSync && !hasConnectionError && isConnected) {
      onSync();

      // eslint-disable-next-line react-hooks/set-state-in-effect
      handleOnSync();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canSync, hasConnectionError, isConnected]);

  useEffect(() => {
    if (canConnect && isReady) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCanConnect(false);

      onClose();

      handleOnConnect();
    }
  }, [canConnect, isReady, onClose, handleOnConnect]);

  const handleOnConfirm = async () => {
    if (errorCount > 1) {
      onClose();

      return;
    }

    if (canSync) {
      if (isSynced === true) {
        onClose();
      } else if (isSynced === null) {
        onReset();

        onLink({
          unsynced,
        });
      } else {
        handleOnSync();
      }
    } else {
      setCanConnect(true);

      await handleOnPrepareToConnect();
    }
  };

  return {
    handleOnConfirm,
    hasError: hasError || hasConnectionError,
    hasErroredTooMuch: errorCount > 1,
    instance,
    isActive,
    isBase,
    isDecked,
    isSynced,
    isSyncing,
    onClose,
  };
}
