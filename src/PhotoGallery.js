import React, { PureComponent } from 'react'
import ImageGallery from 'react-image-gallery'
import { connect } from 'react-redux'
import fetchPhotos from './actions/photos/fetch'
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
          slideInterval={3000}
          onImageLoad={this.handleImageLoad}
          thumbnailPosition='left'
          />
      </div>
    )
  }

}

const mapStateToProps = ({ currentUser, photos }) => ({ photos })

export default connect(mapStateToProps, { fetchPhotos })(PhotoGallery)
