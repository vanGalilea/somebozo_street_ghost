import React, { PureComponent } from 'react'
import Toggle from 'material-ui/Toggle'
import TextField from 'material-ui/TextField'
import { connect } from 'react-redux'
import createPhoto from './actions/photos/create'
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Done from 'material-ui/svg-icons/action/done';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

const styles = {
  block: {
    maxWidth: 50,
    marginRight: 60,
  },
  toggle: {
    marginBottom: 16,
  }
}

const style = {
  marginRight: 20,
}


export class AddPhotoInfo extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      url: '',
      description: '',
      featured: false,
      currentPhoto: 0,
    }
  }

  handleTitleChange(event) {
    event.preventDefault()
    this.setState({ title: event.target.value })
  }

  handleDescriptionChange(event) {
    event.preventDefault()
    this.setState({ description: event.target.value })
  }

  handleFeaturedToggle(event) {
    event.preventDefault()
    this.setState({ featured: !this.state.featured })
  }

  handleSubmitAndNext(event) {
    event.preventDefault()
    const {tempUploadedPhotos} = this.props
    const { title, description, featured, currentPhoto } = this.state
    const newPhoto = { title, url: tempUploadedPhotos[currentPhoto].url, description, featured }

    debugger
    this.props.createPhoto(newPhoto)

    this.setState({
      title: '',
      url: '',
      description: '',
      featured: false,
      currentPhoto: currentPhoto + 1
    })

    // tempUploadedPhotos.length === currentPhoto + 1 ? clean uploadedPhotos from store to []
  }

  renderFormContainer(photo) {
    return (
      <List>
        <Subheader>Photos added succefully</Subheader>
        <ListItem
          primaryText={
            <div>
              <TextField
                hintText="Title of the Photo"
                errorText="You have to fill in a title"
                floatingLabelText="Title"
                ref="title"
                onChange={this.handleTitleChange.bind(this)}
              />
            </div>
          }
          secondaryText={
            <TextField
              hintText="Few words about this photo"
              floatingLabelText="Description"
              multiLine={true}
              rows={2}
              ref="description"
              onChange={this.handleDescriptionChange.bind(this)}
            />
          }
          rightToggle={
            <div style={styles.block}>
              <Toggle
                label="Featured"
                defaultToggled={true}
                style={styles.toggle}
              />
            </div>

          }
          leftAvatar={<Avatar src={photo.url} />}
        />
      </List>
    )
  }

  render() {
    const {tempUploadedPhotos} = this.props
    const {currentPhoto} = this.state
    if (!tempUploadedPhotos || !tempUploadedPhotos[currentPhoto]) return null

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

export default connect(mapStateToProps, { createPhoto })(AddPhotoInfo)
