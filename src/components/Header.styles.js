import { NavLink, Link } from 'react-router-dom';

import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 3rem;
  border-bottom: 1px solid var(--gray);

  font-size: 1.6rem;
  color: var(--white);
`;

export const HeaderLink = styled(NavLink)`
  margin-right: 2rem;

  text-decoration: none;
  color: var(--gray);

  transition: color 0.2s;

  &.${(props) => props.activeClassName} {
    color: var(--white);
  }

  &:hover {
    color: var(--white);
  }
`;

export const ActionLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 1rem 2rem;

  font-size: 1.5rem;
  text-decoration: none;
  text-align: center;
  vertical-align: middle;
  color: var(--white);

  border: 1px solid var(--gray);
  border-radius: 5rem;
  cursor: pointer;

  transition: background-color 0.3s;

  &:hover {
    background-color: var(--white);
    border-color: var(--white);
    color: var(--black);
  }

  svg {
    margin-right: 1rem;
  }
`;

export const SearchForm = styled.form`
  display: inline-block;
  margin-right: 3rem;

  vertical-align: middle;
`;

export const SearchContainer = styled.p`
  display: inline-flex;
  align-items: center;
  margin: 0;
  padding: 0;
  padding-right: 1rem;
  padding-left: 2rem;
  overflow: hidden;

  color: var(--gray);

  border: 1px solid;
  border-radius: 5rem;

  &:focus-within {
    color: var(--white);
  }
`;

export const SearchInput = styled.input`
  max-width: 15rem;
  padding: 1rem;

  font: inherit;
  color: var(--white);

  background-color: transparent;
  border: none;
  outline: none;
`;
