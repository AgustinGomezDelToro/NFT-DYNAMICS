"use client";

import React from "react";

const CloudyBackground: React.FC = () => {
    return (
        <div className="fixed inset-0 z-[-1] bg-gradient-to-t from-gray-300 to-gray-100">
            {[...Array(20)].map((_, i) => (
                <div
                    key={i}
                    className="absolute bg-white rounded-full opacity-70 animate-cloudMove"
                    style={{
                        width: `${Math.random() * 200 + 150}px`, // Tamaño aleatorio más grande
                        height: `${Math.random() * 100 + 80}px`,
                        top: `${Math.random() * 70}%`, // Altura aleatoria
                        left: `${Math.random() * 100}%`, // Posición inicial horizontal
                        animationDuration: `${Math.random() * 10 + 5}s`, // Duración aleatoria para suavizar el movimiento
                    }}
                />
            ))}
        </div>
    );
};

export default CloudyBackground;
