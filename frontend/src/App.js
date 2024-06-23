import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/hello/')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error("There was an error making the request:", error);
      });
  }, []);

  return (
    <div>
 
   
        <p className="text-2xl">Welcome!</p>

        <div>
        <h1>{message}</h1>
   </div>
   </div> 
  
   
  );
}

export default App;