import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {commentItemDetails, toggleIsLiked, onDeleteComment} = props
  const {id, name, comment, isLiked, initClassName, date} = commentItemDetails
  const initial = name ? name[0].toUpperCase() : ''
  const likeTextClassName = isLiked ? 'buttons active' : 'buttons'

  const likeImageUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  const postedTime = formatDistanceToNow(date, {addSuffix: true})

  const onClickLike = () => {
    toggleIsLiked(id)
  }

  const onDeleteComments = () => {
    onDeleteComment(id)
  }

  return (
    <li className="comment-item">
      <div className="comment-container">
        <div className={initClassName}>
          <p className="initial">{initial}</p>
        </div>
        <div>
          <div className="username-container">
            <p className="username">{name}</p>
            <p className="time">{postedTime}</p>
          </div>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="buttons-container">
        <button
          className={likeTextClassName}
          type="button"
          onClick={onClickLike}
          data-testid="like"
        >
          <img src={likeImageUrl} alt="like" className="toggle-image" />
          Like
        </button>

        <button
          className="button"
          type="button"
          onClick={onDeleteComments}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="toggle-images"
          />
        </button>
      </div>
      <hr className="comment-line" />
    </li>
  )
}

export default CommentItem
