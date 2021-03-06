import {
  CREATE_NEW_POST,
  FETCH_POST_COMMENTS,
  TOGGLE_VOTE,
  UPDATE_POST,
  VOTE_COMMENT,
  VOTE_REPLY,
  ADD_COMMENT,
  ADD_REPLY,
  EDIT_COMMENT,
  DELETE_COMMENT,
  EDIT_REPLY,
  DELETE_REPLY,
  SORT_COMMENTS,
} from '../types/postCommentsType';

const postPageReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_POST_COMMENTS:
      return action.payload;
    case CREATE_NEW_POST:
      return action.payload;
    case UPDATE_POST:
      return action.payload;
    case TOGGLE_VOTE:
      return { ...state, ...action.payload };
    case VOTE_COMMENT:
      return {
        ...state,
        comments: state.comments.map((c) =>
          c.id !== action.payload.commentId
            ? c
            : { ...c, ...action.payload.data }
        ),
      };
    case VOTE_REPLY:
      return {
        ...state,
        comments: state.comments.map((c) =>
          c.id !== action.payload.commentId
            ? c
            : {
                ...c,
                replies: c.replies.map((r) =>
                  r.id !== action.payload.replyId
                    ? r
                    : { ...r, ...action.payload.data }
                ),
              }
        ),
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    case ADD_REPLY:
      return {
        ...state,
        comments: state.comments.map((c) =>
          c.id !== action.payload.commentId
            ? c
            : { ...c, replies: [...c.replies, action.payload.addedReply] }
        ),
      };
    case EDIT_COMMENT:
      return {
        ...state,
        comments: state.comments.map((c) =>
          c.id !== action.payload.commentId
            ? c
            : { ...c, ...action.payload.data }
        ),
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter((c) => c.id !== action.payload),
      };
    case EDIT_REPLY:
      return {
        ...state,
        comments: state.comments.map((c) =>
          c.id !== action.payload.commentId
            ? c
            : {
                ...c,
                replies: c.replies.map((r) =>
                  r.id !== action.payload.replyId
                    ? r
                    : { ...r, ...action.payload.data }
                ),
              }
        ),
      };
    case DELETE_REPLY:
      return {
        ...state,
        comments: state.comments.map((c) =>
          c.id !== action.payload.commentId
            ? c
            : {
                ...c,
                replies: c.replies.filter(
                  (r) => r.id !== action.payload.replyId
                ),
              }
        ),
      };
    case SORT_COMMENTS:
      return {
        ...state,
        comments: state.comments.sort((a, b) => {
          switch (action.payload) {
            case 'new':
              return new Date(b.createdAt) - new Date(a.createdAt);
            case 'upvoted':
              return b.pointsCount - a.pointsCount;
            case 'downvoted':
              return a.pointsCount - b.pointsCount;
            case 'replied':
              return b.replies.length - a.replies.length;
            default:
              return new Date(a.createdAt) - new Date(b.createdAt);
          }
        }),
      };
    default:
      return state;
  }
};

export default postPageReducer;
