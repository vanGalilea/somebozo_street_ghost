import React, {Component} from 'react'
import IconButton from 'material-ui/IconButton'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import './BottomNavBar.css'

const style= {
  padding: "5px",
  margin: "5px"
}

class BottomNavBar extends Component {

  render() {
    return (
      <div className="footer">
        <p>This website was made by me</p>

        <IconButton style={style} href='https://github.com/vanGalilea'>
          <img className="footer-logo" src={require('./assets/github.png')} />
        </IconButton>

        <IconButton style={style} href='https://www.linkedin.com/in/ziv-steve-galili-09434698/'>
          <img className="footer-logo" src={require('./assets/linkedIn.png')} />
        </IconButton>
      </div>
    )
  }
}

export default BottomNavBar
