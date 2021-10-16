<h1 align="center">
  <img src="https://raw.githubusercontent.com/Netherium/neth-ng/master/src/assets/logo.png" alt="Neth-ng" width="120">
</h1>
<h4 align="center">A frontend admin panel written in Typescript using <a href="https://github.com/angular" target="_blank">Angular</a> and <a href="https://github.com/angular/material" target="_blank">Angular Material</a></h4>
<h5 align="center">Modules, file-upload/dynamic-table components, generic http services, bundled with Material awesomeness!!!</h5>
<div align="center">
  <sub>Made with ❤ by <a href="https://github.com/Netherium">Netherium</a></sub>
</div>

<h4 align="center">See it in action with <a href="https://www.npmjs.com/package/@netherium/api-gen" target="_blank">@netherium/api-gen</a></h5>

## Structure

Follow the structure below. It will keep things and your mind tidy :blossom:

    Client
    .
    ├── dist                            # Compiled files ready to deploy `npm run build`
    │
    ├── src                             # Your code goes here
    │   ├── app             
    │   │   ├── components              # Shared components throughout the Angular app
    │   │   ├── models                  # Shared models throughout the Angular app    
    │   │   ├── services                # Shared core services throughout the Angular app
    │   │   ├── dialogs                 # Shared dialogs
    │   │   ├── modules                 # Lazy loaded modules, each generated resource corresponds to 1 module
    │   │   └── app-routing.module.ts   # Routing module that binds all lazy loaded modules, each generated resource has a child under `childrenRoutes`  
    │   ├── assets                      # Static resources
    │   ├── environments                # Angular environment configuration
    │   ├── theming                     # Angular Material Theming Styles
    │                      
    ... Rest Default Angular Structure

## Dynamic Table

### In your `resource.component.ts` file

- Declare columns of type `DynamicCell`
  - `header` The displayed name in `mat-table`
  - `columnDef` The property from your resource api
  - `type` The type that of this property. Affects the way data are displayed
- Pass a default `Sort`
- Create a new `CollectionDataSource`

See [actual example](https://github.com/Netherium/neth-ng/blob/master/src/app/modules/book/book.component.ts)
```typescript
export class BookComponent {
  resource = 'books';
  displayName = 'Books';

  columns: DynamicCell[] = [
    {header: 'Select', columnDef: 'select', type: 'select'}, // The check box in the beginning of row in mat-table
    {header: 'Id', columnDef: '_id', type: 'String'},
    {header: 'Title', columnDef: 'title', type: 'String'},
    // Declare rest columns here from your api
    {header: 'Edit', columnDef: 'edit', type: 'edit'} // The `edit` icon at teh end of a row in mat-table
    ];
  sort: Sort = {
        active: '_id',
        direction: 'asc'
      };
  dataSource = new CollectionDataSource<Book>(this.httpService, this.resource, this.sort, 0, 10, '');

  constructor(private httpService: HttpGenericService) {
  }
}
```

### In your `resource.component.html` file

Simply declare `app-dynamic-table`

See [actual example](https://github.com/Netherium/neth-ng/blob/master/src/app/modules/book/book.component.html)
```html
<app-dynamic-table [dataSource]="dataSource" [columns]="columns" [sort]="sort" [resource]="resource" [displayName]="displayName"></app-dynamic-table>
```

## Generic Services

Call a list of paginated items from a resource point

See [actual example](https://github.com/Netherium/neth-ng/blob/master/src/app/modules/book/book-detail/book-detail.component.ts) 
```typescript
export class BookDetailComponent {
    constructor(private httpService: HttpGenericService) {
      const users = this.httpService.listPaginatedCollection<User>('users', null, 0, 5, term)
    }
}
```

## Subscription Notification service

The notification service is based on `MatSnackBar`.

Create an observable and pass it on any method of `SubscriptionNotificationService`, along with a `CRUDAction` and callback actions

See [actual example](https://github.com/Netherium/neth-ng/blob/master/src/app/modules/book/book-detail/book-detail.component.ts)
```typescript
export class BookDetailComponent {
    constructor(private httpService: HttpGenericService, private subNotSrv: SubscriptionNotificationService) {
    }

    save(): void {
        const obs: Observable<Book | HttpErrorResponse> = this.httpService.create<Book>('books', this.book);
        this.subNotSrv.singleSubscription<Book>(obs, CRUDAction.CREATE, 'Book',
            () => {
                // Do something on complete
            },
            () => {
                // Do something on success
            },
            () => {
                // Do something on error
            }
        );
    }
}
```

## Authors
**[Netherium](https://github.com/Netherium)**


## Copyright and license
Code released under [the MIT license](https://github.com/Netherium/neth-express-api-ts/blob/master/LICENSE)
