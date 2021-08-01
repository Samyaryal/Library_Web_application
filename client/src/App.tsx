import React from 'react';
import GoogleLogin from 'react-google-login'
import axios from 'axios'
import './App.css';


function App() {
  const handleGoogleResponse = async (response: any) =>{
    console.log("response from google", response)
    const {data} = await axios.post('http://localhost:3000/api/v1/users/login',{
      id_token: response.tokenId 
    })
    await axios.get(
      'http://localhost:3000/api/v1/users', 
      {headers: {Authorization: `Bearer ${data.token}`},
    })
  }
  return (
    <>
     <GoogleLogin
    clientId="203684487477-1vkl0pfr9ldik27thcoljcopnghdphsj.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={handleGoogleResponse}
    onFailure={handleGoogleResponse}
    cookiePolicy={'single_host_origin'}
  />
    </>
  );
}

export default App;
