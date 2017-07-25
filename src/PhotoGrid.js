import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {GridList, GridTile} from 'material-ui/GridList'
// import IconButton from 'material-ui/IconButton'
import Delete from 'material-ui/svg-icons/action/delete-forever'
import fetchPhotos from './actions/photos/fetch'

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
};

export class PhotoGrid extends PureComponent {

  componentWillMount() {
    this.props.fetchPhotos()
  }

  render() {
    const {signedIn, photos} = this.props

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
                actionIcon={signedIn ? <Delete color="white" /> : null}
                actionPosition="right"
                titlePosition="top"
                titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                cols={photo.featured ? 2 : 1}
                rows={photo.featured ? 2 : 1}
              >
                <img alt="galleryPhoto" src={photo.url} onClick={()=> null} />
              </GridTile>
            ))}
          </GridList>
        </div>
      </div>
    )
  }
}


const mapStateToProps = ({ currentUser, photos }) => ({
  photos,
  signedIn: !!currentUser && !!currentUser._id
 })

export default connect(mapStateToProps, { fetchPhotos })(PhotoGrid)
