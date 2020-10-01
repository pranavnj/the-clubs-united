import React from 'react';

import { Loginreg } from './LoginReg';
export function Thecheckercmp() {
    const uname = localStorage.getItem('username')
    if(uname){
      const url=`/${uname}`;
       window.location=url
    }
    else{
       return<Loginreg/>
            
         
    }
}
