export const CLEAN_UPLOADED_PHOTOS = 'CLEAN_UPLOADED_PHOTOS'

export default () => {
  return (dispatch) => {
    dispatch({
     type: CLEAN_UPLOADED_PHOTOS
   })
  }
}
