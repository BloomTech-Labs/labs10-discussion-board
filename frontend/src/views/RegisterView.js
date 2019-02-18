import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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
  height: 80px;
  margin: 0;
  background-color: lightgray;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DivSubscriptionPlan = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 25px 0;
  border-bottom: 2px solid black;
  width: 100%;
`;
const DivFreePlan = styled.div``;

const DivBronzePlan = styled.div``;

const DivSilverPlan = styled.div``;

const DivGoldPlan = styled.div``;

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
      subPlan: 'Free',
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
      subPlan: 'Free',
      username: '',
      password: '',
      email: '',
      signature: '',
      avatar: ''
    });
  }

  clearRegisterState = () => {
    this.setState({
      subPlan: 'Free',
      username: '',
      password: '',
      email: '',
      signature: '',
      avatar: ''
    });
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
        <H1Register>Register</H1Register>
        <Form>
          <DivSubscriptionPlan>
            <DivFreePlan>Free Plan</DivFreePlan>
            <DivBronzePlan>Bronze Plan</DivBronzePlan>
            <DivSilverPlan>Silver Plan</DivSilverPlan>
            <DivGoldPlan>Gold Plan</DivGoldPlan>
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
