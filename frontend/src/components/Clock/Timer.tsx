import React from "react";
import { useState, useEffect } from "react";
import './Timer.css'

import { saveNewCycle } from "../../api";

const Timer: React.FC = ({}) => {

    // Time Values
    const [time, setTime] = useState<number>(0)
    const [totalTime, setTotalTime] = useState<number>(0); // Track total cycle time
    const [hours, setHours] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(0);

    // Display Values
    const [dispHour, setDispHour] = useState("00")
    const [dispMinute, setDispMinute] = useState("00")
    const [dispSecond, setDispSecond] = useState("00")

    // Button States
    const [countdown, setCountdown] = useState<boolean>(false);
    const [done, setDone] = useState<boolean>(false);
    const [paused, setPaused] = useState<string>("START");

    // Check if the most recent cycle has been saved
    const [cycleSaved, setCycleSaved] = useState<boolean>(false);



    /*      Handle Time Change      */
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
        setter("");
    };

    const handleBlur = (dispSetter: React.Dispatch<React.SetStateAction<string>>, setter: React.Dispatch<React.SetStateAction<number>>, value: string) => {
        if (!value) {
            dispSetter("00");
            setter(0)
        }
        if (value == "0")
            dispSetter("00")
        else if (value.length == 1){
            dispSetter("0" + value)
        }
    };

    const handleHourChange = (e: React.ChangeEvent<any>) => {
        setDispHour("")
        let val = e.target.value

        console.log(val)

        setHours(Number.parseInt(val));
        setDispHour(val)
    }

    const handleMinuteChange = (e: React.ChangeEvent<any>) => {
        setDispMinute("")
        let val = e.target.value

        if (val.length >= 2) {
            val = Math.min(59, Number(val))
        }


        setMinutes(Number.parseInt(val));
        setDispMinute("" + Number.parseInt(val))

    }

    const handleSecondChange = (e: React.ChangeEvent<any>) => {
        setDispSecond("")
        let val = e.target.value
        
        if (val.length >= 2) {
            val = Math.min(59, Number(val))
        }

        setSeconds(Number.parseInt(val))
        setDispSecond("" + Number.parseInt(val))
    }

    /*      Pom Buttons      */
    const handleStart = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setCountdown(true);
        setPaused("PAUSE")

        let cycleTime = hours * 3600 + minutes * 60 + seconds
        setTime(cycleTime)
        setTotalTime(cycleTime)
    }

    useEffect(() => {
        if (paused == "PAUSE"){
            const interval = setInterval(() => {
                setTime(prevTime => prevTime - 1)
            }, 1000);
            
            return () => clearInterval(interval)
        }
    }, [paused])

    useEffect(() => {

        if (paused == "PAUSE"){
            let tempTime = time

            let overHour = Math.floor(tempTime / 3600)
            tempTime -= 3600 * overHour
            let overMinute = Math.floor(tempTime / 60)
            tempTime -= 60 * overMinute
            let overSecond = tempTime
            
            if (overHour == 0){
                setDispHour("00")
            }
            else if (overHour < 10){
                setDispHour("0" + overHour)
            }
            else{
                setDispHour("" + overHour)
            }

            if (overMinute == 0){
                setDispMinute("00")
            }
            else if (overMinute < 10){
                setDispMinute("0" + overMinute)
            }
            else{
                setDispMinute("" + overMinute)
            }

            if (tempTime == 0){
                setDispSecond("00")
            }
            else if (tempTime < 10){
                setDispSecond("0" + tempTime)
            }
            else{
                setDispSecond("" + tempTime)
            }
        }

    }, [time, countdown])

    const pauseStart = () => {
        if (paused == "PAUSE")
            setPaused("START")
        else
            setPaused("PAUSE")
    }

    //      Finished Cycle      //
    useEffect(() => {
        if (time === 0 && !cycleSaved && paused == "PAUSE") { 
          saveNewCycle(totalTime).then(() => {
            console.log('Cycle saved');
          }).catch(error => console.error('Error saving cycle:', error));
          setPaused("DONE");
          setCycleSaved(true)
        }

      }, [time]);


    


    

    return(
        <div>
            {!countdown ? 
            <div id="timerContainer">
                <div id="inputContainer">
                    <input
                        className="numberInput"
                        type="number"
                        value={dispHour}
                        onFocus={(e) => handleFocus(e, setDispHour)}
                        onChange={handleHourChange}
                        onBlur={() => handleBlur(setDispHour, setHours, dispHour)}
                        min="0" 
                        max="99"
                    />
                    <div className="colon">:</div>
                    <input
                        className="numberInput"
                        type="number"
                        value={dispMinute}
                        onFocus={(e) => handleFocus(e, setDispMinute)}
                        onChange={handleMinuteChange}
                        onBlur={() => handleBlur(setDispMinute, setMinutes, dispMinute)}
                        min="0" 
                        max="59"
                    /><span className="colon">:</span>
                    <input
                        className="numberInput"
                        type="number"
                        value={dispSecond}
                        onFocus={(e) => handleFocus(e, setDispSecond)}
                        onChange={handleSecondChange}
                        onBlur={() => handleBlur(setDispSecond, setSeconds, dispSecond)}
                        min="0" 
                        max="59"
                    />
                </div>
                <button className="pomButton" onClick={handleStart}>START</button>
            </div>
         : 
         <div id="countdownContainer">
            <div id="countNumbers">
                <div className="numberCounter">{dispHour}</div>
                <div className="colon">:</div>
                <div className="numberCounter">{dispMinute}</div>
                <div className="colon">:</div>
                <div className="numberCounter">{dispSecond}</div>
            </div>
            <button className="pomButton" onClick={pauseStart}>{paused}</button>
         </div> 
         }
        </div>
    )
}


export default Timer;
