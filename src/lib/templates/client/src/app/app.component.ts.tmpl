import { AfterViewInit, Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {
  constructor(private matIconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    this.registerSVG();
  }

  registerSVG(): void {
    this.matIconRegistry
      .addSvgIconSetInNamespace('neth',
        this.sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/icon-set.svg'));
  }

  ngAfterViewInit(): void {
    const loader = document.getElementById('app-loader');
    setTimeout(() => {
      loader.classList.add('animation');
    }, 100);

    setTimeout(() => {
      loader.parentElement.removeChild(loader);
    }, 800);
  }
}
