export const UPLOADED_PHOTOS = 'UPLOADED_PHOTOS'

export default (photos) => {
  return (dispatch) => {
    dispatch({
     type: UPLOADED_PHOTOS,
     payload: photos
   })
  }
}
