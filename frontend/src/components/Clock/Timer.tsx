import React from "react";
import { useState, useEffect } from "react";


// Number of Seconds Left
interface TimerProps{ 
    start_time: number
}

const Timer: React.FC<TimerProps> = ({ start_time }) => {

    const [time, setTime] = useState<number>(0)
    const [hours, setHours] = useState<number>();
    const [minutes, setMinutes] = useState<number>();
    const [seconds, setSeconds] = useState<number>();
    
    const [countdown, setCountdown] = useState<boolean>(false);


    useEffect(() => {
        setTime(start_time)
        
        const overHour = Math.floor(start_time / 3600)
        if (overHour > 0){
            setHours(overHour)
            start_time -= 3600 * overHour
        }

        const overMinute = Math.floor(start_time / 60)
        if (overMinute > 0){
            setMinutes(overMinute)
            start_time -= 60 * overMinute
        }

        setSeconds(start_time)
        

    }, [])

    useEffect(() => {

    })


    

    return(
        <div></div>
    )
}


export default Timer;
