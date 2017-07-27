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
import FloatingActionButton from 'material-ui/FloatingActionButton'

const style = {
  paddingRight: '15px',
}

class Navigation extends PureComponent {

  render() {
    const { signedIn, signOut } = this.props
    const mailButton = <FloatingActionButton mini={true} style={style} href='mailto:chenveze@gmail.com'><Mail color="white" /></FloatingActionButton>
    const facebookButton = <FloatingActionButton mini={true} style={style} href='https://www.facebook.com/somebozo/'><Facebook style={{color: 'white', width: '25px'}}/></FloatingActionButton>
    const instagramButton = <FloatingActionButton mini={true} style={style} href='https://www.instagram.com/somebozo_street_ghost/'><Instagram style={{color: 'white', width: '25px'}}  /></FloatingActionButton>

    return (
      <AppBar
        style={{backgroundColor: 'black', opacity: 0.8}}
        title="Somebozo Street Ghost"
        iconElementLeft={<IconButton onClick={()=>this.props.push('/')}><Palette /></IconButton>}
        iconElementRight={signedIn ?
          <div>
            {mailButton}
            {facebookButton}
            {instagramButton}
            <FloatingActionButton mini={true} style={style} onClick={()=>this.props.push('/admin')} ><AddPhoto color="white" /></FloatingActionButton>
            <FloatingActionButton mini={true} style={style} onClick={signOut}><Exit color="white" /></FloatingActionButton>
          </div> :
          <div>
            {mailButton}
            {facebookButton}
            {instagramButton}
            <FloatingActionButton mini={true} style={style} onClick={()=>this.props.push('/sign-in')}><FingerPrint color="white"/></FloatingActionButton>
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
