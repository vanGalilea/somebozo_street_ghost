import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import signOut from './actions/user/sign-out'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import Palette from 'material-ui/svg-icons/image/palette'
import FingerPrint from 'material-ui/svg-icons/action/fingerprint'
import Exit from 'material-ui/svg-icons/action/exit-to-app'
import AddPhoto from 'material-ui/svg-icons/image/add-a-photo'
import FlatButton from 'material-ui/FlatButton'

class Navigation extends PureComponent {

  render() {
    const { signedIn, signOut } = this.props
    return (
      <AppBar
        style={{opacity: 0.7}}
        title="Somebozo Street Ghost"
        iconElementLeft={<IconButton onClick={()=>this.props.push('/')}><Palette /></IconButton>}
        iconElementRight={signedIn ?
          <div>
            <FlatButton label={<AddPhoto />} onClick={()=>this.props.push('/admin')} />
            <FlatButton label={<Exit />} onClick={signOut} />
          </div> :
          <FlatButton label={<FingerPrint />} onClick={()=>this.props.push('/sign-in')}/>
        }
      />
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps, { push, signOut })(Navigation)
