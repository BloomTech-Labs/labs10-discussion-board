import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { addCategory, displayError } from '../../store/actions/index.js';

// components
import { IconList } from '../index.js';

// globals
import { phoneL, topHeaderHeight, backendUrl } from '../../globals/globals.js';

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

  @media ${phoneL} {
    z-index: 9950;
    margin-top: ${topHeaderHeight};
  }
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

    @media ${phoneL} {
      height: 10%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  @media ${phoneL} {
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    padding: 0;
    border-radius: 0;
  }
`;

const DivModalCloser = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 8002;

  @media ${phoneL} {
    display: none;
  }
`;

const FormContent = styled.form`
  display: flex;
  justify-content: space-between;

  @media ${phoneL} {
    height: 90%;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: ${topHeaderHeight};
  }
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

    @media ${phoneL} {
      padding: 15px 0;
      width: 50%;
    }
  }

  @media ${phoneL} {
    align-items: center;
    width: 100%;
    height: 40%;
    padding-top: 20px;
  }
`;

const ImgPreview = styled.i`
  max-width: 50px;
  max-height: 50px;
  font-size: 2.5rem;
  width: auto;
  height: auto;
  margin-bottom: 20px;
`;

const DivRight = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  justify-content: space-between;

  @media ${phoneL} {
    width: 100%;
    height: 60%;
    justify-content: center;
    align-items: center;
  }
`;

const DivName = styled.div`

  label {
    margin-right: 15px;
    @media ${phoneL} {
      align-self: flex-start;
      margin: 0;
    }
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

    @media ${phoneL} {
      padding: 10px;
      width: 100%;
    }
  }

  @media ${phoneL} {
    display: flex;
    height: 20%;
    width: 80%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
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

      @media ${phoneL} {
        margin: 0;
      }
    }

    @media ${phoneL} {
      width: 100%;
      padding: 20px;
      border-radius: 0;
    }
  }

  @media ${phoneL} {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column-reverse;
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
      icon: 'fas fa-book-open',
      showIconListComponent: false,
      iconList: [],
    };
  };
  handleSubmit = ev => {
    ev.preventDefault();
    const { name, icon } = this.state;
    const newCategory = { name, icon };
    const { addCategory, historyPush, setAddCatModalRaised } = this.props;
    return Promise.resolve(setAddCatModalRaised(ev, false))
      .then(() => addCategory(newCategory, historyPush));
  };
  handleInputChange = ev => this.setState({ [ev.target.name]: ev.target.value });
  toggleIconList = () => this.setState({ showIconListComponent: !this.state.showIconListComponent });
  setIcon = icon => this.setState({ icon, showIconListComponent: false });
  componentDidMount = () => {
    const user_id = localStorage.getItem('symposium_user_id');
    const token = localStorage.getItem('symposium_token');
    const headers = { headers: { Authorization: token } };
    const { displayError } = this.props;
    return axios.get(`${ backendUrl }/categories/category-icons/${ user_id }`, headers)
      .then(res => this.setState({ iconList: res.data }))
      .catch(err => {
        const errMsg = err.response ? err.response.data.error : err.toString();
        return displayError(errMsg);
      });
  };
  render() {
    const { setAddCatModalRaised } = this.props;
    const { name, icon, iconList, showIconListComponent } = this.state;
    return (
      <ModalBackground>
        <DivModalCloser onClick={(ev) => setAddCatModalRaised(ev, false)} />
        <DivModal>
          <h1>Add&nbsp;Category</h1>
          <FormContent onSubmit={this.handleSubmit}>
            <DivLeft>
              <ImgPreview className = { icon } alt='icon' />
              <button type='button' onClick={this.toggleIconList}>Select Icons From List</button>
              {/* <button onClick={(ev) => setAddCatModalRaised(ev, false)}>Select Icons From File</button> */}
              {/* <button onClick={(ev) => setAddCatModalRaised(ev, false)}>Select Icons From URL</button> */}
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
                  autoComplete='off'
                />
              </DivName>
              <DivButtons>
                <button type='button' onClick={(ev) => setAddCatModalRaised(ev, false)}>Cancel</button>
                <button type='submit'>Submit</button>
              </DivButtons>
            </DivRight>
          </FormContent>
          {
            showIconListComponent &&
            <IconList
              selectedIcon = { icon }
              iconList = { iconList }
              toggleIconList = { this.toggleIconList }
              setIcon = { this.setIcon }
            />
          }
        </DivModal>
      </ModalBackground>
    );
  }
};

export default connect(null, { addCategory, displayError })(AddCategoryModal);
