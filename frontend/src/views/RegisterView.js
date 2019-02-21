import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import { subscriptionPlans, subscriptionPrices, stripePayFormat, stripeToken } from '../globals/globals.js';
import {
  register,
  displayError,
  isUsernameTaken,
  isEmailTaken,
  stripePayment
} from '../store/actions/index';
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
  user-select: none;
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
    user-select: none;
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
  height: 350px;
  cursor: pointer;

  input {
    margin-top: 20px;
    width: 2em;
    height: 2em;
    cursor: pointer;
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
  font-weight: bold;
  height: 100%;
  position: relative;

  h4 {
    position: absolute;
    bottom: 0;
    text-align: center;
    width: 100%;
    user-select: none;
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
  font-weight: bold;
  height: 100%;
  position: relative;

  h4 {
    position: absolute;
    bottom: 0;
    text-align: center;
    width: 100%;
    user-select: none;
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
  font-weight: bold;
  height: 100%;
  position: relative;

  h4 {
    position: absolute;
    bottom: 0;
    text-align: center;
    width: 100%;
    user-select: none;
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
  font-weight: bold;
  height: 100%;
  position: relative;

  h4 {
    position: absolute;
    bottom: 0;
    text-align: center;
    width: 100%;
    user-select: none;
  }

  &:hover {
    opacity: ${props => (props.subPlan === subscriptionPlans[3] ? '1' : '0.4')};
  }
`;

const DivRegisterForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid black;
  width: 100%;
  padding: 25px 0;

  h1 {
    text-decoration: underline;
    margin: 0 0 0.67em 0;
  }
`;

const DivAccountDetails = styled.div`
  display: flex;
  flex-direction: row;
  width: 800px;
  justify-content: space-between;
`;

const DivLeftSide = styled.div`
  display: flex;
  flex-direction: column;
`;

const DivUsername = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 320px;
  margin-bottom: 10px;
`;

const LabelUsername = styled.label`
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 5px;
  margin-right: 5px;
  span {
    color: red;
  }
`;

const InputUsername = styled.input`
  height: 30px;
  border-radius: 10px;
  margin-right: 5px;

  &:focus {
    outline: none;
  }
`;

const DivPassword = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 320px;
  margin-bottom: 10px;
`;

const LabelPassword = styled.label`
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 5px;
  margin-right: 10px;

  span {
    color: red;
  }
`;

const InputPassword = styled.input`
  height: 30px;
  border-radius: 10px;

  &:focus {
    outline: none;
  }
`;

const DivEmail = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 320px;
  margin-bottom: 25px;
`;

const LabelEmail = styled.label`
  font-size: 20px;
  padding-bottom: 5px;
  margin-right: 53px;
  margin-left: 14px;
`;

const InputEmail = styled.input`
  height: 30px;
  border-radius: 10px;
  margin-right: 5px;

  &:focus {
    outline: none;
  }
`;

const DivSignature = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 320px;
  visibility: ${props =>
    props.subPlan === subscriptionPlans[2] ||
      props.subPlan === subscriptionPlans[3]
      ? 'show'
      : 'hidden'};
`;

const LabelSignature = styled.label`
  font-size: 20px;
  text-decoration: underline;
  margin-bottom: 5px;
`;

const TextareaSignature = styled.textarea`
  width: 100%;
  height: 100px;
  resize: none;
`;

const DivRightSide = styled.div`
  display: flex;
  flex-direction: column;
`;

const DivAvatar = styled.div`
  display: flex;
  flex-direction: column;
  visibility: ${props =>
    props.subPlan === subscriptionPlans[3] ? 'show' : 'hidden'};
`;

const DivButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 25px 0;
  width: 50%;
`;

const ButtonCancel = styled(Link)``;

const DivConfirm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    text-decoration: underline;
  }
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class RegisterView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subPlan: subscriptionPlans[0],
      username: '',
      password: '',
      email: '',
      signature: '',
      avatar: '',
      isReady: false
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
      avatar: '',
      isReady: false
    });
  }

  clearRegisterState = ev => {
    ev.preventDefault();
    this.setState({
      subPlan: subscriptionPlans[0],
      username: '',
      password: '',
      email: '',
      signature: '',
      avatar: '',
      isReady: false
    });
  };

  selectSubPlan = sub => {
    this.setState({ subPlan: sub });
  };

  setIsReady = (ev, status) => {
    ev && ev.preventDefault();
    if (status) {
      this.props.isUsernameTaken(this.state.username).then(() => {
        if (this.props.usernameTaken) {
          return this.props.displayError('username taken');
        }

        if (this.state.email) {
          this.props.isEmailTaken(this.state.email).then(() => {
            if (this.props.emailTaken) {
              return this.props.displayError('email taken');
            }

            if (status && this.state.username && this.state.password) {
              this.setState(
                { isReady: status },
                () => !status && this.props.history.push('/home')
              );
            } else if (!status) {
              this.setState(
                { isReady: status },
                () => !status && this.props.history.push('/home')
              );
            } else {
              this.props.displayError('missing field');
            }
          });
        } else {
          if (status && this.state.username && this.state.password) {
            this.setState(
              { isReady: status },
              () => !status && this.props.history.push('/home')
            );
          } else if (!status) {
            this.setState(
              { isReady: status },
              () => !status && this.props.history.push('/home')
            );
          } else {
            this.props.displayError('missing field');
          }
        }
      });
    } else {
      this.setState({ isReady: status }, () =>
        this.props.history.push('/home')
      );
    }
  };

  //---------------- Form Methods --------------
  handleInputChange = ev => {
    const chars = ev.target.value;
    if (ev.target.name === 'email') {
      this.setState(
        {
          email: chars
        },
        () => this.props.isEmailTaken(this.state.email)
      );
    } else if (ev.target.name === 'username') {
      this.setState(
        {
          username: chars
        },
        () => this.props.isUsernameTaken(this.state.username)
      );
    } else {
      this.setState({
        [ev.target.name]: ev.target.value
      });
    }
  };

  submitHandler = ev => {
    ev && ev.preventDefault();
    try {
      let newAccount;
      // prettier-ignore
      if (this.state.subPlan === subscriptionPlans[2]) { // silver
        newAccount = {
          subPlan: this.state.subPlan,
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          signature: this.state.signature
        };
      } else if (this.state.subPlan === subscriptionPlans[3]) { // gold
        newAccount = {
          subPlan: this.state.subPlan,
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          signature: this.state.signature,
          avatarUrl: this.state.avatar
        };
      } else if ( // free or bronze
        this.state.subPlan === subscriptionPlans[0] ||
        this.state.subPlan === subscriptionPlans[1]
      ) {
        newAccount = {
          subPlan: this.state.subPlan,
          username: this.state.username,
          password: this.state.password,
          email: this.state.email
        };
      } else { // incorrect subscription plan
        throw new Error('invalid data');
      }
      this.props.register(newAccount).then(() => this.setIsReady(null, false));
    } catch (err) {
      this.props.displayError(err);
    }
  };

  getStripePayment = () => {
    switch (this.state.subPlan) {
      case subscriptionPlans[1]:
        return stripePayFormat[0];
      case subscriptionPlans[2]:
        return stripePayFormat[1];
      case subscriptionPlans[3]:
        return stripePayFormat[2];
      default:
        return 0;
    }
  }

  onToken = (token) => {
    const headersObj = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: {
        stripeToken: token.id,
        payment: this.getStripePayment()
      }
    }
    this.props.stripePayment(headersObj).then(() => this.submitHandler());
  }

  render() {
    return (
      <DivWrapper>
        <H1Register>Register New Account</H1Register>
        {this.state.isReady ? (
          <DivConfirm>
            <h1>Confirm New Account Information</h1>
            <button onClick={() => this.setState({ isReady: false })}>Back</button>
            {this.state.subPlan === subscriptionPlans[0] ? (
              <button onClick={ev => this.submitHandler(ev)}>Confirm</button>
            ) : (
                <div>
                  <StripeCheckout
                    token={this.onToken}
                    stripeKey={stripeToken}
                  />
                </div>
              )}
          </DivConfirm>
        ) : (
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
                      <h4>{subscriptionPrices[0]}</h4>
                    </DivFreePlan>
                    <input
                      type='radio'
                      value='free-plan'
                      name='sub-plan'
                      checked={
                        this.state.subPlan === subscriptionPlans[0] && true
                      }
                      readOnly
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
                      <h4>{subscriptionPrices[1]}</h4>
                    </DivBronzePlan>
                    <input
                      type='radio'
                      value='bronze-plan'
                      name='sub-plan'
                      checked={
                        this.state.subPlan === subscriptionPlans[1] && true
                      }
                      readOnly
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
                      <h4>{subscriptionPrices[2]}</h4>
                    </DivSilverPlan>
                    <input
                      type='radio'
                      value='silver-plan'
                      name='sub-plan'
                      checked={
                        this.state.subPlan === subscriptionPlans[2] && true
                      }
                      readOnly
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
                      <h4>{subscriptionPrices[3]}</h4>
                    </DivGoldPlan>
                    <input
                      type='radio'
                      value='gold-plan'
                      name='sub-plan'
                      checked={
                        this.state.subPlan === subscriptionPlans[3] && true
                      }
                      readOnly
                    />
                  </DivBanner>
                </DivSelectBanners>
              </DivSubscriptionPlan>
              <DivRegisterForm>
                <h1>Enter New Account Details</h1>
                <DivAccountDetails>
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
                      {this.state.username !== '' &&
                        this.props.userExistsLoadingMessage && (
                          <img
                            src={require('../assets/gif/spinner2.gif')}
                            alt='spinner'
                          />
                        )}
                      {(this.state.username === '' ||
                        (!this.props.userExistsLoadingMessage &&
                          this.props.usernameTaken)) && (
                          <img src={require('../assets/img/redX.png')} alt='X' />
                        )}
                      {this.state.username !== '' &&
                        !this.props.userExistsLoadingMessage &&
                        !this.props.usernameTaken && (
                          <img
                            src={require('../assets/img/greenCheckmark.png')}
                            alt='checkMark'
                          />
                        )}
                    </DivUsername>
                    <DivPassword>
                      <LabelPassword>
                        <span>*</span>&nbsp;Password
                    </LabelPassword>
                      <InputPassword
                        type='password'
                        onChange={this.handleInputChange}
                        placeholder='Required...'
                        value={this.state.password}
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
                      {this.state.email !== '' &&
                        this.props.emailExistsLoadingMessage && (
                          <img
                            src={require('../assets/gif/spinner2.gif')}
                            alt='spinner'
                          />
                        )}
                      {this.state.email !== '' &&
                        !this.props.emailExistsLoadingMessage &&
                        this.props.emailTaken && (
                          <img src={require('../assets/img/redX.png')} alt='X' />
                        )}
                      {this.state.email !== '' &&
                        !this.props.emailExistsLoadingMessage &&
                        !this.props.emailTaken && (
                          <img
                            src={require('../assets/img/greenCheckmark.png')}
                            alt='checkMark'
                          />
                        )}
                    </DivEmail>
                    <DivSignature subPlan={this.state.subPlan}>
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
                    <DivAvatar subPlan={this.state.subPlan}>
                      <img src='' alt='avatar preview' />
                      <input
                        onChange={this.handleInputChange}
                        placeholder='PNG URL...'
                        value={this.state.avatar}
                        name='avatar'
                        autoComplete='off'
                      />
                    </DivAvatar>
                  </DivRightSide>
                </DivAccountDetails>
              </DivRegisterForm>
              <DivButtons>
                <ButtonCancel to='/'>Cancel</ButtonCancel>
                <button
                  to='/register/confirm'
                  onClick={ev => this.setIsReady(ev, true)}
                >
                  Continue
              </button>
              </DivButtons>
            </Form>
          )}
      </DivWrapper>
    );
  }
}

// RegisterView.propTypes = {
//   propertyName: PropTypes.string
// }register

const mapStateToProps = state => {
  return {
    userExistsLoadingMessage: state.users.userExistsLoadingMessage,
    emailExistsLoadingMessage: state.users.emailExistsLoadingMessage,
    usernameTaken: state.users.isUsernameTaken,
    emailTaken: state.users.isEmailTaken
  };
};

export default connect(
  mapStateToProps,
  { register, displayError, isUsernameTaken, isEmailTaken, stripePayment }
)(RegisterView);
