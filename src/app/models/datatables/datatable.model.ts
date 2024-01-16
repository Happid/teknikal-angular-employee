export class ModelDatatable {
  limit: number;
  skip: number;
  activePage: number;
  numberPagging: number;
  total: number;
  search: string;
  pages: number;
  order: string;
  keyName: string;

  constructor(
    limit: number,
    skip: number,
    activePage: number,
    numberPagging: number,
    total: number,
    search: string,
    pages: number,
    order: string,
    keyName: string,
  ) {
    this.limit = limit;
    this.skip = skip;
    this.activePage = activePage;
    this.numberPagging = numberPagging;
    this.total = total;
    this.search = search;
    this.pages = pages;
    this.order = order;
    this.keyName = keyName;
  }
}
