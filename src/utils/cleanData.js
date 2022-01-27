export default function cleanData(data) {
  return data
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()@]/g, '')
    .replace(/\s+/g, '')
    .toLowerCase()
    .trim();
}
