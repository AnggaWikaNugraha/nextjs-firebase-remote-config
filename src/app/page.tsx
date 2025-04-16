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
import useRemotePromoConfig from "./hooks/UsePromo";

export default function PromoBanner() {
  
  const { showBanner, promoMessage } = useRemotePromoConfig();

  // --- UI ---
  if (!showBanner) return null;

  return (
    <div style={{ backgroundColor: "#ababab", padding: "1rem", borderRadius: "8px" }}>
      <h4 style={{ margin: 0 }}>{promoMessage}</h4>
    </div>
  );
}
