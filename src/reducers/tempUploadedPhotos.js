import { UPLOADED_PHOTOS } from '../actions/photos/uploadedPhotos'
import { CLEAN_UPLOADED_PHOTOS } from '../actions/photos/cleanUploadedPhotos'

export default (state = [], { type, payload } = {}) => {
  switch(type) {
    case UPLOADED_PHOTOS :
      return state.concat({ ...payload })
    case CLEAN_UPLOADED_PHOTOS :
      return state = []
    default :
      return state
  }
}
