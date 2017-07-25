import { CREATE_PHOTO } from '../actions/photos/create'
import { FETCHED_PHOTOS } from '../actions/photos/fetch'
import { PHOTO_DELETED } from '../actions/photos/delete'

export default (state = [], { type, payload } = {}) => {
  switch(type) {
    case FETCHED_PHOTOS :
     return [ ...payload ]

    case CREATE_PHOTO :
      return state.concat({ ...payload })

    case PHOTO_DELETED :
      return state.filter((photo) => (photo._id !== payload._id))

    default :
      return state
  }
}
