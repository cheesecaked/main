import React, { useState, useRef } from 'react';

export const MyButton = () => {
  const [Seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const countRef = useRef(null)

    const handleStart = () => {
      setIsActive(true)
      setIsPaused(true)
      countRef.current = setInterval(() => {
        setSeconds((Seconds) => Seconds + 1)
        if (Seconds === 60) {
        }
      }, 1000)
    }

  const handlePause = () => {
    clearInterval(countRef.current)
    setIsPaused(false)

  }

  const handleResume = () => {
    setIsPaused(true)
    countRef.current = setInterval(() => {
      setSeconds((Seconds) => Seconds + 1)
    }, 1000)
  } 

  const handleReset = () => {
    clearInterval(countRef.current)
    setIsActive(false)
    setIsPaused(false)
    setSeconds(0)
  }

  return (
    <div className="app">
      <h3>stopwatch</h3>
      <div className='stopwatch-card'>
        <p>
          <h3>Seconds: {Seconds}</h3>
          <h3>Minutes: {Math.floor(Seconds/60)}</h3>
          <h3>Hours: {Math.floor(Seconds/3600)}</h3>
        </p>
        <div className='buttons'>
          <button onClick={handleStart}>Start</button>
          <button onClick={handlePause}>Pause</button>
          <button onClick={handleResume}>Resume</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
    </div>
  );
}