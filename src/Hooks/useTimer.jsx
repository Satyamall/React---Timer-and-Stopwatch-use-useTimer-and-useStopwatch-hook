import { useEffect, useRef, useState } from "react";


export default function useTimer(initTime) {

    const [sec, setSec] = useState(initTime.sec);
    const [min, setMin] = useState(initTime.min);
    const [hr, setHr] = useState(initTime.hr);
    const [timeOn, setTimeOn] = useState(false);
    var idhr = useRef(null)
    var idmin = useRef(null)
    var idsec = useRef(null)

    useEffect(() => {
        if (timeOn) {
            idsec = setInterval(() => {
                if(sec<=0)
                {
                    setSec(0);
                    clearInterval(idsec);
                }
                else{
                    setSec((prev) => prev - 1)
                }
            }, 1000)
            if (sec <= 0 && min !== 0) {
                clearInterval(idsec)
                idmin = setInterval(() => {
                    setMin((prev) => prev - 1)
                    if (min <= 0) {
                        clearInterval(idmin);
                    }
                    else {
                        setSec(60);
                    }
                }, 1000)
            }
            if (min === 0 && hr !== 0) {
                idhr = setInterval(() => {
                    setHr((prev) => prev - 1)
                    if (hr === 0) {
                        clearInterval(idhr);
                    }
                    else {
                        setMin(60)
                    }
                }, 1000)
            }
            if (hr === 0) {
                clearInterval(idhr)
            }
            if (hr === 0 && min === 0 && sec === 0) {
                clearInterval(idhr)
                clearInterval(idmin);
                clearInterval(idsec);
            }
        }
        else {
            clearInterval(idsec);
            clearInterval(idmin);
            clearInterval(idhr);
        }

        return () => {
            clearInterval(idsec);
            clearInterval(idmin);
            clearInterval(idhr);
        }

    }, [hr, min, sec, timeOn])

    const startTimer = () => {
        setTimeOn(true);
    }

    const resetTimer = () => {
        setHr(0);
        setMin(0);
        setSec(0);
        setTimeOn(false)
    }

    const stopTimer = () => {
        setTimeOn(false)
    }

    return {sec,min,hr,setSec,setMin,setHr,startTimer,stopTimer,resetTimer}
}