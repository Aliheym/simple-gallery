import { NavLink } from 'react-router-dom';

import styled from 'styled-components';

export const CollectionWrapper = styled.div`
  height: 100%;

  background-color: var(--black);
  border-right: 1px solid var(--gray);
`;

export const CollectionList = styled.ul`
  margin: 0;
  padding: 0;

  list-style-type: none;
`;

export const CollectionLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 1.5rem 3rem;
  margin-top: -1px;

  font-size: 1.6rem;
  text-decoration: none;
  color: var(--white);

  border-top: 1px solid var(--gray);
  border-bottom: 1px solid var(--gray);

  transition: background-color 0.3s;

  &:hover {
    background-color: var(--active);
  }

  &.${(props) => props.activeClassName} {
    background-color: var(--active);
  }
`;

export const CollectionTitle = styled.h3`
  margin: 0;
  padding: 1.5rem 3rem;
  overflow: hidden;

  font-size: 2rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--white);

  background-color: transparent;
`;

export const CollectionDigit = styled.span`
  margin-left: auto;

  font-size: 0.9em;
  color: #333;
`;

export const CollectionButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1.5rem 3rem;
  margin-top: -1px;

  font: inherit;
  font-size: 1.6rem;
  text-align: left;
  color: var(--gray);

  border: none;
  outline: none;
  border-top: 1px solid var(--gray);
  border-bottom: 1px solid var(--gray);

  background-color: transparent;
  cursor: pointer;
  transition: color 0.3s;

  svg {
    margin-right: 1rem;
  }

  &:hover {
    color: var(--active);
  }
`;

export const CollectionForm = styled.form`
  width: 100%;
  padding: 1rem 3rem;
  margin-top: -1px;

  font-size: 1.6rem;
  text-align: left;
  color: var(--white);

  border: none;
  outline: none;
  border-top: 1px solid var(--gray);
  border-bottom: 1px solid var(--gray);
`;

export const CollectionInput = styled.input`
  padding: 0.5rem;

  font: inherit;
  color: inherit;

  border: none;
  outline: none;
  background-color: transparent;
`;
