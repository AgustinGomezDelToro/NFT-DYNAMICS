"use client";

import React, { useEffect, useState } from "react";
import RainBackground from "@/components/RainBackground";
import SunBackground from "@/components/SunBackground";
import CloudyBackground from "@/components/CloudyBackground";
import { Web3Provider } from "../context/MetaMaskContext";
import { ConnectKitButton } from "connectkit";
import localFont from "next/font/local";

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

type WeatherType = "rain" | "sun" | "cloudy";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [currentWeather, setCurrentWeather] = useState<WeatherType>("sun");
  const [autoChange] = useState(true); // Para controlar cambios automáticos

  useEffect(() => {
    if (!autoChange) return; // No ejecuta el intervalo si autoChange es false

    const weatherOptions: WeatherType[] = ["rain", "sun", "cloudy"];
    const interval = setInterval(() => {
      const randomWeather =
          weatherOptions[Math.floor(Math.random() * weatherOptions.length)];
      setCurrentWeather(randomWeather);
    }, 2000);

    return () => clearInterval(interval);
  }, [autoChange]);


  const renderBackground = () => {
    switch (currentWeather) {
      case "rain":
        return <RainBackground />;
      case "sun":
        return <SunBackground />;
      case "cloudy":
        return <CloudyBackground />;
      default:
        return null;
    }
  };

  return (
      <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <Web3Provider>
        {renderBackground()}
        <div className="relative z-10 p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-4">
              <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => window.location.href = "/"}
              >
                HOME
              </button>
              <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => window.location.href = "/weather"}
              >
                WEATHER
              </button>
              <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  onClick={() => window.location.href = "/mint"}
              >
                MINT
              </button>
            </div>
            <ConnectKitButton/>
          </div>

          {children}
        </div>
      </Web3Provider>
      </body>
      </html>
  );
}
