import React, { PureComponent } from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Toggle from 'material-ui/Toggle'
import TextField from 'material-ui/TextField'
import { connect } from 'react-redux'
import createPhoto from './actions/photos/create'
import Dropzone from 'react-dropzone'
import request from 'superagent'

const CLOUDINARY_UPLOAD_PRESET = 'ap5kb82h'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dqmqi1nxq/upload'

const styles = {
  block: {
    maxWidth: 200,
  },
  toggle: {
    marginBottom: 16,
  },
  thumbOff: {
    backgroundColor: '#ffcccc',
  },
  trackOff: {
    backgroundColor: '#ff9d9d',
  },
  thumbSwitched: {
    backgroundColor: 'red',
  },
  trackSwitched: {
    backgroundColor: '#ff9d9d',
  },
  labelStyle: {
    color: 'red',
  },
}

export class DropPhotos extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      url: '',
      fearured: false
    }
  }

  onImageDrop(files) {
    files.map((file, i)=> this.handleImageUpload(files[i]))
  }

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file)

    upload.end((err, response) => {
      const responseUrl = response.body.secure_url
      if (err) console.error(err)
      if (responseUrl !== '') {
        this.setState({ url: responseUrl })
      }
    })
  }

  render() {

    return(
      <div>
        <TextField
          hintText="Title of the Photo"
          errorText="You have to fill in a title"
          floatingLabelText="Title"
        /><br />
        <TextField
          hintText="Few words about this photo"
          floatingLabelText="Description"
          multiLine={true}
          rows={2}
        /><br />

        <div style={styles.block}>
          <Toggle
            label="Fetured"
            defaultToggled={true}
            style={styles.toggle}
          />
        </div>

        <Dropzone
          multiple={true}
          accept="image/*"
          onDrop={this.onImageDrop.bind(this)}>
          <p>Drop an image or click to select a file to upload.</p>
        </Dropzone>
      </div>
    )
  }
}


export default connect(null, { createPhoto })(DropPhotos)
