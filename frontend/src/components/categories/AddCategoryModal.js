import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { addCategory } from '../../store/actions/index.js';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 8001;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  user-select: none;

  
`;

const DivModal = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 8003;
  background: rgb(248,249,254);
  padding: 25px;
  border-radius: 10px;
  box-sizing: border-box;
  width: 590px;

  h1 {
    width: 100%;
    text-align: center;
    margin: 0 0 0.67em 0;
  }
`;

const DivModalCloser = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 8002;
`;

const FormContent = styled.form`
  display: flex;
  justify-content: space-between;
`;

const DivLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 34%;
  align-items: center;
  pointer-events: none;

  button {
    padding: 7px 0px;
    width: 100%;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    pointer-events: auto;

    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }
`;

const ImgPreview = styled.img`
  max-width: 50px;
  max-height: 50px;
  width: auto;
  height: auto;
  margin-bottom: 20px;
`;

const DivRight = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  justify-content: space-between;
`;

const DivName = styled.div`

  label {
    margin-right: 15px;
  }

  input {
    outline: none;
    padding: 5px;
    width: 240px;
    border-radius: 4px;
    box-sizing: border-box;
    &:focus {
      border-top: 2px solid rgb(0, 94, 160);
      border-left: 2px solid rgb(0, 94, 160);
      border-bottom: 2px solid rgba(63, 168, 234, 0.1);
      border-right: 2px solid rgba(63, 168, 234, 0.1);
    }
  }
`;

const DivButtons = styled.div`
  align-self: flex-end;

  button {
    padding: 7px 0px;
    width: 100px;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    pointer-events: auto;
    font-weight: bold;
    font-size: 18px;
    &:last-child{
      background-color: rgb(0, 200, 0);
      border-top: 2px solid rgb(0, 179, 0);
      border-left: 2px solid rgb(0, 179, 0);
      border-bottom: 2px solid rgb(0, 95, 0);
      border-right: 2px solid rgb(0, 95, 0);

      &:active {
        background-color: rgb(0, 200, 0)!important;
        border-bottom: 2px solid rgb(0, 179, 0);
        border-right: 2px solid rgb(0, 179, 0);
        border-top: 2px solid rgb(0, 95, 0);
        border-left: 2px solid rgb(0, 95, 0);
      }

      &:hover {
        background-color: rgb(0, 255, 0);
      }
    }
    

    &:not(:last-child) {
      margin-right: 25px;
      background-color: rgb(210, 0, 0);
      border-top: 2px solid rgb(189, 0, 0);
      border-left: 2px solid rgb(189, 0, 0);
      border-bottom: 2px solid rgb(115, 0, 0);
      border-right: 2px solid rgb(115, 0, 0);

      &:active {
        background-color: rgb(210, 0, 0)!important;
        border-bottom: 2px solid rgb(189, 0, 0);
        border-right: 2px solid rgb(189, 0, 0);
        border-top: 2px solid rgb(115, 0, 0);
        border-left: 2px solid rgb(115, 0, 0);
      }

      &:hover {
        background-color: rgb(255, 0, 0);
      }
    }
  }
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class AddCategoryModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      iconPreviewBase64: ''
    }
  }

  handleSubmit = ev => {
    ev.preventDefault();
    const { name } = this.state;
    const { addCategory, historyPush, setAddCatModalRaised } = this.props;
    return Promise.resolve(setAddCatModalRaised(ev, false)).then(() => addCategory(name, historyPush));
  };
  handleInputChange = ev => this.setState({ [ev.target.name]: ev.target.value });

  render() {
    const { setAddCatModalRaised } = this.props;
    const { name } = this.state;

    return (
      <ModalBackground>
        <DivModalCloser onClick={(ev) => setAddCatModalRaised(ev, false)} />
        <DivModal>
          <h1>Add&nbsp;Category</h1>
          <FormContent>
            <DivLeft>
              <ImgPreview src={require('../../assets/img/CategoryBook2.png')} alt='icon' />
              <button onClick={(ev) => setAddCatModalRaised(ev, false)}>Select Icons From List</button>
              <button onClick={(ev) => setAddCatModalRaised(ev, false)}>Select Icons From File</button>
              <button onClick={(ev) => setAddCatModalRaised(ev, false)}>Select Icons From URL</button>
            </DivLeft>
            <DivRight>
              <DivName>
                <label>Name:</label>
                <input
                  type='text'
                  placeholder='Enter category name'
                  name='name'
                  value={name}
                  onChange={this.handleInputChange}
                />
              </DivName>
              <DivButtons>
                <button type='button' onClick={(ev) => setAddCatModalRaised(ev, false)}>Cancel</button>
                <button type='button' onClick={this.handleSubmit}>Submit</button>
              </DivButtons>
            </DivRight>

          </FormContent>
        </DivModal>
      </ModalBackground>
    );
  }
}

export default connect(null, { addCategory })(AddCategoryModal);