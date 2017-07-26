import React, { PureComponent } from 'react'
import PhotoGallery from './PhotoGallery'

export class HomeContainer extends PureComponent {

  render() {

    return(
      <div >
        <h1>Somebozo Home Page</h1>
        <PhotoGallery />
      </div>
    )
  }
}

export default HomeContainer
