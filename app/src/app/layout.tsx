"use client";

import React, { useEffect, useState } from "react";
import RainBackground from "@/components/RainBackground";
import SunBackground from "@/components/SunBackground";
import CloudyBackground from "@/components/CloudyBackground";
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

  useEffect(() => {
    const weatherOptions: WeatherType[] = ["rain", "sun", "cloudy"];
    const interval = setInterval(() => {
      const randomWeather =
          weatherOptions[Math.floor(Math.random() * weatherOptions.length)];
      setCurrentWeather(randomWeather);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

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
      {renderBackground()}
      <div className="relative z-10">{children}</div>
      </body>
      </html>
  );
}
