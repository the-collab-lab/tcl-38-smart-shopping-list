export default function cleanData(data) {
  return data
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()@]/g, '')
    .toLowerCase()
    .trim();
}
