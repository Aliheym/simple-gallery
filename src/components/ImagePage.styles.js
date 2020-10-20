import styled from 'styled-components';

export const PageWrapper = styled.div`
  grid-column: 1 / -1;

  display: grid;
  grid-template-columns: 1fr 35rem;
  grid-template-rows: calc(100vh - 10rem);
`;

export const ImageContainer = styled.div`
  padding: 1rem;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  padding: 1rem;
  object-fit: scale-down;

  filter: drop-shadow(0 0.1rem 2rem rgba(0, 0, 0, 0.7));
`;

export const FormContainer = styled.div`
  padding: 1rem;
`;

export const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;

  font-size: 1.4rem;
  color: var(--gray);
`;

export const Input = styled.input`
  width: 100%;
  margin-bottom: 1rem;
  padding: 1rem 2rem;

  font: inherit;
  font-size: 1.5rem;
  color: var(--white);

  background-color: var(--input);
  border: none;
  border-radius: 0.2rem;
  outline: none;
`;

export const Textarea = styled(Input)`
  resize: none;
`;

export const Metadata = styled.dl`
  margin: 0;
  padding: 0;
`;

export const MetadataItem = styled.div`
  display: flex;
  padding: 0.9rem 0.2rem;
  justify-content: space-between;

  border-bottom: 1px solid var(--input);
`;

export const Name = styled.dt`
  font-size: 1.4rem;
  color: var(--gray-700);
`;

export const Value = styled.dd`
  font-size: 1.4rem;
  color: var(--white);
`;
