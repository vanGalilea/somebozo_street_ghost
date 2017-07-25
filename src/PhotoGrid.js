import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {GridList, GridTile} from 'material-ui/GridList'
import Delete from 'material-ui/svg-icons/action/delete-forever'
import fetchPhotos from './actions/photos/fetch'
import deletePhoto from './actions/photos/delete'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 1000,
    overflowY: 'auto',
  },
}

const customContentStyle = {

}

export class PhotoGrid extends PureComponent {
  state = {
    open: false,
    popUpPhoto: {}
  }

  handleClose() {
    this.setState({open: false, popUpPhoto: {}})
  }

  componentWillMount() {
    this.props.fetchPhotos()
  }

  render() {
    const {signedIn, photos} = this.props
    const {popUpPhoto} = this.state
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose.bind(this)}
      />
    ]
    return(
      <div>
        <div style={styles.root}>
          <GridList
            cols={2}
            cellHeight={200}
            padding={1}
            style={styles.gridList}
          >
            {photos.map((photo) => (
              <GridTile
                key={photo.url}
                title={photo.title}
                actionIcon={signedIn ? <IconButton onClick={()=> this.props.deletePhoto(photo._id)}>
                                        <Delete color="white"/>
                                       </IconButton> : null}
                actionPosition="right"
                titlePosition="top"
                titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                cols={photo.featured ? 2 : 1}
                rows={photo.featured ? 2 : 1}
              >
                <img
                  alt="galleryPhoto"
                  src={photo.url}
                  onClick={()=> this.setState({open: true, popUpPhoto: photo})}
                />
              </GridTile>
            ))}
          </GridList>
          <Dialog
            title={popUpPhoto.title}
            actions={actions}
            open={this.state.open}
            onRequestClose={()=> this.handleClose.bind(this)}
            contentStyle={customContentStyle}
            autoScrollBodyContent={true}
          >
            <img alt="popUpPhoto" src={popUpPhoto.url} />
          </Dialog>
        </div>
      </div>
    )
  }
}


const mapStateToProps = ({ currentUser, photos }) => ({
  photos,
  signedIn: !!currentUser && !!currentUser._id
 })

export default connect(mapStateToProps, { fetchPhotos, deletePhoto })(PhotoGrid)
