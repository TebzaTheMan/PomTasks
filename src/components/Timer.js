import React,{useState,useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default function Timer(props){
const {initialMinutes = 0} = props;
const [ minutes, setMinutes ] = useState(initialMinutes);
const [seconds ,setSeconds] = useState(0);
const [isOn,setSwitch] = useState(false);
const [isTimeUp,setisTimeUp] = useState(false);
let timerType = initialMinutes === 25 ? "pomodoro" : "shortbreak";

const start=()=>{
setSwitch(true);
};
const stop=()=>{
    setSwitch(false);
}
const reset=()=>{
    setSwitch(true);
    setisTimeUp(false);
    setMinutes(initialMinutes);
    setSeconds(0);
}
const countDown= ()=>{
  let s = seconds < 10 ? `0${seconds}` : seconds;
    if(seconds >0){
        setSeconds(seconds-1)
      }
      if(seconds === 0){
        if(minutes === 0){
          setisTimeUp(true)
          setSwitch(false)
          document.title = "Time Up!"
        }
        else{
          setMinutes(minutes-1)
          setSeconds(59)
        }
      }
     
}
const showButton = ()=>{
    let button ;
    if(isOn){
        button = <Button size="large" variant="contained" color="primary" onClick={stop}>STOP</Button>
      }
      else if(isTimeUp){
        button = <Button size="large" variant="contained" color="primary" onClick={reset}>START</Button>
      }
      else{
       button = <Button size="large" variant="contained" color="primary" onClick={start}>START</Button>
      }
      return button;
}
const updateTitle = ()=> {
  let secs =  seconds < 10 ? `0${seconds}` : seconds;
  if(!isTimeUp){
    if(timerType==="pomodoro"){
      document.title = `${minutes}:${secs} - time to work!`;
     }else if(timerType==="shortbreak"){
       document.title =  `${minutes}:${secs} - time for a break!`;
     }else{
       document.title = `${minutes}:${secs} - time for long break!`;
     }
  }
  else{
    document.title = `${minutes}:${secs} - Time Up!`;
  }

}
useEffect(()=>{
  updateTitle();
    let interval = 0;
    if(isOn){
        interval = setInterval(countDown,1000)
        updateTitle();
    }
    return ()=>{
        clearInterval(interval)
       
    }
} 

)
return (
    <div>
         <Typography variant="h1" >
         {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </Typography>
          <Typography variant="h5" >
          {isTimeUp ? `Time Up!`: ``}
          </Typography>
          {showButton()}
    </div>
)
}