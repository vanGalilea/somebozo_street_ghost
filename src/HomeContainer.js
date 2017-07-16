import React, { PureComponent } from 'react'
import PhotoGrid from './PhotoGrid'

export class HomeContainer extends PureComponent {

  render() {

    return(
      <div >
        <h1>Somebozo Home Page</h1>
        <PhotoGrid />
      </div>
    )
  }
}

export default HomeContainer
