import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    inputName: '',
    inputComment: '',
    commentsList: [],
  }

  onChangeInputName = event => {
    this.setState({
      inputName: event.target.value,
    })
  }

  onChangeInputComment = event => {
    this.setState({
      inputComment: event.target.value,
    })
  }

  onDeleteComment = commentId => {
    const {commentsList} = this.state
    this.setState({
      commentsList: commentsList.filter(
        eachComment => eachComment.id !== commentId,
      ),
    })
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  onAddComment = event => {
    event.preventDefault()
    const {inputName, inputComment} = this.state

    const initialBackgroundClassNames = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.floor(Math.random() * initialContainerBackgroundClassNames.length)
      ]
    }`

    const newComment = {
      id: uuidv4(),
      name: inputName,
      comment: inputComment,
      date: new Date(),
      isLiked: false,
      initClassName: initialBackgroundClassNames,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      inputName: '',
      inputComment: '',
    }))
  }

  render() {
    const {inputName, inputComment, commentsList} = this.state

    return (
      <div className="app-container">
        <div className="comments-input-container">
          <h1 className="app-heading">Comments</h1>

          <div className="comment-form">
            <form className="form" onSubmit={this.onAddComment}>
              <p className="form-info">Say something about 4.0 Technologies</p>
              <input
                type="text"
                value={inputName}
                placeholder="Your Name"
                className="name-input"
                onChange={this.onChangeInputName}
              />
              <textarea
                className="comment-input"
                value={inputComment}
                onChange={this.onChangeInputComment}
                rows="6"
                placeholder="Your Comment"
              />
              <button className="button" type="submit">
                Add Comment
              </button>
            </form>
            <img
              className="image"
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
            />
          </div>

          <hr className="line" />
          <p className="sub-heading">
            <span className="comment-count">{commentsList.length}</span>{' '}
            Comments
          </p>
          <ul className="comments-container">
            {commentsList.map(eachComment => (
              <CommentItem
                key={eachComment.id}
                commentItemDetails={eachComment}
                toggleIsLiked={this.toggleIsLiked}
                onDeleteComment={this.onDeleteComment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
