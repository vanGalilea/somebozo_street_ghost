import React, { PureComponent } from 'react'
import TextField from 'material-ui/TextField'
import { connect } from 'react-redux'
import createPhoto from './actions/photos/create'
import Avatar from 'material-ui/Avatar'
import {List, ListItem} from 'material-ui/List'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Done from 'material-ui/svg-icons/action/done'
import cleanUploadedPhotos from './actions/photos/cleanUploadedPhotos'

const style = {
  marginRight: 20,
}

export class AddPhotoInfo extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      originalTitle: '',
      original: '',
      thumbnail: '',
      description: '',
      currentPhoto: 0,
    }
  }

  handleTitleChange(event) {
    event.preventDefault()
    this.setState({ originalTitle: event.target.value })
  }

  handleDescriptionChange(event) {
    event.preventDefault()
    this.setState({ description: event.target.value })
  }

  handleSubmitAndNext(event) {
    event.preventDefault()
    const { originalTitle, description, currentPhoto } = this.state
    const {tempUploadedPhotos} = this.props
    const original = tempUploadedPhotos[currentPhoto].original
    const thumbnail = 'http://res.cloudinary.com/dqmqi1nxq/image/upload/c_scale,w_150/' + original.substring(61)
    const newPhoto = { originalTitle, original, thumbnail, description }

    this.props.createPhoto(newPhoto)
    tempUploadedPhotos.length === currentPhoto + 1 ?
    this.props.cleanUploadedPhotos() :
    this.setState({
      originalTitle: '',
      original: '',
      thumbnail: '',
      description: '',
      currentPhoto: currentPhoto + 1
    })
  }

  renderFormContainer(photo) {
    return (
      <List>
        <ListItem
          primaryText={
            <TextField
              hintText="Title of the Photo"
              errorText={this.state.originalTitle.length === 0 ? "You have to fill in a title" : null }
              floatingLabelText="Title"
              ref="title"
              onChange={this.handleTitleChange.bind(this)}
              value={this.state.originalTitle}
            />
          }
          secondaryText={
            <TextField
              hintText="Few words about this photo"
              floatingLabelText="Description"
              multiLine={true}
              rows={2}
              ref="description"
              onChange={this.handleDescriptionChange.bind(this)}
              value={this.state.description}
            />
          }
          leftAvatar={<Avatar src={photo.original} />}
        />
      </List>
    )
  }

  render() {
    const {tempUploadedPhotos} = this.props
    const {currentPhoto} = this.state
    if (!tempUploadedPhotos || !tempUploadedPhotos[currentPhoto]) return <p>All photos have been uploaded succefully, hit Next</p>

    return(
      <div>
        {this.renderFormContainer(tempUploadedPhotos[currentPhoto])}

        <FloatingActionButton onClick={this.handleSubmitAndNext.bind(this)}mini={true} style={style}>
          <Done />
        </FloatingActionButton>
      </div>
    )
  }
}

const mapStateToProps = ({ tempUploadedPhotos }) => ({ tempUploadedPhotos })

export default connect(mapStateToProps, { createPhoto, cleanUploadedPhotos })(AddPhotoInfo)
