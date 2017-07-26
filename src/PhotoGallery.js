import React, { PureComponent } from 'react'
import ImageGallery from 'react-image-gallery'
import { connect } from 'react-redux'
import Delete from 'material-ui/svg-icons/action/delete-forever'
import fetchPhotos from './actions/photos/fetch'
import deletePhoto from './actions/photos/delete'
import IconButton from 'material-ui/IconButton'
import './PhotoGallery.css'

export class PhotoGallery extends PureComponent {

  componentWillMount() {
    this.props.fetchPhotos()
  }

  // handleImageLoad(event) {
  //   console.log('Image loaded ', event.target)
  // }

  render() {
    const {photos} = this.props

    return (
      <div className="gallery">
        <ImageGallery
          items={photos}
          slideInterval={2000}
          onImageLoad={this.handleImageLoad}
          />
      </div>
    )
  }

}

const mapStateToProps = ({ currentUser, photos }) => ({ photos })

export default connect(mapStateToProps, { fetchPhotos })(PhotoGallery)
