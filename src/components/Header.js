import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import { FaList, FaPlus, FaSearch } from 'react-icons/fa';
import {
  HeaderWrapper,
  HeaderLink,
  SearchForm,
  SearchContainer,
  SearchInput,
  ActionLink,
} from './Header.styles';

function getActiveCollection(path) {
  const startPath = '/collection/';
  return path.startsWith(startPath) ? path.slice(startPath.length) : '';
}

function Header() {
  const [searchValue, setSearchValue] = useState('');

  const history = useHistory();
  const location = useLocation();

  const activeCollection = getActiveCollection(location.pathname);

  const onSearchFormSubmit = (evt) => {
    evt.preventDefault();

    if (!searchValue) return;

    const isTag = searchValue.charAt(0) === '@'; // search by tag (e.g @tag)
    const value = isTag ? searchValue.slice(1) : searchValue;

    let search = `?q=${value}`;
    if (isTag) search += '&isTag';

    setSearchValue('');

    history.push({
      pathname: activeCollection ? `/collection/${activeCollection}` : '/',
      search,
    });
  };

  const isUpload = location.pathname === '/upload';

  let link, linkText, linkIcon;
  if (isUpload) {
    const { state } = location;

    link = {
      pathname:
        state && state.activeCollection
          ? `/collection/${state.activeCollection}`
          : '/',
    };
    linkIcon = <FaList />;
    linkText = 'View photos';
  } else {
    link = {
      pathname: '/upload',
      state: { activeCollection },
    };
    linkIcon = <FaPlus />;
    linkText = 'Upload';
  }

  return (
    <HeaderWrapper>
      <div>
        <HeaderLink exact to="/" activeClassName="active">
          All photos
        </HeaderLink>
        <HeaderLink to="/about" activeClassName="active">
          About
        </HeaderLink>
      </div>
      <div>
        <SearchForm onSubmit={onSearchFormSubmit}>
          <SearchContainer>
            <FaSearch />
            <SearchInput
              type="search"
              placeholder="Search..."
              value={searchValue}
              onChange={(evt) => setSearchValue(evt.target.value)}
            />
          </SearchContainer>
        </SearchForm>
        <ActionLink to={link}>
          {linkIcon} {linkText}
        </ActionLink>
      </div>
    </HeaderWrapper>
  );
}

export { Header };
