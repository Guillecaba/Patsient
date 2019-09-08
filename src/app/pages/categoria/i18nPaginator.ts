import { MatPaginatorIntl } from '@angular/material';

/*
  Copy pasted
*/
export class MatPaginatorIntlCro extends MatPaginatorIntl {
  itemsPerPageLabel = 'Items por página';
  nextPageLabel     = 'Página asiguiente';
  previousPageLabel = 'Página anterior';
  firstPageLabel = 'Primera página';

  getRangeLabel = function (page, pageSize, length) {
    if (length === 0 || pageSize === 0) {
      return '0 de ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' de ' + length;
  };

}