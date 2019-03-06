import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';

const AvatarWrapper = styled.div`
  display: inline-block;
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  background-image: ${({ src }) => `url('${src}')`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 50%;
`;

const Avatar = ({ height, width, avatar, src }) => {
  return <AvatarWrapper height={height} width={width} src={src || avatar} />;
};

const mapStateToProps = state => ({
	avatar: state.users.avatar,
  });

export default connect(mapStateToProps, {})(Avatar);
