import React, {Component, useEffect, useState} from "react";
import '../styles/App.css';

const App = () => {

  const [workDuration, setWorkDuration] = useState(25)
  const [breakDuration, setBreakDuration] = useState(5)
  const [workSecond, setWorkSecond] = useState(1500)
  const [breakSecond, setBreakSecond] = useState(300)
  const [type, setType] = useState('work')
  const [resetFlag, setResetFlag] = useState(true)
  const [flag, setFlag] = useState(false)

  const display = (second) => {
      let m = parseInt(second/60).toString()
      let s = parseInt(second%60).toString()
      if(m.length === 1) {
         m = '0' + m
      }
      if(s.length === 1) {
         s = '0' + s
      }
      return m + ':' + s
  }

  const handleSet = () => {
      setResetFlag(false)
      setType('work')
      setWorkSecond(workDuration*60)
      setBreakSecond(breakDuration*60)
  }

  const handleStart = () => {
      setFlag(true)
      setResetFlag(false)
  }

  const handleStop = () => {
     setFlag(false)
  }

  const handleReset = () => {
    setResetFlag(true)
    setFlag(false)
    setType('work')
    setWorkDuration(25)
    setBreakDuration(5)
    setWorkSecond(25*60)
    setBreakSecond(5*60)
  }
  
  useEffect(() => {
     if(flag && type === 'work') {
         if(workSecond > 0) {
            const timerId = setTimeout(() => {
                setWorkSecond(workSecond-1)
            },1000)
            return ()=> clearInterval(timerId)
         }
         if(workSecond === 0) {
             alert('work duration is over')
             setType('break')
             setWorkSecond(workDuration*60)
          }
     }
     if(flag && type === 'break') {
        if(breakSecond > 0) {
          const timerId = setTimeout(() => {
            setBreakSecond(breakSecond-1)
          },1000)
          return ()=> clearInterval(timerId)
        }
        if(breakSecond === 0) {
            alert('break duration is over')
            setType('work')
            setBreakSecond(breakDuration*60)
          }
     }
  },[flag,type,workSecond,breakSecond])

  return (
    <div id="main">
      <h1>{
        type === 'work' ? display(workSecond) : display(breakSecond)
      }
      </h1>
      <h2>{
         type === 'work' ? 'Work-Time' : 'Break-Time'
      }
      </h2>
      <button data-testid='start-btn'disabled={flag} onClick={handleStart}>start</button>
      <button data-testid='stop-btn' disabled={!flag} onClick={handleStop}>Stop</button>
      <button data-testid='reset-btn' disabled={resetFlag} onClick={handleReset}>Reset</button> <br/><br/>
      <input data-testid='work-duration' type='number' disabled={flag} value={workDuration}  onChange={(e) => {setWorkDuration(e.target.value > 0 ? e.target.value : '')}}></input>
      <input data-testid='break-duration' type='number' disabled={flag} value={breakDuration}   onChange={(e) => {setBreakDuration(e.target.value > 0 ? e.target.value : '')}}></input>
      <button data-testid='set-btn' disabled={flag} onClick={handleSet}>set</button>
    </div>
  )
}


export default App;
