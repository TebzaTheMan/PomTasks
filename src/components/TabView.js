import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default function TabView(props){
return (
    <div>
         <Typography variant="h1" >
            {props.time}
          </Typography>
          <Button size="large" variant="contained" color="primary" href="#contained-buttons">START</Button>
    </div>
)
}