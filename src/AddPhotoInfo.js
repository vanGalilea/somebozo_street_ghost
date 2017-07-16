import React, { PureComponent } from 'react'
import Toggle from 'material-ui/Toggle'
import TextField from 'material-ui/TextField'
import { connect } from 'react-redux'
import uploadedPhotos from './actions/uploadedPhotos'
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
      featured: false,
      currentPhoto: 0,
    }
  }

  handleTitleSubmit() {
    
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
              />
            </div>
          }
          secondaryText={
            <TextField
              hintText="Few words about this photo"
              floatingLabelText="Description"
              multiLine={true}
              rows={2}
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
    if (!tempUploadedPhotos) return null

    return(
      <div>
        {this.renderFormContainer(tempUploadedPhotos[currentPhoto])}

        {tempUploadedPhotos.length > currentPhoto + 1 ?
          <FloatingActionButton onClick={()=> this.setState({currentPhoto: currentPhoto + 1})}mini={true} style={style}>
            <Done />
          </FloatingActionButton> :
          null
        }

      </div>
    )
  }
}

const mapStateToProps = ({ tempUploadedPhotos }) => ({ tempUploadedPhotos })

export default connect(mapStateToProps, { uploadedPhotos })(AddPhotoInfo)
