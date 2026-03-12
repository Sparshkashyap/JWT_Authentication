import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

const Home = () => {

    const navigate = useNavigate();

    const [loggedInUser,setloggedInUser] = useState("");
    const [products,setProducts] = useState([]);


    useEffect(() =>{
        const user = localStorage.getItem("LoggedInUser");
        setloggedInUser(user);
    })

    const handleLogout = () =>{
        localStorage.removeItem("token");
        localStorage.removeItem("LoggedInUser");
        handleSuccess("Logout successful");
        setTimeout(() =>{
            navigate("/login");
        },1000);
    }

    const fetchProducts = async () =>{

        const token = localStorage.getItem("token");
        try{

            const url = "mongodb+srv://sparshkashyap655_db_user:OJeMny4BpyualqyH@cluster0.2lop80s.mongodb.net/?appName=Cluster0";
            const headers = {

                headers :{
                    "Authorization" : localStorage.getItem("token")
                }
            }
            const response = await fetch(url, headers);
            const res = await response.json();
            console.log(res);
            setProducts(res);
              
            }catch(error){
              handleError("Error fetching products",error);
            }
        }


    useEffect(() =>{


        fetchProducts();


    },[])

  return (

    <div>
    <h1>{loggedInUser}</h1>
    <button onClick={handleLogout}>Logout</button>
    <div>
        {
           products && products.map((item,index) =>(
               <ul key={index}>
                <span>{item.name} : {item.price}</span>
               </ul>
            ))
        }
    </div>
    <ToastContainer />
    </div>
  )
}

export default Home;
