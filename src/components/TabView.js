import React,{useState,useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default function TabView(props){
const [seconds ,setSeconds] = useState(10);
const [minutes ,setMinutes] = useState(0);

useEffect(()=>{
  let timeInterval;
  timeInterval = setInterval(()=>{

    if(seconds >0){
      setSeconds(seconds-1)
    }
    if(seconds === 0){
      if(minutes === 0){
        clearInterval(timeInterval)
      }
      else{
        setMinutes(minutes-1)
        setSeconds(59)
      }
    }

  },1000)
  return ()=>{
    clearInterval(timeInterval)
    };
}

)
return (
    <div>
         <Typography variant="h1" >
         {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </Typography>
          <Typography variant="h5" >
          {minutes === 0 && seconds === 0 ? `Time Up`: ``}
          </Typography>
      
          <Button size="large" variant="contained" color="primary">START</Button>
    </div>
)
}