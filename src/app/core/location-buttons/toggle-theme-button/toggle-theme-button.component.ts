import {Component, Renderer2} from '@angular/core';

@Component({
  selector: 'app-toggle-theme-button',
  templateUrl: './toggle-theme-button.component.html',
})
export class ToggleThemeButtonComponent {
  isDarkMode = true;
  private readonly darkClass = "theme-dark";
  private readonly lightClass = "theme-light";

  constructor(private renderer: Renderer2) { }

  onToggleTheme(){
    this.isDarkMode? this.setLightTheme() : this.setDarkTheme();
  }

  private setDarkTheme(){
    this.renderer.addClass(document.body, this.darkClass);
    this.renderer.removeClass(document.body, this.lightClass);
    this.isDarkMode = true;
  }
  private setLightTheme(){
    this.renderer.addClass(document.body, this.lightClass);
    this.renderer.removeClass(document.body, this.darkClass);
    this.isDarkMode = false;
  }

}
