import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { BsCloudUpload } from 'react-icons/bs';

import { Spinner } from './Spinner';

import DB from '../services/DB';
import { updateCollection } from '../redux/actions/collections';

import { nanoid } from 'nanoid';

import {
  UploadWrapper,
  UploadAction,
  UploadLabel,
  FileInput,
  Text,
} from './Upload.styles';

const accepted = ['image/png', 'image/jpeg', 'image/webp'];

const validateImage = ({ type, size }) => {
  return accepted.includes(type) && size / 1e6 <= 10;
};

const uploadFiles = async (files, collectionId) => {
  const photos = files.map((file) => ({
    id: nanoid(),
    file,
    collectionId,
    name: '',
    description: '',
    tags: [],
  }));

  await DB.addMany('photos', photos);
};

function Upload() {
  const [dragOver, setDragOver] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState('idle');
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const { state } = useLocation();
  const collectionId =
    state && state.activeCollection ? state.activeCollection : '';

  const onDragEnter = (evt) => {
    evt.preventDefault();
    setDragOver(true);
  };

  const onDragLeave = (evt) => {
    evt.preventDefault();
    setDragOver(false);
  };

  const onDrop = (evt) => {
    evt.preventDefault();

    const files = Array.from(evt.dataTransfer.files);
    upload(files);
  };

  const onFileChange = (evt) => {
    evt.preventDefault();

    const files = Array.from(evt.target.files);
    upload(files);

    evt.target.value = '';
  };

  const upload = async (files) => {
    setDragOver(false);
    setLoadingStatus('loading');

    const isError = files.some((file) => !validateImage(file));

    if (isError) {
      setLoadingStatus('error');
      setError("Sorry! Can't load invalid image(s).");

      return;
    }

    await uploadFiles(files, collectionId);

    setLoadingStatus('succeeded');
    dispatch(updateCollection(collectionId));
  };

  const reset = () => {
    setError(null);
    setLoadingStatus('idle');
  };

  let text;

  if (error) {
    text = (
      <UploadLabel>
        {error}{' '}
        <UploadAction type="button" onClick={reset}>
          Try again!
        </UploadAction>
      </UploadLabel>
    );
  } else if (loadingStatus === 'loading') {
    text = <Spinner />;
  } else if (loadingStatus === 'succeeded') {
    text = (
      <UploadLabel>
        Done!{' '}
        <UploadAction type="button" onClick={reset}>
          Upload more
        </UploadAction>
      </UploadLabel>
    );
  } else {
    text = (
      <UploadLabel>
        <UploadAction htmlFor="field-file" as="label">
          Choose a photos
        </UploadAction>{' '}
        or drag them here
      </UploadLabel>
    );
  }

  return (
    <UploadWrapper
      dragOver={dragOver}
      onDragOver={onDragEnter}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <FileInput
        type="file"
        id="field-file"
        multiple
        onChange={onFileChange}
        accept={accepted.join(', ')}
      />
      <BsCloudUpload size="25rem" color="var(--white)" />
      {text}
      <Text>JPG, PNG or WEBP images - max 10 MB each</Text>
    </UploadWrapper>
  );
}

export { Upload };
