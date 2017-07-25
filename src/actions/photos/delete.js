import API from '../../api'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const PHOTO_DELETED = 'PHOTO_DELETED'

const api = new API()

export default (photoId) => {
  return (dispatch) => {
    console.log(photoId)
  dispatch({ type: APP_LOADING })

   const backend = api.service('photos')

   backend.remove(photoId)
     .then((result) => {
       dispatch({ type: LOAD_SUCCESS })
       dispatch({ type: APP_DONE_LOADING })

       dispatch({
         type: PHOTO_DELETED,
         payload: result
       })
     })
     .catch((error) => {
       dispatch({ type: APP_DONE_LOADING })
       dispatch({
         type: LOAD_ERROR,
         payload: error.message
       })
     })
  }
}
