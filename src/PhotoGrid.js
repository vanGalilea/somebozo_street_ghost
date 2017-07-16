import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {GridList, GridTile} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'
import fetchPhotos from './actions/photos/fetch'
import UploadTool from './UploadTool'

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
};

export class PhotoGrid extends PureComponent {

  componentWillMount() {
    this.props.fetchPhotos()
  }

  render() {
    const {photos} = this.props
    return(
      <div>
        <UploadTool />
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
                actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                actionPosition="left"
                titlePosition="top"
                titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                cols={photo.featured ? 2 : 1}
                rows={photo.featured ? 2 : 1}
              >
                <img src={photo.url} />
              </GridTile>
            ))}
          </GridList>
        </div>
      </div>
    )
  }
}


const mapStateToProps = ({ photos }) => ({ photos })

export default connect(mapStateToProps, { fetchPhotos })(PhotoGrid)
