import styled from 'styled-components';

export const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  align-content: start;
`;

export const GalleryImage = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  object-fit: cover;
  object-position: center;
  background-color: var(--gray-300);

  filter: grayscale(100%);
  transition: filter 0.5s;

  &:hover {
    filter: grayscale(0);
  }
`;

export const GalleryImageContainer = styled.div`
  position: relative;
  width: 100%;

  &::before {
    content: '';
    display: block;
    width: 100%;

    padding-top: 100%;
  }
`;

export const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  margin-right: 1rem;
  padding: 1rem 2rem;

  font: inherit;
  font-size: 1.6rem;
  color: var(--white);

  background-color: var(--gray-700);
  border: none;
  border-radius: 0.2rem;

  cursor: pointer;
  transition: background-color 0.3s;

  svg {
    margin-right: 1rem;
  }

  &:hover {
    background-color: var(--gray);
  }

  &:disabled {
    background-color: var(--gray-300);
    cursor: not-allowed;
  }
`;

export const ActionContainer = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: flex-end;
`;

export const EmptyText = styled.div`
  padding: 15rem 10rem;

  font-size: 4rem;
  text-align: center;
  color: var(--white);
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;
