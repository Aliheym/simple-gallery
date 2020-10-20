import React, { useState, useEffect, useRef, useReducer } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FaTrash, FaDownload } from 'react-icons/fa';
import { InputTag } from './InputTag';

import { useDispatch } from 'react-redux';
import { updateCollection } from '../redux/actions/collections';

import DB from '../services/DB';
import { normalizePhoto, downloadBlob, byteSize } from '../services/photos';

import {
  PageWrapper,
  ImageContainer,
  Image,
  Metadata,
  MetadataItem,
  FormContainer,
  ActionContainer,
  Textarea,
  Label,
  Input,
  Name,
  Value,
} from './ImagePage.styles';

import { ActionButton } from './GalleryList.styles';

const photoReducer = (state, action) => {
  switch (action.type) {
    case 'init':
      return action.payload;
    case 'update':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const updatePhoto = async (photo, file) => {
  if (!photo || !file) return;

  const newPhoto = {
    ...photo,
    url: undefined,
    file,
  };

  await DB.add('photos', newPhoto);
};

const getOrientation = (width, height) => {
  if (width === height) {
    return 'square';
  } else if (width > height) {
    return 'album';
  } else {
    return 'portrait';
  }
};

function ImagePage() {
  const [file, setFile] = useState(null);
  const [resolution, setResolution] = useState([0, 0]);
  const [photo, dispatchPhoto] = useReducer(photoReducer, null);
  const photoRef = useRef();

  const { photoId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    let normalizedPhoto;

    async function loadPhoto() {
      const photo = await DB.get('photos', photoId);
      normalizedPhoto = normalizePhoto(photo);

      dispatchPhoto({
        type: 'init',
        payload: normalizedPhoto,
      });

      setFile(photo.file);
    }

    loadPhoto();

    return () => normalizedPhoto && URL.revokeObjectURL(normalizedPhoto.url);
  }, [photoId]);

  useEffect(() => {
    updatePhoto(photo, file);
  }, [photo, file]);

  const onPhotoLoad = () => {
    const { naturalWidth, naturalHeight } = photoRef.current;
    setResolution([naturalWidth, naturalHeight]);
  };

  const onInputChange = (evt) => {
    const fieldName = evt.target.name;

    dispatchPhoto({
      type: 'update',
      payload: {
        [fieldName]: evt.target.value,
      },
    });
  };

  const onTagsChange = (newTags) => {
    dispatchPhoto({
      type: 'update',
      payload: {
        tags: newTags,
      },
    });
  };

  const onImageDelete = async () => {
    const isOk = window.confirm('Are you sure you want to delete the photo?');

    if (!isOk) return;

    await DB.delete('photos', photo.id);

    await dispatch(updateCollection(photo.collectionId));

    history.push('/');
  };

  if (!photo || !file) return null;

  return (
    <PageWrapper>
      <ImageContainer>
        <Image
          ref={photoRef}
          src={photo.url}
          alt={photo.description}
          onLoad={onPhotoLoad}
        />
      </ImageContainer>
      <FormContainer>
        <ActionContainer>
          <ActionButton onClick={() => downloadBlob(photo.name, file)}>
            <FaDownload /> Download
          </ActionButton>
          <ActionButton onClick={onImageDelete}>
            <FaTrash /> Delete
          </ActionButton>
        </ActionContainer>

        <form action="/" method="POST" onSubmit={(evt) => evt.preventDefault()}>
          <p>
            <Label htmlFor="field-name">Name</Label>
            <Input
              id="field-name"
              name="name"
              placeholder="Input a name of image"
              value={photo.name}
              onChange={onInputChange}
            />
          </p>
          <p>
            <Label htmlFor="field-description">Description</Label>
            <Textarea
              as="textarea"
              id="field-description"
              name="description"
              rows="3"
              placeholder="Input a description of image here"
              value={photo.description}
              onChange={onInputChange}
            />
          </p>

          <div>
            <Label htmlFor="field-tags">Tags</Label>
            <InputTag items={photo.tags} onChange={onTagsChange} />
          </div>
        </form>

        <Label as="span">Metadata</Label>
        <Metadata>
          <MetadataItem>
            <Name>Type</Name>
            <Value>{photo.type}</Value>
          </MetadataItem>
          <MetadataItem>
            <Name>Resolution</Name>
            <Value>
              {resolution.join('x')} ({getOrientation(...resolution)})
            </Value>
          </MetadataItem>
          <MetadataItem>
            <Name>Size</Name>
            <Value>{byteSize(file.size, 2)}</Value>
          </MetadataItem>
          <MetadataItem>
            <Name>Created At</Name>
            <Value>{new Date(file.lastModified).toLocaleString('en-US')}</Value>
          </MetadataItem>
        </Metadata>
      </FormContainer>
    </PageWrapper>
  );
}

export { ImagePage };
