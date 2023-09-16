export default function sortDocuments(documents) {
  return documents.sort((a, b) => {
    if (a.document < b.document) {
      return -1;
    }
    if (a.document > b.document) {
      return 1;
    }
    return 0;
  });
}
