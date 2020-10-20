import React, { useState, useEffect } from 'react';

import DB from '../services/DB';
import { byteSize } from '../services/photos';

import styled from 'styled-components';

const AboutWrapper = styled.div`
  grid-column: 1 / -1;

  text-align: center;
`;

const AboutList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 7rem 0;

  text-align: center;
  color: var(--white);
`;

const AboutItem = styled.div`
  display: flex;
  flex-direction: column;

  margin: 5rem;
`;

const AboutTitle = styled.div`
  margin-top: auto;

  font-size: 3rem;
  white-space: nowrap;
`;

const AboutValue = styled.div`
  font-size: 5rem;
  white-space: nowrap;
`;

const AboutButton = styled.button`
  display: inline-block;
  padding: 2rem 4rem;

  font-size: 3rem;
  text-align: center;

  border: none;
  border-radius: 0.2rem;
  background-color: var(--active);
  color: var(--white);

  cursor: pointer;
`;

function About() {
  const [totalFiles, setTotalFiles] = useState(0);
  const [totalSize, setTotalSize] = useState(0);
  const [totalCollections, setTotalCollections] = useState(0);

  const [quota, setQuota] = useState(0);

  useEffect(() => {
    async function getTotalInfo() {
      const photos = await DB.getAll('photos');
      const totalCollections = await DB.count('collections');

      setTotalFiles(photos.length);
      setTotalSize(photos.reduce((acc, { file }) => acc + file.size, 0));
      setTotalCollections(totalCollections);
    }

    getTotalInfo();
  }, []);

  useEffect(() => {
    if (window.navigator.storage) {
      window.navigator.storage.estimate().then((estimate) => {
        setQuota(estimate.quota);
      });
    }
  });

  const onClearAll = async () => {
    const isOk = window.confirm('Are you sure to clear all data?');

    if (!isOk) return;

    await DB.clear('photos');
    await DB.clear('collections');

    setTotalFiles(0);
    setTotalSize(0);
    setTotalCollections(0);

    window.alert('Successfully clear...');
  };

  return (
    <AboutWrapper>
      <AboutList>
        <AboutItem>
          <AboutValue>
            {byteSize(totalSize)} / {byteSize(quota)}
          </AboutValue>
          <AboutTitle>used</AboutTitle>
        </AboutItem>
        <AboutItem>
          <AboutValue>{totalFiles}</AboutValue>
          <AboutTitle>files in storage</AboutTitle>
        </AboutItem>
        <AboutItem>
          <AboutValue>{totalCollections}</AboutValue>
          <AboutTitle>collections in gallery</AboutTitle>
        </AboutItem>
      </AboutList>
      <AboutButton type="button" onClick={onClearAll}>
        Clear all
      </AboutButton>
    </AboutWrapper>
  );
}

export { About };
