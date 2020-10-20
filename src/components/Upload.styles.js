import styled from 'styled-components';

export const UploadWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  border: ${({ dragOver }) =>
    dragOver ? '5px dashed rgba(250, 250, 0, 0.3)' : 'none'};

  &::after {
    content: '';

    display: ${({ dragOver }) => (dragOver ? 'block' : 'none')};

    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background-color: rgba(250, 250, 0, 0.3);
  }
`;

export const UploadLabel = styled.p`
  display: block;

  font-size: 3rem;
  font-weight: 400;
  text-align: center;
  color: var(--white);
`;

export const Text = styled.p`
  font-size: 1.3rem;
  color: var(--gray);
`;

export const UploadAction = styled.button`
  font-size: 3rem;
  text-align: center;
  font-weight: 700;
  text-decoration: none;
  color: var(--white);

  border: none;
  outline: none;
  background-color: transparent;

  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: var(--active);
  }
`;

export const FileInput = styled.input`
  display: none;

  opacity: 0;
  visibility: hidden;
`;
