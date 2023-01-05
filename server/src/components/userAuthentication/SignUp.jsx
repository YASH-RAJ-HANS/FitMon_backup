import {React, useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'; 



const SignUp = () => {

   const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [name,setName] = useState("")
    const [age,setAge] = useState(0)
    const [height,setHeight] = useState(0)
    const [weight,setWeight] = useState(0)
    const [reffralCode,setRefferalCode] = useState("")
    const [gender,setGender] = useState("")
    const [mobileNumber,setMobileNumber] = useState(0)
    const [error,setError] = useState(false)
    const [loading,setLoading] = useState(false)

    const submitHandler = async (e) => {
      e.preventDefault()
    try{

      const config = {
        headers: {
            "Content-type":"application/json"
        }
    };

    const {data} = await axios.post("http://localhost:5000/api/user/register",{
      name,email,password,age,height,reffralCode,weight,gender,mobileNumber
    },config)

    console.log(data)

    }catch(error) {
      setError(error.response.data.message)
      console.log(error.response.data.message)
    }

    }

  return (
    
    <div className="container">
      
    </div>

  )
}

export default SignUp