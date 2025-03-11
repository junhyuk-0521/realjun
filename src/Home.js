"use client"
import "./App.css"

function Home({ navigateTo, isLoggedIn, handleLogout }) {
  return (
    <div className="home-container">
      <div className="nav-buttons">
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={() => navigateTo("login")}>Login</button>
        )}
        <button onClick={() => navigateTo("signup")}>Sign up</button>
        <button onClick={() => navigateTo("board")}>Board</button>
      </div>
    </div>
  )
}

export default Home

