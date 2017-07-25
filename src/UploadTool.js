import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import DropPhotos from './DropPhotos'
import AddPhotoInfo from './AddPhotoInfo'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { history } from './store'
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
        return <p>You have succefully uploaded {this.props.tempUploadedPhotos.length+1} photo/s,
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
    const {finished, stepIndex, stepCompleted} = this.state;
    const contentStyle = {margin: '0 16px'};

    return (
      <div>
        <h2>Admin Upload Tool</h2>
        <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
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
            {finished ? history.push('/') : (
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
      </div>
    )
  }
}

const mapStateToProps = ({ tempUploadedPhotos }) => ({ tempUploadedPhotos })

export default connect(mapStateToProps)(UploadTool)
