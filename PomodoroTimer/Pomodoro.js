import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import './Pomodoro.css';

function Pomodoro() {
  const [timer, setTimer] = useState();

  let [giveUpModal, setgiveUpModal] = useState(false);
  let [changeTimerModal, setchangeTimerModal] = useState(false);
  let [isTimeRunning, setIsTimeRunning] = useState(false);
  const [input, setInput] = useState(30);
  
  let [remainingSeconds, setremainingSeconds] = useState(input * 60);//initially rmsec = input * 60 = 1500 (25 *60)
  const start = () => {
    setgiveUpModal(false)
    setIsTimeRunning(true)
    const timer = setInterval(() => {
      if (remainingSeconds > 0) {
        setremainingSeconds((remainingSeconds) => remainingSeconds - 1);
      }
      
    }, 1000);
    setTimer(timer);
    
  };

  const changeTime = () =>{
    clearInterval(timer)
    setchangeTimerModal(true)
  }

  const stop = () => {
    clearInterval(timer);
    setgiveUpModal(true)
  }

  const restart = () => {
    setremainingSeconds(input * 60)
    setIsTimeRunning(false)
    setgiveUpModal(false)
  }

  useEffect(() => {
    if (remainingSeconds === 0) {
      clearInterval(timer);
      alert("Your Time Got Over")
      setIsTimeRunning(false)
      setremainingSeconds(input * 60)
    }
  }, [remainingSeconds, timer,input]);

  useEffect(() => {
    return () => clearInterval(timer);
  }, [timer]);

  const closeModal = () => {
    setgiveUpModal(false)
    start();
  }
  const closeCurrentTimerModal = () => {
    setchangeTimerModal(false)
    start();

  }
  const GiveUpModal = () => {
    return (
      <div className="modal">
        <div className="modal-content">
          <p>Timer is still running/paused! If you continue, the timer will restart.</p>
          <button
            className="pomodoro-button"
            onClick={() => closeModal()}>
              Close
          </button>
          <button
            className="pomodoro-button"
            onClick={() => restart()}>
              Continue
          </button>
        </div>
      </div>
    )
  }
  const ChangeTimerModal = () => {
    return (
      <div className="modal">
        <div className="modal-content">
          <p>Change Timer in Minutes</p>
          <form onSubmit={handleChangeTimerSubmit} className='timer-form'>
          <input
            placeholder='Set In Minutes'
            value={input}
            onChange={(e) => handleChange(e)}
            name='time'
            className='timer-input'
          />
          <button
            className="pomodoro-button"
            onClick={() => closeCurrentTimerModal()}>
              Close
          </button>
          <button
            className="pomodoro-button"
            type="submit"
            onClick={(e) => handleChangeTimerSubmit(e)}>
              Continue
          </button>
          </form>
        </div>
      </div>
    )
  }
  const handleChange = e => {
    console.log("Handle Change "+e.target.value)
    setInput(e.target.value);
  };

  const handleChangeTimerSubmit = e => {
    e.preventDefault();
    setremainingSeconds(input * 60)
    alert("Now you have set the timer to "+input+" mins")
    setIsTimeRunning(false)
    setchangeTimerModal(false)
  };
  return (
    <>
    { isTimeRunning && giveUpModal && GiveUpModal()}
    { changeTimerModal && ChangeTimerModal()}
    <div className='pomodoro-container'>
      
        <h1>Pomodoro Timer</h1> 
        
        <div style={{margin:"10px"}}>
          {isTimeRunning && !giveUpModal && !changeTimerModal ?  <FontAwesomeIcon color="#BF1363"  icon={faClock} size="8x" pulse /> : <FontAwesomeIcon color="white" icon={faClock} size="8x"  /> }
          </div>
        <div className="timer-container">
        
        {(Math.floor(remainingSeconds / 60)) < 10 ? `0${ Math.floor(remainingSeconds / 60)}:` :`${ Math.floor(remainingSeconds / 60)}:`}{(remainingSeconds % 60)<10 ? `0${ remainingSeconds % 60}` :`${ remainingSeconds % 60}`}
          </div>
        <div>
        <button className='pomodoro-button' onClick={changeTime}>
            Change Timer
        </button>

        <button className='pomodoro-button' onClick={start}>
            Start Timer
        </button>

        <button className='pomodoro-button' onClick={stop}>
            Give Up
        </button>
        </div>
        
    </div>
    </>
  )
}

export default Pomodoro