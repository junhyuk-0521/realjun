"use client"

import { useState } from "react"
import "./App.css"

function Login({ navigateTo, handleLogin }) {
  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const onSubmit = (e) => {
    e.preventDefault()
    if (!userId || !password) {
      setError("Please enter both user ID and password")
      return
    }

    const success = handleLogin(userId, password)
    if (!success) {
      setError("Invalid user ID or password")
    }
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>User ID:</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter your user ID"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <div className="form-actions">
          <button type="submit">Login</button>
          <button type="button" onClick={() => navigateTo("home")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login

