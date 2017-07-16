import { UPLOADED_PHOTOS } from '../actions/uploadedPhotos'

export default (state = [], { type, payload } = {}) => {
  switch(type) {
    case UPLOADED_PHOTOS :
    console.log(payload)
     return state.concat({ ...payload })

    default :
      return state
  }
}
