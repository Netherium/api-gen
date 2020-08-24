import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveLayoutService {

  constructor(private breakpointObserver: BreakpointObserver) {
  }

  isSmall(): Observable<boolean> {
    return this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium]).pipe(
      map(result => {
        return result.matches;
      }),
      shareReplay({
        bufferSize: 1,
        refCount: true
      })
    );
  }
}
