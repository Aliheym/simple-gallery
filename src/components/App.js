import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Header } from './Header';
import { CollectionsList } from './CollectionsList';
import { Upload } from './Upload';
import { GalleryList } from './GalleryList';
import { ImagePage } from './ImagePage';
import { About } from './About';

import styled from 'styled-components';
import GlobalStyles from '../GlobalStyles';

const AppContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
`;

const AppWrapper = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 300px 1fr;
`;

function App() {
  return (
    <AppContainer>
      <GlobalStyles />
      <Router>
        <Header />

        <AppWrapper>
          <Switch>
            <Route exact path="/">
              <CollectionsList />
              <GalleryList />
            </Route>
            <Route exact path="/collection/:collectionId">
              <CollectionsList />
              <GalleryList />
            </Route>
            <Route exact path="/upload">
              <CollectionsList />
              <Upload />
            </Route>
            <Route exact path="/photo/:photoId" component={ImagePage} />
            <Route exact path="/about" component={About} />
          </Switch>
        </AppWrapper>
      </Router>
    </AppContainer>
  );
}

export { App };
