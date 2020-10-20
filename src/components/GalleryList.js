import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaTrash, FaDownload } from 'react-icons/fa';

import { Spinner } from './Spinner';

import DB from '../services/DB';
import usePagination from '../hooks/usePagination';
import { normalizePhoto, downloadBlob } from '../services/photos';
import {
  deleteCollection,
  deleteCollectionWithPhotos,
} from '../redux/actions/collections';

import JSZip from 'jszip';

import {
  ActionContainer,
  ActionButton,
  GalleryGrid,
  GalleryImageContainer,
  GalleryImage,
  Pagination,
  EmptyText,
} from './GalleryList.styles';

import { ActionLink } from './Header.styles';

const renderImage = ({ id, name, url }) => {
  return (
    <GalleryImageContainer key={id}>
      <Link to={`/photo/${id}`}>
        <GalleryImage src={url} alt={name} />
      </Link>
    </GalleryImageContainer>
  );
};

const downloadZip = async (collectionId) => {
  const zip = new JSZip();
  const photos = await DB.getWhere('photos', 'collectionId', collectionId);
  const collection = await DB.get('collections', collectionId);

  photos.forEach(({ file }) => zip.file(file.name, file));
  const content = await zip.generateAsync({ type: 'blob' });

  downloadBlob(`${collection.title}.zip`, content);
};

function GalleryList() {
  const [photos, setPhotos] = useState([]);
  const [status, setStatus] = useState('idle');

  const dispatch = useDispatch();
  const history = useHistory();
  const { collectionId = '' } = useParams();
  const { search } = useLocation();
  const {
    items,
    onNextPage,
    onPrevPage,
    nextDisabled,
    prevDisabled,
  } = usePagination(photos, 6);

  useEffect(() => {
    let normalizedPhotos;

    async function loadPhotos() {
      setStatus('loading');
      let photos;

      if (collectionId) {
        photos = await DB.getWhere('photos', 'collectionId', collectionId);
      } else {
        photos = await DB.getAll('photos');
      }

      normalizedPhotos = photos.map(normalizePhoto);

      const searchParams = new URLSearchParams(search);
      const searchQuery = searchParams.get('q');
      const isTag = searchParams.has('isTag');

      if (searchQuery) {
        setPhotos(
          normalizedPhotos.filter((photo) =>
            (isTag ? photo.tags : photo.name).includes(searchQuery)
          )
        );
      } else {
        setPhotos(normalizedPhotos);
      }

      setStatus('succeeded');
    }

    loadPhotos();

    return () => {
      normalizedPhotos &&
        normalizedPhotos.forEach((photo) => URL.revokeObjectURL(photo.url));
    };
  }, [collectionId, search]);

  const onDelete = async () => {
    const isOk = window.confirm(
      'Are you sure you want to delete the collection?'
    );

    if (!isOk) return;

    await dispatch(deleteCollection(collectionId));
    history.push('/');
  };

  const onDeleteWithPhotos = async () => {
    const isOk = window.confirm(
      'Are you sure you want to delete the collection with all the photos?'
    );

    if (!isOk) return;

    await dispatch(deleteCollectionWithPhotos(collectionId));
    history.push('/');
  };

  if (status === 'loading') {
    return <Spinner />;
  }

  let pagination = null;
  if (items.length !== photos.length) {
    pagination = (
      <Pagination>
        <ActionButton
          type="button"
          onClick={onPrevPage}
          disabled={prevDisabled}
        >
          Previous
        </ActionButton>
        <ActionButton
          type="button"
          onClick={onNextPage}
          disabled={nextDisabled}
        >
          Next
        </ActionButton>
      </Pagination>
    );
  }

  return (
    <div>
      {collectionId && (
        <ActionContainer>
          <ActionButton
            type="button"
            onClick={() => downloadZip(collectionId)}
            disabled={!photos.length}
          >
            <FaDownload /> Download .zip
          </ActionButton>

          <ActionButton type="button" onClick={onDelete}>
            <FaTrash /> Delete only collection
          </ActionButton>

          <ActionButton type="button" onClick={onDeleteWithPhotos}>
            <FaTrash />
            Delete collection with all photos
          </ActionButton>
        </ActionContainer>
      )}

      {items.length ? (
        <GalleryGrid>{items.map(renderImage)}</GalleryGrid>
      ) : (
        <EmptyText>
          Empty{' '}
          <ActionLink
            to={{
              pathname: '/upload',
              state: { activeCollection: collectionId },
            }}
          >
            Upload
          </ActionLink>
        </EmptyText>
      )}
      {pagination}
    </div>
  );
}

export { GalleryList };
