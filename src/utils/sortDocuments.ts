interface DocumentItem {
    document: string;
  }
  
  export default function sortDocuments<T extends DocumentItem>(documents: T[]): T[] {
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