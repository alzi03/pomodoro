import React from "react";
import { useState } from "react";

import Timer from "./Timer";
import './Timer.css'

const TimerPage: React.FC = () => {
    return(
        <div id="timerPageContainer">
            <Timer />
        </div>
    )

}


export default TimerPage;