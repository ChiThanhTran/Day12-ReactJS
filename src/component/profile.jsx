import { React, useEffect, useState } from 'react'
import LoginPage from './login'

export default function ProfilePage( {setButtonContent, isLogined, setIsLogined} ) {
    const [data, setData] = useState()
    useEffect(() => {
       
    console.log(isLogined)
    console.log(localStorage.getItem('userId'))
        fetch(`https://60dff0ba6b689e001788c858.mockapi.io/users/${localStorage.getItem('userId')}`)
        .then(response => {return response.json()})
        .then(data => setData(data))
    }, [isLogined])
    return (
        
        <>
        {isLogined ? 
            <>
            <h3>Profile</h3>
            <h3>Name: {data?.name}</h3>
            <h3>UserID: {data?.id}</h3>
            </>
            :
        <><h4>You need to login to continue</h4>
          <LoginPage setButtonContent={setButtonContent} isLogined={isLogined} setIsLogined={setIsLogined} /> 
        </> 
        }
        </>

        
        
    )
}