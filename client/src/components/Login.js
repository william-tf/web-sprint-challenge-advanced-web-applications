import React, {useState} from "react";
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import {axiosWithAuth} from '../utils/axiosWithAuth'
const initialValue = {
    username:'',
    password:''
}


const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
 const [form, setForm] = useState(initialValue)
 const {push} = useHistory()

const login = e => {
  e.preventDefault();
  axiosWithAuth().post('/login', form)
  .then(req => {
    console.log('inside login:', req)
    localStorage.setItem('token', req.data.payload)
    push('/colors')
  })
  .catch(err => console.log('inside login catch:', err))


}

const changes = e =>{
  const name = e.target.name;
  const value = e.target.value
  setForm({
    ...form,
    [name]:value
  })
}


  return (
    <div>
      <form onSubmit={login}>
        <input type="text" name="username" value={form.username} onChange={changes} placeholder="username"/>
        <input type="text" name="password" value={form.password} onChange={changes} placeholder="password"/>
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
