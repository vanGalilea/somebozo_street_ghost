import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import signOut from './actions/user/sign-out'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import Palette from 'material-ui/svg-icons/image/palette'
import FlatButton from 'material-ui/FlatButton'

class Navigation extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
    push: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
  }

  signIn = () => {
    this.props.push('/sign-in')
  }

  goHome = () => {
    this.props.push('/')
  }

  render() {
    const { signedIn, signOut } = this.props
    return (
      <AppBar
        style={{opacity: 0.7}}
        title="Somebozo Street Ghost"
        iconElementLeft={<IconButton onClick={this.goHome}><Palette /></IconButton>}
        iconElementRight={signedIn ?
          <FlatButton label="Sign out" onClick={signOut} /> :
          <FlatButton label="Sign in" onClick={this.signIn} />
        }
      />
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps, { push, signOut })(Navigation)
