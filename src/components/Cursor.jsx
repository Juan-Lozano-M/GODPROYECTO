"use client"

import { useRef, useEffect } from "react"

export default function Cursor() {
  const curzrRef = useRef(null)

  // SVG fill colors
  const innerFill = "#F2F5F8" // --body-color
  const outerFill = "#111920" // --outline-color
  const hoverInnerFill = "#E2F0FF" // Slightly different color for hover
  const hoverOuterFill = "#0056b3" // Highlight color for hover

  useEffect(() => {
    // Check if not on mobile device
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      if (!curzrRef.current) return

      // Show cursor
      curzrRef.current.removeAttribute("hidden")

      // Set up cursor tracking variables
      const cursorSize = 25 // Default size in pixels
      const cursor = {
        position: {
          distanceX: 0,
          distanceY: 0,
          distance: 0,
          pointerX: 0,
          pointerY: 0,
        },
        previousPointerX: 0,
        previousPointerY: 0,
        angle: 0,
        previousAngle: 0,
        angleDisplace: 0,
        degrees: 57.296,
        isHovering: false,
      }

      // Get SVG paths for color changes
      const innerPath = curzrRef.current.querySelector(".inner")
      const outerPath = curzrRef.current.querySelector(".outer")

      // Apply initial styles
      const style = curzrRef.current.style
      style.width = `${cursorSize}px`
      style.height = `${cursorSize}px`
      style.left = `${-cursorSize / 2}px`
      style.transition = "500ms, transform 57ms"

      // Rotation function
      const rotate = (position) => {
        const unsortedAngle = Math.atan(Math.abs(position.distanceY) / Math.abs(position.distanceX)) * cursor.degrees
        let modAngle

        cursor.previousAngle = cursor.angle

        if (position.distanceX <= 0 && position.distanceY >= 0) {
          cursor.angle = 90 - unsortedAngle + 0
        } else if (position.distanceX < 0 && position.distanceY < 0) {
          cursor.angle = unsortedAngle + 90
        } else if (position.distanceX >= 0 && position.distanceY <= 0) {
          cursor.angle = 90 - unsortedAngle + 180
        } else if (position.distanceX > 0 && position.distanceY > 0) {
          cursor.angle = unsortedAngle + 270
        }

        if (isNaN(cursor.angle)) {
          cursor.angle = cursor.previousAngle
        } else {
          if (cursor.angle - cursor.previousAngle <= -270) {
            cursor.angleDisplace += 360 + cursor.angle - cursor.previousAngle
          } else if (cursor.angle - cursor.previousAngle >= 270) {
            cursor.angleDisplace += cursor.angle - cursor.previousAngle - 360
          } else {
            cursor.angleDisplace += cursor.angle - cursor.previousAngle
          }
        }

        style.transform += ` rotate(${cursor.angleDisplace}deg)`

        setTimeout(() => {
          modAngle = cursor.angleDisplace >= 0 ? cursor.angleDisplace % 360 : 360 + (cursor.angleDisplace % 360)
          if (modAngle >= 45 && modAngle < 135) {
            style.left = `${-cursorSize * (cursor.isHovering ? 1.2 : 1)}px`
            style.top = `${(-cursorSize / 2) * (cursor.isHovering ? 1.2 : 1)}px`
          } else if (modAngle >= 135 && modAngle < 225) {
            style.left = `${(-cursorSize / 2) * (cursor.isHovering ? 1.2 : 1)}px`
            style.top = `${-cursorSize * (cursor.isHovering ? 1.2 : 1)}px`
          } else if (modAngle >= 225 && modAngle < 315) {
            style.left = `0px`
            style.top = `${(-cursorSize / 2) * (cursor.isHovering ? 1.2 : 1)}px`
          } else {
            style.left = `${(-cursorSize / 2) * (cursor.isHovering ? 1.2 : 1)}px`
            style.top = "0px"
          }
        }, 0)
      }

      // Movement tracking function
      const handleMouseMove = (event) => {
        cursor.previousPointerX = cursor.position.pointerX
        cursor.previousPointerY = cursor.position.pointerY
        cursor.position.pointerX = event.pageX + document.body.getBoundingClientRect().x
        cursor.position.pointerY = event.pageY + document.body.getBoundingClientRect().y
        cursor.position.distanceX = cursor.previousPointerX - cursor.position.pointerX
        cursor.position.distanceY = cursor.previousPointerY - cursor.position.pointerY
        cursor.position.distance = Math.sqrt(cursor.position.distanceY ** 2 + cursor.position.distanceX ** 2)

        style.transform = `translate3d(${cursor.position.pointerX}px, ${cursor.position.pointerY}px, 0)`

        if (cursor.position.distance > 1) {
          rotate(cursor.position)
        } else {
          style.transform += ` rotate(${cursor.angleDisplace}deg)`
        }
      }

      // Button hover effects
      const handleButtonEnter = () => {
        cursor.isHovering = true

        // Scale up the cursor - fixed regex
        const currentTransform = style.transform
        const scaleRegex = /scale$$\d*\.?\d+$$/
        style.transform = currentTransform.replace(scaleRegex, "") + " scale(1.2)"

        // Change colors
        innerPath.setAttribute("fill", hoverInnerFill)
        outerPath.setAttribute("fill", hoverOuterFill)

        // Add a subtle transition for smooth color change
        innerPath.style.transition = "fill 0.3s ease"
        outerPath.style.transition = "fill 0.3s ease"
      }

      const handleButtonLeave = () => {
        cursor.isHovering = false

        // Scale back to normal - fixed regex
        const currentTransform = style.transform
        const scaleRegex = /scale$$\d*\.?\d+$$/
        style.transform = currentTransform.replace(scaleRegex, "") + " scale(1)"

        // Restore original colors
        innerPath.setAttribute("fill", innerFill)
        outerPath.setAttribute("fill", outerFill)
      }

      // Add event listener for cursor movement
      document.body.addEventListener("mousemove", handleMouseMove)

      // Hide default cursor
      document.body.style.cursor = "none"

      // Set cursor style for interactive elements and add hover effects
      const interactiveElements = document.body.querySelectorAll("button, label, input, textarea, select, a")
      interactiveElements.forEach((el) => {
        el.style.cursor = "inherit"

        // Add hover effect listeners
        el.addEventListener("mouseenter", handleButtonEnter)
        el.addEventListener("mouseleave", handleButtonLeave)
      })

      // Cleanup function
      return () => {
        document.body.removeEventListener("mousemove", handleMouseMove)
        document.body.style.cursor = ""

        // Remove hover effect listeners
        interactiveElements.forEach((el) => {
          el.removeEventListener("mouseenter", handleButtonEnter)
          el.removeEventListener("mouseleave", handleButtonLeave)
        })
      }
    } else {
      // Remove component on mobile
      const element = curzrRef.current
      if (element && element.parentNode) {
        element.parentNode.removeChild(element)
      }
    }
  }, []) // Empty dependency array means this runs once on mount

  return (
    <div ref={curzrRef} className="fixed top-0 box-border z-[2147483647] select-none pointer-events-none" hidden>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <path
          className="inner"
          d="M25,30a5.82,5.82,0,0,1-1.09-.17l-.2-.07-7.36-3.48a.72.72,0,0,0-.35-.08.78.78,0,0,0-.33.07L8.24,29.54a.66.66,0,0,1-.2.06,5.17,5.17,0,0,1-1,.15,3.6,3.6,0,0,1-3.29-5L12.68,4.2a3.59,3.59,0,0,1,6.58,0l9,20.74A3.6,3.6,0,0,1,25,30Z"
          fill={innerFill}
        />
        <path
          className="outer"
          d="M16,3A2.59,2.59,0,0,1,18.34,4.6l9,20.74A2.59,2.59,0,0,1,25,29a5.42,5.42,0,0,1-.86-.15l-7.37-3.48a1.84,1.84,0,0,0-.77-.17,1.69,1.69,0,0,0-.73.16l-7.4,3.31a5.89,5.89,0,0,1-.79.12,2.59,2.59,0,0,1-2.37-3.62L13.6,4.6A2.58,2.58,0,0,1,16,3m0-2h0A4.58,4.58,0,0,0,11.76,3.8L2.84,24.33A4.58,4.58,0,0,0,7,30.75a6.08,6.08,0,0,0,1.21-.17,1.87,1.87,0,0,0,.4-.13L16,27.18l7.29,3.44a1.64,1.64,0,0,0,.39.14A6.37,6.37,0,0,0,25,31a4.59,4.59,0,0,0,4.21-6.41l-9-20.75A4.62,4.62,0,0,0,16,1Z"
          fill={outerFill}
        />
      </svg>
    </div>
  )
}

