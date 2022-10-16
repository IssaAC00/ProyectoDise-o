import React from 'react';
import ReactDOM from 'react-dom';
import  Routes  from './RoutesP';
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns'


ReactDOM.render(
  
  <React.StrictMode>
    <MuiPickersUtilsProvider utils = {DateFnsUtils}>
       <Routes />
    </MuiPickersUtilsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


