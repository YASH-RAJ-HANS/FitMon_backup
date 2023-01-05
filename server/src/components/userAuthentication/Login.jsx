import {React, useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'; 


const Login = ({history}) => {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState(false)
    const [loading,setLoading] = useState(false)
    const [login,setLogin] = useState(false)
    let navigate = useNavigate()

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");

        if(userInfo) {
            navigate("/home")
        }
    },[login])

    const submitHandler = async (e) => {

        e.preventDefault();

        try{
            const config = {
                headers: {
                    "Content-type":"application/json"
                }
            }

            setLoading(true)


            const {data} = await axios.post('http://localhost:5000/api/user/login',{
                email,password
            },config)

            console.log(data.email)

            localStorage.setItem('userEmail',data.email)
            localStorage.setItem('userInfo',JSON.stringify(data));
            setLoading(false)
        }catch(error){
            setError(error.response.data.message)
            console.log(error.response.data.message)
        }
    }

  return (
    <div className="login-container">
      <div className="left-col">
        <div className="form-container">
          <Link to="/home">HOME</Link>
        </div>
      </div>
      <div className="right-col"></div>
    </div>
  )
}

export default Login