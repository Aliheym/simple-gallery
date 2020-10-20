import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaPlus } from 'react-icons/fa';

import {
  CollectionWrapper,
  CollectionLink,
  CollectionTitle,
  CollectionList,
  CollectionDigit,
  CollectionForm,
  CollectionButton,
  CollectionInput,
} from './CollectionsList.styles';
import { Spinner } from './Spinner';

import { loadCollections, addCollection } from '../redux/actions/collections';

const isLinkActive = (match, location, collectionId) => {
  if (match) return true;

  const { state } = location;

  return state && state.activeCollection === collectionId;
};

const renderCollectionLink = ({ id, title, count }) => {
  return (
    <li key={id}>
      <CollectionLink
        to={`/collection/${id}`}
        activeClassName="active"
        isActive={(match, location) => isLinkActive(match, location, id)}
      >
        {title} <CollectionDigit>{count}</CollectionDigit>
      </CollectionLink>
    </li>
  );
};

function CollectionsList() {
  const [newCollectionTitle, setNewCollectionTitle] = useState('');
  const [showForm, setShowForm] = useState(false);

  const collections = useSelector((state) => state.collections.items);
  const status = useSelector((state) => state.collections.status);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCollections());
  }, [dispatch]);

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    const title = newCollectionTitle.trim();

    if (!title) {
      setShowForm(false);
      setNewCollectionTitle('');

      return;
    }

    const exists = collections.find(
      (item) => item.title.toLowerCase() === title.toLowerCase()
    );

    if (exists) return;

    dispatch(
      addCollection({
        title,
        count: 0,
        createdAt: Date.now(),
      })
    );

    setShowForm(false);
    setNewCollectionTitle('');
  };

  return (
    <CollectionWrapper>
      <CollectionLink
        exact
        to="/"
        activeClassName="active"
        isActive={(match, location) => isLinkActive(match, location, '')}
      >
        All Photos
      </CollectionLink>
      <CollectionTitle>Collections</CollectionTitle>
      {status === 'loading' ? (
        <Spinner />
      ) : (
        <CollectionList>{collections.map(renderCollectionLink)}</CollectionList>
      )}
      {showForm ? (
        <CollectionForm action="/" method="POST" onSubmit={onFormSubmit}>
          <CollectionInput
            autoFocus
            type="text"
            placeholder="Input a name of the collection"
            value={newCollectionTitle}
            onChange={(evt) => setNewCollectionTitle(evt.target.value)}
            onBlur={onFormSubmit}
          />
        </CollectionForm>
      ) : (
        <CollectionButton onClick={() => setShowForm(true)} type="button">
          <FaPlus /> Create A New Collection
        </CollectionButton>
      )}
    </CollectionWrapper>
  );
}

export { CollectionsList };
