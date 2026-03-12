import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError,handleSuccess} from '../utils'
import { useNavigate } from 'react-router-dom'
const Signup = () => {

        const [signupInfo, setSignupInfo] = useState({
            name: '',
            email: '',
            password: ''
        });

        const handleChange = (e) =>{
            const {name, value} = e.target;
            const copysingupInfo = {...signupInfo};
            copysingupInfo[name] = value;
            setSignupInfo(copysingupInfo);
           
        }

        

        const navigate = useNavigate();

        const handleSignup = async (e) =>{
            e.preventDefault(); 

            const {name, email, password} = signupInfo;

            if(!name || !email || !password){

                return handleError("All fields are required");  
            }

            try{

                const url = "mongodb+srv://sparshkashyap655_db_user:OJeMny4BpyualqyH@cluster0.2lop80s.mongodb.net/?appName=Cluster0";
                const response = await fetch(url,{
                    method : "POST",
                    headers: {
                        "Content-Type" :"application/json"
                    },
                    body : JSON.stringify(signupInfo)
                    });
    

                    const res = await response.json();
                   
                    const {message,success} = res;

                   
                    

                    if(success){
                        handleSuccess(message);
                        setTimeout(() =>{
                            navigate("/login");
                        },1000);
                    }
              
                    else if(message){
                        
                        const errormessage = message;
                        handleError(errormessage);
                    }
                    else if(!success){
                        const errormessage = message;
                        handleError(errormessage);
                    }
    
            }catch(err){

                 console.error("Signup failed:", err);

            }

        }

  return (
    <div className='container'>
        <h1 className='signup'>Signup</h1>
        <form className='form' onSubmit={handleSignup} action="/signup" method="POST"   >
            <div>
                <label htmlFor="name">Name</label>
                    <input  onChange={handleChange}  value={signupInfo.name} type="text" name='name' autoFocus placeholder='Enter your name....' />
                
            </div>
            <div>
                <label htmlFor="email">Email</label>
                    <input  onChange={handleChange}  value={signupInfo.email} type="email" name='email' placeholder='Enter your email....' />
            
            </div>
            <div>
                <label htmlFor="password">Password</label>
                    <input  onChange={handleChange}  value={signupInfo.password} type="password" name='password' placeholder='Enter your password....' />
                    
            </div>
            <button type='submit'>Signup</button>
            <span>Already have an account ?
                <Link to="/login">Login</Link>
            </span>
        </form>
        <ToastContainer/>
    </div>
  )
}

export default Signup
