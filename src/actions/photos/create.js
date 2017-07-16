import API from '../../api'
import { history } from '../../store'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const CREATE_PHOTO = 'CREATE_PHOTO'

const api = new API()

export default (newPhoto) => {
  return (dispatch) => {
    console.log(newPhoto)
  dispatch({ type: APP_LOADING })

   const backend = api.service('photos')

   backend.create(newPhoto)
     .then((result) => {
       dispatch({ type: LOAD_SUCCESS })
       dispatch({ type: APP_DONE_LOADING })

       dispatch({
         type: CREATE_PHOTO,
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
