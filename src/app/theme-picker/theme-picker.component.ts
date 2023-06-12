import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgFor } from '@angular/common';
import { LiveAnnouncer } from '@angular/cdk/a11y';

import { MaterialCssVarsService } from 'angular-material-css-vars';
import { SiteTheme, ThemeStorage } from './services/theme-storage.service';


@Component({
  selector: 'theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    MatIconModule,
    NgFor,
  ],
})
export class ThemePicker implements OnInit, OnDestroy {
  public themeIcon: string = 'light_mode';
  public currentTheme: SiteTheme | undefined;

  // The below colors need to align with the themes defined in theme-picker.scss
  public themes: SiteTheme[] = [
    {
      primary: '#3F51B5',
      accent: '#E91E63',
      displayName: 'ThemePickerEx - Light',
      name: 'ThemePickerExLight',
      isDark: false,
      isDefault: true,
    },
    {
      primary: '#E91E63',
      accent: '#607D8B',
      displayName: 'ThemePickerEx - Dark',
      name: 'ThemePickerExDark',
      isDark: true,
      isDefault: false
    },
  ];

  constructor(
    public materialCssVarsService: MaterialCssVarsService,
    private _themeStorage: ThemeStorage,
    private liveAnnouncer: LiveAnnouncer
  ) {

  }

  ngOnInit() {
    const themeName = this._themeStorage.getStoredThemeName();
    if (themeName) {
      this.selectTheme(themeName);
    } else {
      this.themes.find((themes) => {
        if (themes.isDefault === true) {
          this.selectTheme(themes.name);
        }
      });
    }
  }

  ngOnDestroy() {}

  selectThemeByMode() {
    let themeName: string | undefined;
    if (this.themeIcon == 'dark_mode') {
      this.themeIcon = 'light_mode';
      themeName = 'ThemePickerExDark';
      const hex = '#00aebb';
      this.materialCssVarsService.setDarkTheme(true);
      this.materialCssVarsService.setPrimaryColor(hex);
      this.materialCssVarsService.setAccentColor('#333');
    } else {
      this.themeIcon = 'dark_mode';
      themeName = 'ThemePickerExLight';
      const hex = '#b4182d';
      this.materialCssVarsService.setDarkTheme(false);
      this.materialCssVarsService.setPrimaryColor(hex);
      this.materialCssVarsService.setAccentColor('#00aebb');
    }

    const theme = this.themes.find(
      (currentTheme) => currentTheme.name === themeName
    );

    if (!theme) {
      return;
    }

    this.currentTheme = theme;

    if (this.currentTheme) {
      this.liveAnnouncer.announce(
        `${theme.displayName} theme selected.`,
        'polite',
        3000
      );
      this._themeStorage.storeTheme(this.currentTheme);
    }
  }

  selectTheme(themeName: string) {
    if (themeName == 'ThemePickerExDark') {
      this.themeIcon = 'light_mode';
      const hex = '#00aebb';
      this.materialCssVarsService.setDarkTheme(true);
      this.materialCssVarsService.setPrimaryColor(hex);
      this.materialCssVarsService.setAccentColor('#DCDDDF');
    } else {
      if (themeName == 'ThemePickerExLight') {
        this.themeIcon = 'dark_mode';
        const hex = '#b4182d';
        this.materialCssVarsService.setDarkTheme(false);
        this.materialCssVarsService.setPrimaryColor(hex);
        this.materialCssVarsService.setAccentColor('#00aebb');
      }
    }

    const theme = this.themes.find(
      (currentTheme) => currentTheme.name === themeName
    );

    if (!theme) {
      return;
    }

    this.currentTheme = theme;

    if (this.currentTheme) {
      this.liveAnnouncer.announce(
        `${theme.displayName} theme selected.`,
        'polite',
        3000
      );
      this._themeStorage.storeTheme(this.currentTheme);
    }
  }
}
