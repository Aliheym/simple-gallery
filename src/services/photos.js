export function normalizePhoto({
  id,
  collectionId,
  file,
  name = '',
  description = '',
  tags = [],
}) {
  return {
    id,
    collectionId,
    url: URL.createObjectURL(file),
    description,
    tags,
    type: file.type,
    name: name || file.name,
  };
}

export function downloadBlob(name, blob) {
  const link = document.createElement('a');

  link.href = URL.createObjectURL(blob);
  link.download = name;
  link.click();

  URL.revokeObjectURL(link.href);
}

export function byteSize(bytes, precision = 1) {
  let value, unit;

  if (bytes >= 0 && bytes < 1e3) {
    value = bytes;
    unit = 'B';
  } else if (bytes >= 1e3 && bytes < 1e6) {
    value = (bytes / 1e3).toFixed(precision);
    unit = 'kB';
  } else if (bytes >= 1e6 && bytes < 1e9) {
    value = (bytes / 1e6).toFixed(precision);
    unit = 'MB';
  } else {
    value = (bytes / 1e9).toFixed(precision);
    unit = 'GB';
  }

  return `${value} ${unit}`;
}
