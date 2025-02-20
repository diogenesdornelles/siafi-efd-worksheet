interface DocumentItem {
  value: number;
  partialSum?: number;
}

export default function getPartialSum<T extends DocumentItem>(documents: T[]): T[] {
  let partialSum = 0;
  documents.forEach((document) => {
    partialSum += document.value;
    document.partialSum = partialSum;
  });
  return documents;
}
