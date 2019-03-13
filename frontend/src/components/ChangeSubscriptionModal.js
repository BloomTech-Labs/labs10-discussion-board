import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import StripeCheckout from 'react-stripe-checkout';

// globals
import {
  phoneL,
  topHeaderHeight,
  accountUserTypes,
  subscriptionPlans,
  subscriptionPrices,
  stripePayFormat,
  stripeToken,
  subscriptionBronzeFeatures,
  subscriptionSilverFeatures,
  subscriptionGoldFeatures
} from '../globals/globals.js';

// actions
import { stripePayment, changeUserType } from '../store/actions/index';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const DivChangeSubModal = styled.div`
  display: ${props => props.ischangesubmodalraised === 'true' ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 9950;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  user-select: none;

  @media ${phoneL} {
    margin-top: ${topHeaderHeight};
  }
`;

const DivModalCloser = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9997;
`;

const DivChangeSub = styled.div`
  display: flex;
  background-color: white;
  z-index: 9999;
  width: 80%;
  height: 70%;
  flex-direction: column;

  @media(max-width: 1080px) {
    width: 100%;
    height: 100%;
    align-items: center;
  }
`;

const FormChangeSub = styled.form`
  display: flex;

  @media(max-width:1080px) {
    width: 70%;
  }

  @media ${phoneL} {
    width: 100%;
  }
`;

const DivHeaderTitle = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const H1HeaderTitle = styled.h1`
  @media ${phoneL} {
    font-size: 24px;
  }
`;

const DivSelectBanners = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  flex-wrap: wrap;

  @media(max-width: 1080px) {
    flex-direction: column;
  }
`;

const DivBanner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 390px;
  cursor: pointer;

  input {
    margin-top: 20px;
    width: 2em;
    height: 2em;
    cursor: pointer;
    visibility: hidden;

    @media(max-width: 1080px) {
      visibility: visible;
    }
  }

  @media(max-width: 1080px) {
    height: ${props =>
    props.subPlan
      ? 'auto'
      : '45px'};
    width: 100%;
    position: relative;

    input {
      margin-top: 0;
      position: absolute;
      top: ${props =>
    props.subPlan
      ? '25px'
      : '10px'};
      right: 10px;
    }
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

  @media(max-width: 1080px) {
    overflow: ${props =>
    props.subPlan
      ? 'visible'
      : 'hidden'};

    h2 {
      justify-content: flex-start;
      text-decoration: none;
      margin-left: 25px;
      width: 150px;
    }
  }
`;

const DivBronzePlan = styled.div`
  display: flex;
  width: 255px;
  flex-direction: column;
  border: ${props =>
    props.subPlan === subscriptionPlans[1]
      ? '5px solid lime'
      : '5px solid transparent'};
  border-radius: 10px;
  background-color: #ca620d;
  font-weight: bold;
  height: 100%;
  position: relative;

  h4 {
    position: absolute;
    bottom: 0;
    text-align: center;
    width: 100%;
    user-select: none;
    
    @media(max-width: 1080px) {
      display: ${props =>
    props.subPlan === subscriptionPlans[1]
      ? 'visible'
      : 'none'};
      top: ${props =>
    props.subPlan === subscriptionPlans[1]
    && '1px'};
      text-align: ${props =>
    props.subPlan === subscriptionPlans[1]
    && 'right'};
      right: ${props =>
    props.subPlan === subscriptionPlans[1]
    && '50px'};
    margin-top: 23px;
    }
  }

  &:hover {
    opacity: ${props => (props.subPlan === subscriptionPlans[1] ? '1' : '0.6')};
  }

  @media(max-width: 1080px) {
    width: 100%;
    border-radius: 0;
    border: none; /* remove lime selection border first */
    border-top: 1px solid black;
  }
`;

const DivSilverPlan = styled.div`
  display: flex;
  width: 255px;
  flex-direction: column;
  border: ${props =>
    props.subPlan === subscriptionPlans[2]
      ? '5px solid lime'
      : '5px solid transparent'};
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
    
    @media(max-width: 1080px) {
      display: ${props =>
    props.subPlan === subscriptionPlans[2]
      ? 'visible'
      : 'none'};
      top: ${props =>
    props.subPlan === subscriptionPlans[2]
    && '1px'};
      text-align: ${props =>
    props.subPlan === subscriptionPlans[2]
    && 'right'};
      right: ${props =>
    props.subPlan === subscriptionPlans[2]
    && '50px'};
    margin-top: 23px;
    }
  }

  &:hover {
    opacity: ${props => (props.subPlan === subscriptionPlans[2] ? '1' : '0.6')};
  }

  @media(max-width: 1080px) {
    width: 100%;
    border-radius: 0;
    border: none; /* remove lime selection border first */
    border-top: 1px solid black;
  }
`;

const DivGoldPlan = styled.div`
  display: flex;
  width: 255px;
  flex-direction: column;
  border: ${props =>
    props.subPlan === subscriptionPlans[3]
      ? '5px solid lime'
      : '5px solid transparent'};
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
    
    @media(max-width: 1080px) {
      display: ${props =>
    props.subPlan === subscriptionPlans[3]
      ? 'visible'
      : 'none'};
      top: ${props =>
    props.subPlan === subscriptionPlans[3]
    && '1px'};
      text-align: ${props =>
    props.subPlan === subscriptionPlans[3]
    && 'right'};
      right: ${props =>
    props.subPlan === subscriptionPlans[3]
    && '50px'};
    margin-top: 23px;
    }
  }

  &:hover {
    opacity: ${props => (props.subPlan === subscriptionPlans[3] ? '1' : '0.4')};
  }

  @media(max-width: 1080px) {
    width: 100%;
    border-radius: 0;
    border: none; /* remove lime selection border first */
    border-top: 1px solid black;
    border-bottom: 1px solid black;
  }
`;

const DivButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 25px;
  width: 100%;
  justify-content: space-around;

  @media (max-width: 1080px){
    width: 70%;
    justify-content: space-between;
  }

  @media ${phoneL} {
    margin-top: 130px;
  }
`;

const CancelButton = styled.button`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: black;
  width: 200px;
  padding: 5px;
  background: rgb(242, 0, 0);
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
  border-top: 3px solid rgb(221, 0, 0);
  border-left: 3px solid rgb(221, 0, 0);
  border-bottom: 3px solid rgb(137, 0, 0);
  border-right: 3px solid rgb(137, 0, 0);
  outline: none;

  &:active {
    border-bottom: 3px solid rgb(221, 0, 0);
    border-right: 3px solid rgb(221, 0, 0);
    border-top: 3px solid rgb(137, 0, 0);
    border-left: 3px solid rgb(137, 0, 0);
  }

  @media ${phoneL} {
    width: 100%;
    padding: 15px 0;
    margin-left: 0;
  }
`;

const DivStripeCheckout = styled.div`
  @media ${phoneL} {
    width: 100%;
    margin-top: 25px;
  }
`;

const ButtonStripeCheckout = styled(StripeCheckout)`
  width: 200px;

  * {
    display: flex!important;
    height: 40px!important;
    justify-content: center;
    align-items: center;
    font-size: 20px!important;
  }

  @media ${phoneL} {
    width: 100%;
    border-radius: 0!important;

    * {
      padding: 15px 0!important;
      height: auto!important;
      border-radius: 0!important;
    }
  }
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class ChangeSubscriptionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subPlan: subscriptionPlans[1],
      username: ''
    }
  }

  selectSubPlan = sub => {
    this.setState({ subPlan: sub });
  };

  getUserTypeSelected = () => {
    return accountUserTypes[subscriptionPlans.indexOf(this.state.subPlan)];
  }

  getPaymentAmount = () => {
    switch (this.state.subPlan) {
      case subscriptionPlans[1]:
        return subscriptionPrices[1];
      case subscriptionPlans[2]:
        return subscriptionPrices[2];
      case subscriptionPlans[3]:
        return subscriptionPrices[3];
      default:
        return subscriptionPrices[0];
    }
  }

  getStripePayment = () => {
    switch (this.state.subPlan) {
      case subscriptionPlans[1]: // Bronze
        return stripePayFormat[0];
      case subscriptionPlans[2]: // Silver
        return stripePayFormat[1];
      case subscriptionPlans[3]: // Gold
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
        payment: this.getStripePayment(),
        description: `${this.state.subPlan.toUpperCase()} Plan`,
        email: this.state.email
      }
    }
    this.props.stripePayment(headersObj).then(() => this.props.changeUserType(this.props.profile.id, this.getUserTypeSelected()).then(() => this.props.setChangeSubModalRaised(null, false)));
  }

  render() {
    const { setChangeSubModalRaised } = this.props;
    const stripeAmount = this.getStripePayment();
    const stripeEmail = this.props.profile.email;
    const subPlan = `${this.state.subPlan.toUpperCase()} Plan`;
    return (
      <DivChangeSubModal ischangesubmodalraised={this.props.isChangeSubModalRaised.toString()}>
        <DivModalCloser onClick={(ev) => setChangeSubModalRaised(ev, false)} />
        <DivChangeSub>
          <DivHeaderTitle>
            <H1HeaderTitle>Change&nbsp;Account&nbsp;Subscription</H1HeaderTitle>
          </DivHeaderTitle>
          <FormChangeSub>
            <DivSelectBanners>
              <DivBanner
                onClick={() => this.selectSubPlan(subscriptionPlans[1])}
                subPlan={this.state.subPlan === subscriptionPlans[1]}
              >
                <DivBronzePlan subPlan={this.state.subPlan}>
                  <DivFeatures subPlan={this.state.subPlan === subscriptionPlans[1]}>
                    <h2>Bronze Plan</h2>
                    <ul>
                      {
                        subscriptionBronzeFeatures.map(feature => <li>{feature}</li>)
                      }
                    </ul>
                  </DivFeatures>
                  <h4>{subscriptionPrices[1]}</h4>
                </DivBronzePlan>
                <input
                  type='radio'
                  value='bronze-plan'
                  name='sub-plan'
                  checked={
                    this.state.subPlan === subscriptionPlans[1]
                  }
                  readOnly
                />
              </DivBanner>
              <DivBanner
                onClick={() => this.selectSubPlan(subscriptionPlans[2])}
                subPlan={this.state.subPlan === subscriptionPlans[2]}
              >
                <DivSilverPlan subPlan={this.state.subPlan}>
                  <DivFeatures subPlan={this.state.subPlan === subscriptionPlans[2]}>
                    <h2>Silver Plan</h2>
                    <ul>
                      {
                        subscriptionSilverFeatures.map(feature => <li>{feature}</li>)
                      }
                    </ul>
                  </DivFeatures>
                  <h4>{subscriptionPrices[2]}</h4>
                </DivSilverPlan>
                <input
                  type='radio'
                  value='silver-plan'
                  name='sub-plan'
                  checked={
                    this.state.subPlan === subscriptionPlans[2]
                  }
                  readOnly
                />
              </DivBanner>
              <DivBanner
                onClick={() => this.selectSubPlan(subscriptionPlans[3])}
                subPlan={this.state.subPlan === subscriptionPlans[3]}
              >
                <DivGoldPlan subPlan={this.state.subPlan}>
                  <DivFeatures subPlan={this.state.subPlan === subscriptionPlans[3]}>
                    <h2>Gold Plan</h2>
                    <ul>
                      {
                        subscriptionGoldFeatures.map(feature => <li>{feature}</li>)
                      }
                    </ul>
                  </DivFeatures>
                  <h4>{subscriptionPrices[3]}</h4>
                </DivGoldPlan>
                <input
                  type='radio'
                  value='gold-plan'
                  name='sub-plan'
                  checked={
                    this.state.subPlan === subscriptionPlans[3]
                  }
                  readOnly
                />
              </DivBanner>
            </DivSelectBanners>
          </FormChangeSub>
          <DivButtons>
            <CancelButton type='button' onClick={(ev) => setChangeSubModalRaised(ev, false)}>Cancel</CancelButton>
            <DivStripeCheckout>
              <ButtonStripeCheckout
                token={this.onToken}
                stripeKey={stripeToken}
                email={stripeEmail}
                description={subPlan}
                amount={stripeAmount}
              />
            </DivStripeCheckout>
          </DivButtons>
        </DivChangeSub>
      </DivChangeSubModal>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profilesData.singleProfileData[0]
  };
};

export default connect(
  mapStateToProps,
  { stripePayment, changeUserType }
)(ChangeSubscriptionModal);