import React, {useState} from 'react'
import {supabase} from '../client' 
import {Link} from 'react-router-dom'

const SignUp = () => {

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  })

  console.log(formData)

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      }
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName
          }
        }
      })
      if(error) throw error
      alert('Check your email for the verification link!')

    } catch (error) {
        alert(error)
    }
  }

  return (
    <div>
      <form onSubmit = {handleSubmit}>
        <input 
          placeholder = "Fullname"
          name = "fullName"
          onChange = {handleChange}
        />
        <input 
          placeholder = "Email"
          name = "email"
          onChange = {handleChange}
        />
        <input 
          placeholder = "Password"
          name = "password"
          type = "password"
          onChange = {handleChange}
        />
        <button type = "submit">Submit</button>
      </form>
      Already have an account?<Link to = '/'>Login here.</Link>
    </div>
  )
}

export default SignUp