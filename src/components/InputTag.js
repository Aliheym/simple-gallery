import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  padding: 1rem 2rem;

  background-color: var(--input);
  border-radius: 0.2rem;
`;

const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;

  list-style-type: none;
`;

const TagItem = styled.li`
  display: flex;
  margin: 0.25rem 0.5rem;

  background-color: var(--gray-700);
  border-radius: 0.2rem;
`;

const Tag = styled(Link)`
  padding: 0.5rem 1rem;

  font: inherit;
  font-size: 1.4rem;
  color: var(--white);
  text-decoration: none;

  transition: background-color 0.3s;

  &:hover {
    background-color: var(--active);
  }
`;

const TagDelete = styled.button`
  display: block;
  padding: 0.5rem 1rem;

  font: inherit;
  color: var(--white);

  background-color: transparent;
  border: none;

  transition: background-color 0.3s;

  &:hover {
    background-color: #f02;
  }

  svg {
    vertical-align: middle;
  }
`;

const TagInput = styled.input`
  min-width: 6rem;
  width: 0;
  flex-grow: 1;
  padding: 1rem 0.5rem;

  font: inherit;
  font-size: 1.5rem;
  color: var(--white);

  background-color: transparent;
  outline: none;
  border: none;
`;

function InputTag({ items, onChange }) {
  const removeTag = (index) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const onKeyDown = (evt) => {
    const currentValue = evt.target.value.toLowerCase();

    if (evt.key === 'Enter') {
      if (!currentValue) return;
      if (items.includes(currentValue)) return;

      onChange([...items, currentValue]);
      evt.target.value = '';
    } else if (evt.key === 'Backspace') {
      if (currentValue) return;

      removeTag(items.length - 1);
    }
  };

  return (
    <InputContainer>
      <TagList>
        {items.map((tag, i) => (
          <TagItem key={tag}>
            <Tag
              to={{
                pathname: '/',
                search: `?q=${tag}&isTag`,
              }}
            >
              {tag}
            </Tag>
            <TagDelete onClick={() => removeTag(i)} type="button">
              <FaTrash />
            </TagDelete>
          </TagItem>
        ))}
      </TagList>
      <TagInput
        id="field-tags"
        name="tags"
        placeholder="Start typing..."
        onKeyDown={onKeyDown}
      />
    </InputContainer>
  );
}

export { InputTag };
