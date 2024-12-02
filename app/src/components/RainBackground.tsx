"use client";

import React from "react";

const RainBackground: React.FC = () => {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-background">
            {[...Array(100)].map((_, i) => (
                <span
                    key={i}
                    className="absolute w-[2px] h-[50px] bg-blue-500 opacity-50 animate-fall"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDuration: `${Math.random() * 1 + 1}s`,
                    }}
                />
            ))}
        </div>
    );
};

export default RainBackground;
