export const generateComponentHtml = () => {
  return `<app-dynamic-table [dataSource]="dataSource" [columns]="columns" [sort]="sort" [resource]="resource" [displayName]="displayName"></app-dynamic-table>`;
}
