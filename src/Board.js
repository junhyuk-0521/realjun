"use client"

import { useState } from "react"
import "./App.css"

function Board({ navigateTo, posts, currentUser, isLoggedIn, handleAddPost }) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewPost({
      ...newPost,
      [name]: value,
    })
  }

  const submitPost = (e) => {
    e.preventDefault()
    if (!isLoggedIn) {
      alert("Please log in to create a post")
      navigateTo("login")
      return
    }

    if (!newPost.title) {
      alert("Please enter a title for your post")
      return
    }

    handleAddPost({
      userId: currentUser.userId,
      title: newPost.title,
      authorName: currentUser.name,
      content: newPost.content,
    })

    setNewPost({ title: "", content: "" })
    setShowAddForm(false)
  }

  const viewPostDetails = (post) => {
    setSelectedPost(post)
  }

  const closePostDetails = () => {
    setSelectedPost(null)
  }

  return (
    <div className="board-container">
      <h2>Board</h2>
      <div className="board-actions">
        <button onClick={() => navigateTo("home")}>Back to Home</button>
        <button onClick={() => setShowAddForm(!showAddForm)}>{showAddForm ? "Cancel" : "Create New Post"}</button>
      </div>

      {showAddForm && (
        <div className="post-form">
          <h3>Create New Post</h3>
          <form onSubmit={submitPost}>
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={newPost.title}
                onChange={handleChange}
                placeholder="Enter post title"
              />
            </div>
            <div className="form-group">
              <label>Content:</label>
              <textarea
                name="content"
                value={newPost.content}
                onChange={handleChange}
                placeholder="Enter post content"
                rows="5"
              />
            </div>
            <button type="submit">Submit Post</button>
          </form>
        </div>
      )}

      {selectedPost && (
        <div className="post-details-modal">
          <div className="post-details-content">
            <h3>{selectedPost.title}</h3>
            <div className="post-info">
              <p>
                <strong>Author:</strong> {selectedPost.authorName} ({selectedPost.userId})
              </p>
              <p>
                <strong>Date:</strong> {selectedPost.date}
              </p>
              <p>
                <strong>Views:</strong> {selectedPost.views}
              </p>
            </div>
            <div className="post-content">
              <p>{selectedPost.content || "No content available for this post."}</p>
            </div>
            <button onClick={closePostDetails}>Close</button>
          </div>
        </div>
      )}

      <div className="posts-table">
        <table>
          <thead>
            <tr>
              <th>Author ID</th>
              <th>Title</th>
              <th>Author Name</th>
              <th>Date</th>
              <th>Views</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} onClick={() => viewPostDetails(post)} className="post-row">
                <td>{post.userId}</td>
                <td>{post.title}</td>
                <td>{post.authorName}</td>
                <td>{post.date}</td>
                <td>{post.views}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Board

