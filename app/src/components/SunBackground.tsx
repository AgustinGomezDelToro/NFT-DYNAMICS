'use client'

import React, { useRef, useEffect } from 'react'

const SunBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        function drawSun(x: number, y: number, radius: number) {
            if (!ctx) return

            // Draw sun
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
            gradient.addColorStop(0, 'rgba(255, 255, 0, 1)')
            gradient.addColorStop(0.8, 'rgba(255, 255, 0, 0.8)')
            gradient.addColorStop(1, 'rgba(255, 255, 0, 0)')

            ctx.fillStyle = gradient
            ctx.beginPath()
            ctx.arc(x, y, radius, 0, Math.PI * 2)
            ctx.fill()

            // Draw rays
            ctx.strokeStyle = 'rgba(255, 255, 0, 0.5)'
            ctx.lineWidth = 2

            for (let i = 0; i < 12; i++) {
                const angle = (i / 12) * Math.PI * 2
                const startX = x + Math.cos(angle) * radius
                const startY = y + Math.sin(angle) * radius
                const endX = x + Math.cos(angle) * (radius * 1.5)
                const endY = y + Math.sin(angle) * (radius * 1.5)

                ctx.beginPath()
                ctx.moveTo(startX, startY)
                ctx.lineTo(endX, endY)
                ctx.stroke()
            }
        }

        function animate() {
            if (!ctx || !canvas) return

            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Draw sky
            const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
            skyGradient.addColorStop(0, '#87CEEB')
            skyGradient.addColorStop(1, '#E0F6FF')
            ctx.fillStyle = skyGradient
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // Draw sun
            const sunX = canvas.width * 0.8
            const sunY = canvas.height * 0.2
            const sunRadius = Math.min(canvas.width, canvas.height) * 0.1
            drawSun(sunX, sunY, sunRadius)

            requestAnimationFrame(animate)
        }

        animate()

        const handleResize = () => {
            if (!canvas) return
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return <canvas ref={canvasRef} className="fixed inset-0 z-[-1]" aria-hidden="true" />
}

export default SunBackground
