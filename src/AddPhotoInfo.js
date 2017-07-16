import React, { PureComponent } from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Toggle from 'material-ui/Toggle'
import TextField from 'material-ui/TextField'
import { connect } from 'react-redux'
import uploadedPhotos from './actions/uploadedPhotos'
import MobileTearSheet from './MobileTearSheet';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

const ListExampleChat = () => (
  <MobileTearSheet>
    <List>
      <Subheader>Recent chats</Subheader>
      <ListItem
        primaryText="Brendan Lim"
        leftAvatar={<Avatar src="images/ok-128.jpg" />}
        rightIcon={<CommunicationChatBubble />}
      />
    </List>
  </MobileTearSheet>
);




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

export class AddPhotoInfo extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      url: '',
      featured: false,
    }
  }

  renderFormContainer(photo) {
    return (
      <div>
      <MobileTearSheet>
        <List>
          <Subheader>Photos added succefully</Subheader>
          <ListItem
            primaryText={
              <TextField
                hintText="Title of the Photo"
                errorText="You have to fill in a title"
                floatingLabelText="Title"
              />
            }

            leftAvatar={<Avatar src={photo.url} />}
            rightIcon={<CommunicationChatBubble />}
          />
        </List>
      </MobileTearSheet>



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
      </div>
    )
  }

  render() {
    const {tempUploadedPhotos} = this.props
    if (!tempUploadedPhotos) return null

    return(
      <div>
        {tempUploadedPhotos.map((photo)=> this.renderFormContainer(photo))}
      </div>
    )
  }
}

const mapStateToProps = ({ tempUploadedPhotos }) => ({ tempUploadedPhotos })

export default connect(mapStateToProps, { uploadedPhotos })(AddPhotoInfo)
