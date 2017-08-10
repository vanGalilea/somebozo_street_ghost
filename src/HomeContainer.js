import React, { PureComponent } from 'react'
import PhotoGallery from './PhotoGallery'
import src from './InstagramCred'
import './HomeContainer.css'

const style = {
  display:"block",
  width:"940px",
  height:"224px",
  border:"none",
  overflow:"visible"
}

export class HomeContainer extends PureComponent {

  render() {

    return(
      <div>
        <div className="container" >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut viverra ligula eros. Sed placerat lectus ac dui interdum convallis.
            Sed varius sem non enim convallis, tristique mattis purus pretium. Nulla rhoncus varius ex, vitae tempor leo pharetra at.
            Fusce diam ligula, euismod non placerat interdum, luctus mattis justo. Pellentesque mattis ut orci non facilisis. Donec iaculis
            imperdiet porttitor. Vestibulum in congue neque. In hac habitasse platea dictumst. Donec vehicula, felis sed maximus congue,
            neque quam varius lectus, eu venenatis turpis mauris ut magna. Orci varius natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Integer sit amet risus non ipsum fringilla consequat. Fusce eleifend finibus ante, ac placerat nisl
            varius at. Donec id ex vitae quam pharetra aliquet. Duis auctor nisi et neque cursus, non aliquet libero laoreet.
            Nulla pulvinar nibh risus, id eleifend nulla convallis ac.
            Nulla facilisi. Aliquam quis justo sit amet magna commodo sodales sit amet at arcu. Aliquam ex nisi, iaculis ut metus vitae,
            eleifend vulputate dolor. Nam fermentum eu nisl sed volutpat. Sed sed ipsum porttitor massa viverra venenatis.
            Sed in elit ultricies, auctor leo sit amet, fermentum massa. Nam et convallis arcu.
            Sed eget dui sit amet nisi blandit dignissim. Aenean sed interdum velit, ac condimentum odio. In efficitur vehicula eleifend.
            Pellentesque erat tortor, eleifend eget nisl vel, faucibus eleifend ante. Curabitur vestibulum aliquet diam,
            ac accumsan tellus maximus id. Ut ex elit, feugiat aliquet molestie ut, euismod sit amet purus.
          </p>
          <PhotoGallery />
        </div>
        <h2>Check out my latest Instagram posts</h2>
        <iframe
          src={src}
          allowTransparency="true"
          frameBorder="0"
          scrolling="no"
          style={style}
          className="insta-widget"
        ></iframe>
      </div>
    )
  }
}

export default HomeContainer
