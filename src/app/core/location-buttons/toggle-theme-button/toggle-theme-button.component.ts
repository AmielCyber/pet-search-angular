import {Component, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-toggle-theme-button',
  templateUrl: './toggle-theme-button.component.html',
})
export class ToggleThemeButtonComponent implements OnInit {
  isDarkMode = true;
  private readonly darkClass = "theme-dark";
  private readonly lightClass = "theme-light";

  constructor(private renderer: Renderer2) {
  }

  ngOnInit(): void {
    if (window.matchMedia("prefers-color-scheme").media !== "not all") {
      // Browser supports prefers-color-scheme
      this.isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    this.setTheme(this.isDarkMode);
  }

  onToggleTheme() {
    const isDarkMode = !this.isDarkMode;
    this.setTheme(isDarkMode);
  }

  private setTheme(isDarkMode: boolean): void {
    const newTheme = isDarkMode ? this.darkClass : this.lightClass;
    const oldTheme = isDarkMode ? this.lightClass : this.darkClass;

    this.renderer.addClass(document.body, newTheme);
    this.renderer.removeClass(document.body, oldTheme);
    this.isDarkMode = isDarkMode;
  }
}
