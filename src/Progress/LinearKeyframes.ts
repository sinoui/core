import { keyframes } from 'styled-components';

const inDeterminatePrimaryBarKeyFrames = keyframes`
  0% {
    left: -35%;
  }
  60% {
    left: 100%;
    right: -90%;
  }
  100% {
    left: 100%;
    right: -90%;
  }
`;

const inDeterminateSecondaryBarKeyFrames = keyframes`
  0% {
    left: -200%;
    right: 100%;
  }
  60% {
    left: 107%;
    right: -8%;
  }
  100% {
    left: 107%;
    right: -8%;
  }
`;

const determinateBuefferDotKeyframes = keyframes`
  0% {
    opacity: 1;
    background-position: 0px -23px;
  }
  50% {
    opacity: 0;
    background-position: 0px -23px;
  }
  100% {
    opacity: 1;
    background-position: -200px -23px;
  }
`;

export {
  inDeterminatePrimaryBarKeyFrames,
  inDeterminateSecondaryBarKeyFrames,
  determinateBuefferDotKeyframes,
};
