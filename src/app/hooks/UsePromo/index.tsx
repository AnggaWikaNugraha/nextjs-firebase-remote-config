'use client';

import { useEffect, useState } from 'react';
import remoteConfig from '../..//lib/firebase/remote-config';
import { fetchAndActivate, getValue } from 'firebase/remote-config';
import { getAnalytics, isSupported } from 'firebase/analytics';
import app from '../../lib/firebase/client';

const useRemotePromoConfig = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [promoMessage, setPromoMessage] = useState('');

  useEffect(() => {
    const setup = async () => {
      // Inisialisasi Analytics hanya jika window tersedia
      if (typeof window !== 'undefined' && (await isSupported())) {
        getAnalytics(app);
      }

      try {
        await fetchAndActivate(remoteConfig);

        const show = getValue(remoteConfig, 'show_promo_banner').asString() === 'true';
        const message = getValue(remoteConfig, 'promo_message').asString();

        setShowBanner(show);
        setPromoMessage(message);
      } catch (err) {
        console.error('Remote Config error:', err);
      }
    };

    setup();
  }, []);

  return { showBanner, promoMessage };
};

export default useRemotePromoConfig;
