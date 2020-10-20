import React from 'react';
import { ImSpinner9 } from 'react-icons/im';

import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const SpinnerWrapper = styled.div`
  display: block;
  padding: 1rem 2rem;

  font-size: ${(props) => props.size};
  text-align: center;
  color: ${(props) => props.color};

  svg {
    animation: ${rotate} 1s linear infinite;
  }
`;

function Spinner({ color = 'var(--white)', size = '5rem' }) {
  return (
    <SpinnerWrapper>
      <ImSpinner9 color={color} size={size} />
    </SpinnerWrapper>
  );
}

export { Spinner };
