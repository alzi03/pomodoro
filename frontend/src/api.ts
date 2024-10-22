import React from "react";
import axios from 'axios';

const apiHost = "http://localhost:8000"

//      Store Pomodoro Cycle In Backend     //
export const saveNewCycle = async( time: number, description?: string, ) => {

    description = "testCycle"

    try{
        const response = await axios.post(`${apiHost}/api/save_new_cycle?time=${time}&description=${description}`)
        console.log(response)
    } catch (e) {
        console.error(e)
        console.log("Error Saving New Cycle")
    }
}


