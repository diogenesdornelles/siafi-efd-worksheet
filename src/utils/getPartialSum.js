export default function getPartialSum(documents) {
  let partialSum = 0;
  documents.forEach((document) => {
    partialSum += document.value;
    document['partialSum'] = partialSum;
  });
  return documents;
}
