import React, { useState } from 'react'
import {SignIn, SignUp} from '../api/auth/auth'
import {useNavigate} from 'react-router-dom';
function Login() {
  const [showSignup, setShowSignup] = useState(false)
  const [message, setMessage] = useState("")
  const [success,setSuccess]=useState("")
  const navigate=useNavigate();

    const redirectUrl=()=>{
        if(localStorage.getItem('email')){
        navigate('/dashboard')
        }
        else navigate('/')
    }

  const toggleSignup=()=>{
    setShowSignup(!showSignup)
  }

  const signupFn=(e)=>{
    const username=document.getElementById('username').value
    const email=document.getElementById('email').value
    const password=document.getElementById('password').value
    const confirmPassword=document.getElementById('confirmPassword').value
    const data={
      username:username,
      email:email,
      password:password,
      confirmPassword:confirmPassword
    }

    e.preventDefault();
    SignUp(data).then(function (response) {
        console.log(response)
        setShowSignup(!showSignup)
        setSuccess("Sign Up successfully please Log In....")
    }).catch(function (error) {
        console.log(error.response.data.message)
        if (error.response.status === 400)
            setMessage(error.response.data)
        else
            setMessage(error.response.data.message)
    })
  }

  const signUpContent = () => {
    return (
        <div>
            <h4 className="text-center">Signup</h4><br/>
            <form onSubmit={signupFn}>

                <div>
                    <input type="text" className="form-control" placeholder="Username" id="username" required />
                </div><br/>
                <div>
                <input type="email" className="form-control" placeholder="Email"  id="email" required />
                </div><br/>
                <div className="input-group">
                    <input type="password" className="form-control" placeholder="Password" id="password" required />
                </div><br/>
                <div className="input-group">
                    <input type="password" className="form-control" placeholder="conformPassword" id="confirmPassword" required />
                </div><br/>

                <div className="input-group m-1">
                    <input type="submit" className="form-control btn btn-primary m-1" value="Sign up" />
                </div><br/>
                <p className='text-center text-danger'>(Password at least one lowercase, uppercase, digit, and special character)</p>
                <div className="signup-btn text-center text-info"  onClick={toggleSignup}>Already have an Account ? Login</div><br/>
                <div className="auth-error-msg text-danger text-center">{message.message}</div>
            </form>
        </div>
    )
}



const loginFn=async(e)=>{
    e.preventDefault();
  const email=document.getElementById("email").value
  const password=document.getElementById("password").value
  const data={
    "email":email,
    "password":password
  }

  try {
    const result = await SignIn(data)
    console.log("Login result", result)
    if (result.status === 200){
            setSuccess("Login Successful")
            redirectUrl()
    }
    else
        console.log("Something went wrong")
    } catch (error) {
    console.log("error",error)
    if (error.response && error.response.status === 401)
        setMessage(error.response.data.message)
    else
    console.log(error.response.data.message)
    setMessage(error.response.data.message)
    }
}


const loginContent = () => {
  return (
      <div >
         
          <h4 className="text-center">Login</h4><br/>
          <form onSubmit={loginFn}>
              <div className="input-group m-1">
                  <input type="text" className="form-control" placeholder="email" id="email" required />
              </div><br></br>
              <div className="input-group m-1">
                  <input type="password" className="form-control" placeholder="Password" id="password" required />
              </div><br></br>

              <div className="input-group m-1">
                  <input type="submit" className="form-control btn btn-primary"  />
              </div><br></br>
              <div className="signup-btn text-center  text-info" onClick={toggleSignup} >Dont have an Account ? Signup</div><br/>
              <div className="auth-error-msg text-danger text-center">{message}</div>
          </form>
      </div>
  )
}


return(
  <div id='loginPage'>
    <div id='loginPage' className='bg-danger d-flex justify-content-center align-items-center vh-100'>
      <div className='card m-5 p-5'>
        <div className='row m-2 '>
          <div className='col'>
            {
              showSignup
              ?signUpContent()
              :loginContent()
            }
          </div>
        </div>
      </div>
    </div>
  </div>
)


}

export default Login;