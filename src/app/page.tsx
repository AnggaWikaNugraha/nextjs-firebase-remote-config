'use client';

import { useEffect, useState } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import {
  getRemoteConfig,
  fetchAndActivate,
  getValue,
} from "firebase/remote-config";
import { getAnalytics, isSupported } from "firebase/analytics";

export default function PromoBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [promoMessage, setPromoMessage] = useState("");

  // --- Firebase Init ---
  const firebaseConfig = {
    apiKey: "AIzaSyCgVii0TD1udq7Kl_OVVC2RTrhrOWOC924",
    authDomain: "remote-config-f9467.firebaseapp.com",
    projectId: "remote-config-f9467",
    storageBucket: "remote-config-f9467.firebasestorage.app",
    messagingSenderId: "189499038445",
    appId: "1:189499038445:web:4e9b3c6e4cacc9803e0ae4",
    measurementId: "G-ML29WKNHRK",
  };

  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  const db = getFirestore(app);
  const remoteConfig = getRemoteConfig(app);

  remoteConfig.settings = {
    minimumFetchIntervalMillis: 0, // fetch tiap saat
    fetchTimeoutMillis: 60000
  };

  remoteConfig.defaultConfig = {
    show_promo_banner: "false",
    promo_message: "Selamat datang!",
  };

  const initAnalytics = async () => {
    if (typeof window !== "undefined" && (await isSupported())) {
      return getAnalytics(app);
    }
    return null;
  };

  // --- Fetch Remote Config ---
  useEffect(() => {
    const setup = async () => {
      await initAnalytics();

      try {
        console.log("Fetching remote config...");
        const activated = await fetchAndActivate(remoteConfig);
        console.log("Remote Config activated:", activated);

        console.log("show_promo_banner:", getValue(remoteConfig, "show_promo_banner").asString());
        console.log("promo_message:", getValue(remoteConfig, "promo_message").asString());


        const show = getValue(remoteConfig, "show_promo_banner").asString() === "true";
        const message = getValue(remoteConfig, "promo_message").asString();

        setShowBanner(show);
        setPromoMessage(message);
      } catch (err) {
        console.error("Remote Config error:", err);
      }
    };

    setup();
  }, []);

  // --- UI ---
  if (!showBanner) return null;

  return (
    <div style={{ backgroundColor: "#ababab", padding: "1rem", borderRadius: "8px" }}>
      <h4 style={{ margin: 0 }}>{promoMessage}</h4>
    </div>
  );
}
