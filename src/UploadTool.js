import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import DropPhotos from './DropPhotos'
import AddPhotoInfo from './AddPhotoInfo'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import { push } from 'react-router-redux'
import PhotoGrid from './PhotoGrid'
import AnalyticsDashBoard from './AnalyticsDashBoard'
import './UploadTool.css'
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper'

export class UploadTool extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      stepCompleted: true,
      finished: false,
      stepIndex: 0,
    }
  }

  handleNext() {
    const {stepIndex} = this.state;

    this.setState({
      stepCompleted: true,
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    })
  }

  handlePrev() {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <DropPhotos />
      case 1:
        return <AddPhotoInfo />
      case 2:
        return <p>You have succefully uploaded the photo/s,
          after pressing Next you will be redirected to the homepage</p>
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  compleatedStep(nextProps) {
    const {stepIndex} = this.state
    const {tempUploadedPhotos} = nextProps
    if (stepIndex === 0) this.setState ({ stepCompleted: !tempUploadedPhotos.length > 0 })
    if (stepIndex === 1) this.setState ({ stepCompleted: !tempUploadedPhotos.length === 0 })
  }

  componentWillReceiveProps(nextProps) {
    this.compleatedStep(nextProps)
  }

  render() {
    const {finished, stepIndex, stepCompleted} = this.state
    const {signedIn} = this.props
    const contentStyle = {margin: '0 16px'}
    if (!signedIn) this.props.push('/')
    return (
      <div>
        <h2>Admin Upload Tool</h2>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <div style={{width: '50%', marginTop: -30, marginLeft: 20, paddingRight: 75}}>
            <Stepper activeStep={stepIndex}>
              <Step>
                <StepLabel>Upload Photo/s</StepLabel>
              </Step>
              <Step>
                <StepLabel>Add Info</StepLabel>
              </Step>
              <Step>
                <StepLabel>Confirm and Submit</StepLabel>
              </Step>
            </Stepper>

            <div style={contentStyle}>
              {finished ? this.props.push('/') : (
                <div>
                  {this.getStepContent(stepIndex)}
                  <div style={{marginTop: 12}}>
                    <FlatButton
                      label="Back"
                      disabled={stepIndex === 0}
                      onClick={this.handlePrev.bind(this)}
                      style={{marginRight: 12}}
                    />
                    <RaisedButton
                      label={stepIndex === 2 ? 'Finish' : 'Next'}
                      primary={true}
                      onClick={this.handleNext.bind(this)}
                      disabled={(stepIndex === 2) ? false : stepCompleted}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <PhotoGrid />
        </div>
        <AnalyticsDashBoard/>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, tempUploadedPhotos }) => ({
  tempUploadedPhotos,
  signedIn: !!currentUser && !!currentUser._id
 })

export default connect(mapStateToProps, { push })(UploadTool)
