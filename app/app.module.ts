import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RequestDemoRoutingModule } from './request-demo/request-demo-routing.module';
// import { TranslationServiceComponent } from './translation-service/translation-service.component';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TranslationService } from './translation-service.service';
import { TranslationServiceComponent } from './translation-service/translation-service.component';

@NgModule({
    declarations: [AppComponent, TranslationServiceComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
        RequestDemoRoutingModule,
        HttpClientModule,
        FormsModule,
    ],
    providers: [TranslationService],
    bootstrap: [AppComponent],
})
export class AppModule {}
