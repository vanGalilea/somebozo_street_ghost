import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import signOut from './actions/user/sign-out'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import Palette from 'material-ui/svg-icons/image/palette'
import FingerPrint from 'material-ui/svg-icons/action/fingerprint'
import Exit from 'material-ui/svg-icons/action/exit-to-app'
import Mail from 'material-ui/svg-icons/action/markunread-mailbox'
import AddPhoto from 'material-ui/svg-icons/image/add-a-photo'
import FlatButton from 'material-ui/FlatButton'
import Facebook from 'react-icons/lib/fa/facebook-square'
import Instagram from 'react-icons/lib/fa/instagram'

class Navigation extends PureComponent {

  render() {
    const { signedIn, signOut } = this.props
    const menuButtons = <IconButton href='mailto:gebruiker@provider.nl'><Mail color="white" /></IconButton>
    return (
      <AppBar
        style={{backgroundColor: 'black', opacity: 0.8}}
        title="Somebozo Street Ghost"
        iconElementLeft={<IconButton onClick={()=>this.props.push('/')}><Palette /></IconButton>}
        iconElementRight={signedIn ?
          <div>
            {menuButtons}
            <IconButton onClick={()=>this.props.push('/admin')} ><AddPhoto color="white" /></IconButton>
            <IconButton onClick={signOut}><Exit color="white" /></IconButton>
          </div> :
          <div>
            {menuButtons}
            <IconButton onClick={()=>this.props.push('/sign-in')}><FingerPrint color="white"/></IconButton>
          </div>
        }
      />
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps, { push, signOut })(Navigation)
