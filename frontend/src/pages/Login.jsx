import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError,handleSuccess} from '../utils'
import { useNavigate } from 'react-router-dom'
const Login = () => {

        const [loginInfo, setLoginInfo] = useState({
            email: '',
            password: ''
        });

        const handleChange = (e) =>{
            const {name, value} = e.target;
            const copyLoginInfo = {...loginInfo};
            copyLoginInfo[name] = value;
            setLoginInfo(copyLoginInfo);
           
        }

        

        const navigate = useNavigate();

        const handleLogin = async (e) =>{
            e.preventDefault(); 

            const {email, password} = loginInfo;

            if(!email || !password){

                return handleError("All fields are required");  
            }

            try{

                const url = "http://localhost:4000/auth/login";
                const response = await fetch(url,{
                    method : "POST",
                    headers: {
                        "Content-Type" :"application/json"
                    },
                    body : JSON.stringify(loginInfo)
                    });
    

                    const res = await response.json();
                   
                    const {message,success,jwttoken,email,name} = res;


                    if(success){
                        handleSuccess(message);
                        localStorage.setItem("token",jwttoken);
                        localStorage.setItem("LoggedInUser",name);

                        setTimeout(() =>{
                            navigate("/home");
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

                 console.error("Login  failed:", err);

            }

        }

  return (
    <div className='container'>
        <h1 className='signup'>Login</h1>
        <form className='form' onSubmit={handleLogin} action="/signup" method="POST"   >
          
            <div>
                <label htmlFor="email">Email</label>
                    <input  onChange={handleChange}  value={loginInfo.email} type="email" name='email' placeholder='Enter your email....' />
            
            </div>
            <div>
                <label htmlFor="password">Password</label>
                    <input  onChange={handleChange}  value={loginInfo.password} type="password" name='password' placeholder='Enter your password....' />
                    
            </div>
            <button type='submit'>Login</button>
            <span>Don't have an account ?
                <Link to="/signup">Signup</Link>
            </span>
        </form>
        <ToastContainer/>
    </div>
  )
}

export default Login;
