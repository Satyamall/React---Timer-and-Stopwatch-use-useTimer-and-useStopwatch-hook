
import './App.css';
import useStopwatch from './Hooks/useStopwatch';
import useTimer from './Hooks/useTimer';
import { useState } from 'react';

function App() {
  
  const initTime={
    sec: 0,
    min: 0,
    hr: 0
  }

  const initTimer={
    time: 0
  }

  const { sec,min,hr,setHr,setMin,setSec, stopTimer, startTimer, resetTimer } = useTimer( initTime )

  const {timer,time,handleReset,handleStart,handleStop}=useStopwatch(initTimer)

  const [display, setDisplay] = useState(true);
  return (
    <div className="App">
      <h1 className="h-tag">Timer And Stopwatch</h1>
      <div className="button-box">
        <button onClick={() => setDisplay(true)}>Timer</button>
        <button onClick={() => setDisplay(false)}>Stopwatch</button>
      </div>
      {
        display ? (
       <div className="timer">
             <h1>Timer</h1>
            <div className="box">
                <input type="number" placeholder="00h" onChange={(e) => setHr(parseInt(e.target.value))} value={hr} />hr
                : <input type="number" placeholder="00m" onChange={(e) => setMin(parseInt(e.target.value))} value={min} />min
                : <input type="number" placeholder="00s" onChange={(e) => setSec(parseInt(e.target.value))} value={sec} />sec
            </div>
            <div className="b">
                <button className="start" onClick={startTimer}>START</button>
                <button className="stop" onClick={stopTimer}>STOP</button>
                <button className="reset" onClick={resetTimer}>RESET</button>
            </div>
        </div>
        ): (

        <div className="StopWatch">
             <h1>Stopwatch</h1>
            <div ref={timer} className="time">
                <span>{("0"+ Math.floor((time/600000)%60)).slice(-2)} h :</span>
                <span>{("0"+ Math.floor((time/60000)%60)).slice(-2)} m :</span>
                <span>{("0"+ Math.floor((time/1000)%60)).slice(-2)} s :</span>
                <span>{("0"+ ((time/10)%100)).slice(-2)} ms</span>
            </div>
            <div className="b">
                <button className="start" onClick={handleStart}>START</button>
                <button className="stop" onClick={handleStop}>STOP</button>
                <button className="reset" onClick={handleReset}>RESET</button>
            </div>
        </div>
        )
      }
    </div>
  );
}

export default App;
