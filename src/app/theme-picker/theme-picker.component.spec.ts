import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MaterialCssVarsService } from 'angular-material-css-vars';

import { MaterialCssVarsModule } from 'angular-material-css-vars';
import { A11yModule } from '@angular/cdk/a11y';

import { ThemePicker } from './theme-picker.component';
import { ThemeStorage } from './services/theme-storage.service';


describe('ThemePicker', () => {
  let component: ThemePicker;
  let fixture: ComponentFixture<ThemePicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [  ],
      imports: [
        ThemePicker,
        MatButtonModule,
        MatTooltipModule,
        MatMenuModule,
        MatIconModule,
        NgFor,
        MaterialCssVarsModule.forRoot({
          isDarkTheme: false,
          isAutoContrast: false,
          primary: '#b4182d',
          accent: '#00aebb'
        }),
        A11yModule
      ], 
      providers: [
        MaterialCssVarsService,
        ThemeStorage,
        LiveAnnouncer
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemePicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
