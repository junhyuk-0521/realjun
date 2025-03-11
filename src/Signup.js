"use client"

import { useState } from "react"
import "./App.css"

function Signup({ navigateTo, handleSignup }) {
  const [userData, setUserData] = useState({
    userId: "",
    password: "",
    name: "",
    birthday: "",
    mobile: "",
  })
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData({
      ...userData,
      [name]: value,
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    // Simple validation
    if (!userData.userId || !userData.password || !userData.name || !userData.birthday || !userData.mobile) {
      setError("Please fill in all fields")
      return
    }

    const success = handleSignup(userData)
    if (success) {
      alert("Sign up successful! Please log in.")
      navigateTo("login")
    } else {
      setError("Failed to sign up. Please try again.")
    }
  }

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>User ID:</label>
          <input
            type="text"
            name="userId"
            value={userData.userId}
            onChange={handleChange}
            placeholder="Enter user ID"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={userData.name} onChange={handleChange} placeholder="Enter your name" />
        </div>
        <div className="form-group">
          <label>Birthday:</label>
          <input type="date" name="birthday" value={userData.birthday} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Mobile:</label>
          <input
            type="tel"
            name="mobile"
            value={userData.mobile}
            onChange={handleChange}
            placeholder="Enter mobile number"
          />
        </div>
        <div className="form-actions">
          <button type="submit">Sign Up</button>
          <button type="button" onClick={() => navigateTo("home")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default Signup

