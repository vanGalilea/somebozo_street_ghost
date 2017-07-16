import React, { PureComponent } from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import { connect } from 'react-redux'
import createPhoto from './actions/photos/create'
import Dropzone from 'react-dropzone'
import request from 'superagent'

const CLOUDINARY_UPLOAD_PRESET = 'ap5kb82h'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dqmqi1nxq/upload'

export class DropPhotos extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      uploadedFileCloudinaryUrl: ''
    }
  }

  onImageDrop(files) {
    this.setState({ uploadedFile: files[0] })
    this.handleImageUpload(files[0])
  }

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file)

    upload.end((err, response) => {
      const responseUrl = response.body.secure_url
      if (err) console.error(err)
      if (responseUrl !== '') {
        this.setState({ uploadedFileCloudinaryUrl: responseUrl })
        this.props.createPhoto({url: responseUrl})
      }
    })
  }

  render() {

    return(
      <Dropzone
        multiple={false}
        accept="image/*"
        onDrop={this.onImageDrop.bind(this)}>
        <p>Drop an image or click to select a file to upload.</p>
      </Dropzone>
   )
 }
}


export default connect(null, { createPhoto })(DropPhotos)
