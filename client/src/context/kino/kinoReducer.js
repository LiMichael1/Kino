import {
  KINO,
  REVIEW,
  NO_REVIEW,
  RATING,
  NO_RATING,
  KINO_REVIEWS,
  NO_KINO_REVIEWS,
  REVIEW_LOADING,
  REVIEW_DONE_LOADING,
  SUBMIT_REVIEW_SUCCESS,
  LOADING,
} from '../types';

const reducer = (state, action) => {
  switch (action.type) {
    case KINO:
      return {
        ...state,
        kino: action.payload,
        loading: false,
      };

    case REVIEW:
      return {
        ...state,
        userReview: action.payload,
        userHasReview: true,
      };

    case NO_REVIEW:
      return {
        ...state,
        userReview: {},
        userHasReview: false,
      };

    case RATING:
      return {
        ...state,
        kinoRating: action.payload,
      };

    case NO_RATING:
      return {
        ...state,
        kinoRating: 0,
      };

    case KINO_REVIEWS:
      return {
        ...state,
        kinoReviews: action.payload,
      };

    case NO_KINO_REVIEWS:
      return {
        ...state,
        kinoReviews: [],
      };

    case REVIEW_LOADING:
      return {
        ...state,
        userReviewLoading: true,
      };

    case REVIEW_DONE_LOADING:
      return {
        ...state,
        userReviewLoading: false,
      };

    case SUBMIT_REVIEW_SUCCESS:
      return {
        ...state,
        userReview: action.payload,
        userHasReview: true,
      };

    case LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};

export default reducer;
