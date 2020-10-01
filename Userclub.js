import React ,{useState,useEffect} from 'react';
import axios from "axios"
import { Redirect } from 'react-router-dom';
export function Userclub(props) {
    
const authtoken=localStorage.getItem('authToken');


    useEffect(() => {
    if(authtoken){

    
    const token = localStorage.getItem('authToken');
    
    console.log(token)
    console.log(props)
    axios.get(`http://localhost:9000/3idiotsclub_server/${props.match.params.username}`,{
        headers:{
            Authorization: "Bearer"+" "+token
        }
    })
    .then(res=>{
        console.log(res.data)
        localStorage.setItem('username',res.data.Username)
       
    })
}else{
    
    window.location="/"

}
});

return (

   <div>
        <h1>hello bros</h1>
   </div>
)
}

    

        
   

