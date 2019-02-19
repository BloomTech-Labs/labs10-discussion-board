import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { subscriptionPlans } from '../globals/globals.js';
// import PropTypes from 'prop-types';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const DivWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const H1Register = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
  margin: 0;
  background-color: lightgray;
  font-size: 48px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DivSubscriptionPlan = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 25px 0;
  border-bottom: 2px solid black;
  width: 100%;

  h1 {
    margin: 0 0 0.67em 0;
    text-decoration: underline;
  }
`;

const DivSelectBanners = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
`;

const DivBanner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 400px;

  input {
    margin-top: 20px;
    width: 2em;
    height: 2em;
  }
`;

const DivFeatures = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;

  h2 {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    user-select: none;
    text-decoration: underline;
  }

  ul {
    padding-right: 20px;
    user-select: none;
  }
`;

const DivFreePlan = styled.div`
  display: flex;
  flex-direction: column;
  border: ${props =>
    props.subPlan === subscriptionPlans[0]
      ? '5px solid lime'
      : '5px solid rgba(0, 0, 0, 0)'};
  border-radius: 10px;
  background-color: white;
  cursor: pointer;
  font-weight: bold;
  height: 100%;
  position: relative;

  h4 {
    position: absolute;
    bottom: 0;
    text-align: center;
    width: 100%;
  }

  &:hover {
    opacity: ${props => (props.subPlan === subscriptionPlans[0] ? '1' : '0.6')};
  }
`;

const DivBronzePlan = styled.div`
  display: flex;
  flex-direction: column;
  border: ${props =>
    props.subPlan === subscriptionPlans[1]
      ? '5px solid lime'
      : '5px solid rgba(0, 0, 0, 0)'};
  border-radius: 10px;
  background-color: #553621;
  cursor: pointer;
  font-weight: bold;
  height: 100%;
  position: relative;

  h4 {
    position: absolute;
    bottom: 0;
    text-align: center;
    width: 100%;
  }

  &:hover {
    opacity: ${props => (props.subPlan === subscriptionPlans[1] ? '1' : '0.6')};
  }
`;

const DivSilverPlan = styled.div`
  display: flex;
  flex-direction: column;
  border: ${props =>
    props.subPlan === subscriptionPlans[2]
      ? '5px solid lime'
      : '5px solid rgba(0, 0, 0, 0)'};
  border-radius: 10px;
  background-color: silver;
  cursor: pointer;
  font-weight: bold;
  height: 100%;
  position: relative;

  h4 {
    position: absolute;
    bottom: 0;
    text-align: center;
    width: 100%;
  }

  &:hover {
    opacity: ${props => (props.subPlan === subscriptionPlans[2] ? '1' : '0.6')};
  }
`;

const DivGoldPlan = styled.div`
  display: flex;
  flex-direction: column;
  border: ${props =>
    props.subPlan === subscriptionPlans[3]
      ? '5px solid lime'
      : '5px solid rgba(0, 0, 0, 0)'};
  border-radius: 10px;
  background-color: gold;
  cursor: pointer;
  font-weight: bold;
  height: 100%;
  position: relative;

  h4 {
    position: absolute;
    bottom: 0;
    text-align: center;
    width: 100%;
  }

  &:hover {
    opacity: ${props => (props.subPlan === subscriptionPlans[3] ? '1' : '0.4')};
  }
`;

const DivRegisterForm = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid black;
  width: 100%;
  padding: 25px 0;
`;

const DivLeftSide = styled.div`
  display: flex;
  flex-direction: column;
`;

const DivUsername = styled.div`
  display: flex;
  flex-direction: row;
`;

const LabelUsername = styled.label`
  span {
    color: red;
  }
`;

const InputUsername = styled.input``;

const DivPassword = styled.div`
  display: flex;
  flex-direction: row;
`;

const LabelPassword = styled.label`
  span {
    color: red;
  }
`;

const InputPassword = styled.input``;

const DivEmail = styled.div`
  display: flex;
  flex-direction: row;
`;

const LabelEmail = styled.label``;

const InputEmail = styled.input``;

const DivSignature = styled.div`
  display: flex;
  flex-direction: column;
`;

const LabelSignature = styled.label``;

const TextareaSignature = styled.textarea`
  max-width: 35%;
`;

const DivRightSide = styled.div`
  display: flex;
  flex-direction: column;
`;

const DivAvatar = styled.div``;

const DivButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 25px 0;
  width: 50%;
`;

const ButtonCancel = styled(Link)``;

const ButtonContinue = styled(Link)``;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subPlan: subscriptionPlans[0],
      username: '',
      password: '',
      email: '',
      signature: '',
      avatar: ''
    };
  }

  //========================== Methods =========================
  componentDidMount() {
    this.setState({
      subPlan: subscriptionPlans[0],
      username: '',
      password: '',
      email: '',
      signature: '',
      avatar: ''
    });
  }

  clearRegisterState = () => {
    this.setState({
      subPlan: subscriptionPlans[0],
      username: '',
      password: '',
      email: '',
      signature: '',
      avatar: ''
    });
  };

  selectSubPlan = sub => {
    this.setState({ subPlan: sub });
  };

  //---------------- Form Methods --------------
  handleInputChange = ev => {
    this.setState({
      [ev.target.name]: ev.target.value
    });
  };

  submitHandler = ev => {
    ev.preventDefault();
    if (this.state.newNote.title && this.state.newNote.textBody) {
      this.props.addNote(this.state.newNote);
      this.clearNewNoteState();
    }
  };

  render() {
    return (
      <DivWrapper>
        <H1Register>Register New Account</H1Register>
        <Form>
          <DivSubscriptionPlan>
            <h1>Select Subscription Plan</h1>
            <DivSelectBanners>
              <DivBanner
                onClick={() => this.selectSubPlan(subscriptionPlans[0])}
              >
                <DivFreePlan subPlan={this.state.subPlan}>
                  <DivFeatures>
                    <h2>Free Plan</h2>
                    <ul>
                      <li>Create Categories</li>
                      <li>Create Discussions</li>
                      <li>Create Posts(replies)</li>
                    </ul>
                  </DivFeatures>
                  <h4>$0.00</h4>
                </DivFreePlan>
                <input
                  id='subscription-radio-selector'
                  type='radio'
                  class='form-radio__selection'
                  value='free-plan'
                  name='sub-plan'
                  checked={
                    this.state.subPlan === subscriptionPlans[0] ? 'checked' : ''
                  }
                />
              </DivBanner>
              <DivBanner
                onClick={() => this.selectSubPlan(subscriptionPlans[1])}
              >
                <DivBronzePlan subPlan={this.state.subPlan}>
                  <DivFeatures>
                    <h2>Bronze Plan</h2>
                    <ul>
                      <li>Create Categories</li>
                      <li>Create Discussions</li>
                      <li>Create Posts(replies)</li>
                      <li>No Ads</li>
                    </ul>
                  </DivFeatures>
                  <h4>$0.99/yr</h4>
                </DivBronzePlan>
                <input
                  id='subscription-radio-selector'
                  type='radio'
                  class='form-radio__selection'
                  value='bronze-plan'
                  name='sub-plan'
                  checked={
                    this.state.subPlan === subscriptionPlans[1] ? 'checked' : ''
                  }
                />
              </DivBanner>
              <DivBanner
                onClick={() => this.selectSubPlan(subscriptionPlans[2])}
              >
                <DivSilverPlan subPlan={this.state.subPlan}>
                  <DivFeatures>
                    <h2>Silver Plan</h2>
                    <ul>
                      <li>Create Categories</li>
                      <li>Create Discussions</li>
                      <li>Create Posts(replies)</li>
                      <li>No Ads</li>
                      <li>Gets Signature</li>
                    </ul>
                  </DivFeatures>
                  <h4>$1.99/yr</h4>
                </DivSilverPlan>
                <input
                  id='subscription-radio-selector'
                  type='radio'
                  class='form-radio__selection'
                  value='silver-plan'
                  name='sub-plan'
                  checked={
                    this.state.subPlan === subscriptionPlans[2] ? 'checked' : ''
                  }
                />
              </DivBanner>
              <DivBanner
                onClick={() => this.selectSubPlan(subscriptionPlans[3])}
              >
                <DivGoldPlan subPlan={this.state.subPlan}>
                  <DivFeatures>
                    <h2>Gold Plan</h2>
                    <ul>
                      <li>Create Categories</li>
                      <li>Create Discussions</li>
                      <li>Create Posts(replies)</li>
                      <li>No Ads</li>
                      <li>Gets Signature</li>
                      <li>Gets Avatar</li>
                    </ul>
                  </DivFeatures>
                  <h4>$2.99/yr</h4>
                </DivGoldPlan>
                <input
                  id='subscription-radio-selector'
                  type='radio'
                  class='form-radio__selection'
                  value='gold-plan'
                  name='sub-plan'
                  checked={
                    this.state.subPlan === subscriptionPlans[3] ? 'checked' : ''
                  }
                />
              </DivBanner>
            </DivSelectBanners>
          </DivSubscriptionPlan>
          <DivRegisterForm>
            <DivLeftSide>
              <DivUsername>
                <LabelUsername>
                  <span>*</span>&nbsp;Username
                </LabelUsername>
                <InputUsername
                  onChange={this.handleInputChange}
                  placeholder='Required...'
                  value={this.state.username}
                  name='username'
                  autoComplete='off'
                />
                {<img src='' alt='spinner' />}
                {<img src='' alt='taken' />}
                {<img src='' alt='available' />}
              </DivUsername>
              <DivPassword>
                <LabelPassword>
                  <span>*</span>&nbsp;Password
                </LabelPassword>
                <InputPassword
                  onChange={this.handleInputChange}
                  placeholder='Required...'
                  value={this.state.username}
                  name='password'
                  autoComplete='off'
                />
              </DivPassword>
              <DivEmail>
                <LabelEmail>Email</LabelEmail>
                <InputEmail
                  onChange={this.handleInputChange}
                  placeholder='Optional...'
                  value={this.state.email}
                  name='email'
                  autoComplete='off'
                />
              </DivEmail>
              <DivSignature>
                <LabelSignature>Signature</LabelSignature>
                <TextareaSignature
                  onChange={this.handleInputChange}
                  placeholder='Optional...'
                  value={this.state.signature}
                  name='signature'
                  autoComplete='off'
                />
              </DivSignature>
            </DivLeftSide>
            <DivRightSide>
              <img src='' alt='avatar preview' />
              <DivAvatar>Avatar</DivAvatar>
            </DivRightSide>
          </DivRegisterForm>
          <DivButtons>
            <ButtonCancel to=''>Cancel</ButtonCancel>
            <ButtonContinue to=''>Continue</ButtonContinue>
          </DivButtons>
        </Form>
      </DivWrapper>
    );
  }
}

// Register.propTypes = {
//   propertyName: PropTypes.string
// }

export default Register;
