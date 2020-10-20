import {
  LOAD_COLLECTIONS,
  LOAD_COLLECTIONS_SUCCESS,
  ADD_COLLECTION,
  UPDATE_COLLECTION,
  DELETE_COLLECTION,
} from '../constants/collections';

import DB from '../../services/DB';
import { nanoid } from 'nanoid';

export function loadCollections() {
  return async (dispatch) => {
    dispatch({
      type: LOAD_COLLECTIONS,
    });

    const collections = await DB.getAll('collections');

    dispatch({
      type: LOAD_COLLECTIONS_SUCCESS,
      payload: collections.sort((a, b) => a.createdAt - b.createdAt),
    });
  };
}

export function addCollection(data) {
  return async (dispatch) => {
    const collection = {
      ...data,
      id: nanoid(),
    };
    await DB.add('collections', collection);

    dispatch({
      type: ADD_COLLECTION,
      payload: collection,
    });
  };
}

export function updateCollection(collectionId) {
  return async (dispatch, getState) => {
    const collection = getState().collections.items.find(
      (collection) => collection.id === collectionId
    );

    if (!collection) return;

    const newCount = await DB.countWhere(
      'photos',
      'collectionId',
      collectionId
    );

    const updatedCollection = {
      ...collection,
      count: newCount,
    };

    await DB.add('collections', updatedCollection, collectionId);

    dispatch({
      type: UPDATE_COLLECTION,
      payload: updatedCollection,
    });
  };
}

export function deleteCollection(collectionId) {
  return async (dispatch) => {
    await DB.delete('collections', collectionId);

    const photos = await DB.getWhere('photos', 'collectionId', collectionId);
    const newPhotos = photos.map((photo) => ({
      ...photo,
      collectionId: '',
    }));

    await DB.addMany('photos', newPhotos);

    dispatch({
      type: DELETE_COLLECTION,
      payload: collectionId,
    });
  };
}

export function deleteCollectionWithPhotos(collectionId) {
  return async (dispatch) => {
    await DB.delete('collections', collectionId);

    const photos = await DB.getWhere('photos', 'collectionId', collectionId);

    await DB.deleteMany(
      'photos',
      photos.map((photo) => photo.id)
    );

    dispatch({
      type: DELETE_COLLECTION,
      payload: collectionId,
    });
  };
}
