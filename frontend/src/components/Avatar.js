import React from 'react';
import styled from 'styled-components';

const AvatarWrapper = styled.div`
  display: inline-block;
  min-height: ${({ height }) => height};
  min-width: ${({ width }) => width};
  background-image: ${({ src }) => `url('${src}')`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const Avatar = ({ height, width, src }) => {
  return <AvatarWrapper height={height} width={width} src={src} />;
};

export default Avatar;
