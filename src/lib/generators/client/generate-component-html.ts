export const generateComponentHtml = (): string => {
  // eslint-disable-next-line max-len
  return `<app-dynamic-table [dataSource]="dataSource" [columns]="columns" [sort]="sort" [resource]="resource" [displayName]="displayName"></app-dynamic-table>`;
}
