"use client"

import { useState } from "react"
import "./App.css"
import Home from "./Home"
import Login from "./Login"
import Signup from "./Signup"
import Board from "./Board"

function App() {
  const [currentPage, setCurrentPage] = useState("home")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([
    {
      id: 1,
      userId: "admin",
      title: "첫 번째 게시물",
      authorName: "관리자",
      date: "2025-03-11",
      views: 15,
      content: "이것은 첫 번째 게시물의 내용입니다. 게시판 기능을 테스트하기 위한 샘플 게시물입니다.",
    },
    {
      id: 2,
      userId: "user1",
      title: "안녕하세요",
      authorName: "사용자1",
      date: "2025-03-10",
      views: 8,
      content: "안녕하세요! 반갑습니다. 이 게시판에서 다양한 주제에 대해 이야기해봐요.",
    },
  ])

  const navigateTo = (page) => {
    setCurrentPage(page)
  }

  const handleLogin = (userId, password) => {
    const user = users.find((u) => u.userId === userId && u.password === password)
    if (user) {
      setCurrentUser(user)
      setIsLoggedIn(true)
      navigateTo("home")
      return true
    }
    return false
  }

  const handleSignup = (userData) => {
    setUsers([...users, userData])
    return true
  }

  const handleAddPost = (postData) => {
    const newPost = {
      id: posts.length + 1,
      ...postData,
      date: new Date().toISOString().split("T")[0],
      views: 0,
    }
    setPosts([...posts, newPost])
    navigateTo("board")
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setIsLoggedIn(false)
    navigateTo("home")
  }

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home navigateTo={navigateTo} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      case "login":
        return <Login navigateTo={navigateTo} handleLogin={handleLogin} />
      case "signup":
        return <Signup navigateTo={navigateTo} handleSignup={handleSignup} />
      case "board":
        return (
          <Board
            navigateTo={navigateTo}
            posts={posts}
            currentUser={currentUser}
            isLoggedIn={isLoggedIn}
            handleAddPost={handleAddPost}
          />
        )
      default:
        return <Home navigateTo={navigateTo} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
    }
  }

  return <div className="App">{renderPage()}</div>
}

export default App

