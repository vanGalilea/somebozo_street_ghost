import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {GridList, GridTile} from 'material-ui/GridList'
import Delete from 'material-ui/svg-icons/action/delete-forever'
import fetchPhotos from './actions/photos/fetch'
import deletePhoto from './actions/photos/delete'
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
    height: 500,
    overflowY: 'auto',
  },
}

const customContentStyle = {

}

export class PhotoGrid extends PureComponent {

  componentWillMount() {
    this.props.fetchPhotos()
  }

  render() {
    const {photos} = this.props

    return(
      <div style={styles.root}>
        <GridList
          cols={2}
          cellHeight={200}
          padding={1}
          style={styles.gridList}
        >
          {photos.map((photo) => (
            <GridTile
              key={photo.original}
              title={photo.originalTitle}
              actionIcon={<IconButton onClick={()=> this.props.deletePhoto(photo._id)}>
                            <Delete color="white"/>
                          </IconButton>}
              actionPosition="right"
              titlePosition="top"
              titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
              cols={1}
              rows={1}
            >
              <img alt="galleryPhoto" src={photo.original} />
            </GridTile>
          ))}
        </GridList>
      </div>
    )
  }
}


const mapStateToProps = ({ photos }) => ({ photos })

export default connect(mapStateToProps, { fetchPhotos, deletePhoto })(PhotoGrid)
