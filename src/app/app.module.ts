import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppService } from './app.service'
import { FormsModule } from '@angular/forms';
import { LongPressDirective } from './tablet-rest/long-press';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { AutofocusDirective } from './tablet-rest/auto-focus';
import { UrlRoutes } from './app.router';
import { FooterComponent } from './tablet-rest/footer/footer.component';
import { HeaderComponent } from './tablet-rest/header/header.component';
import { StoreReportComponent } from './tablet-rest/modals/store-report/store-report.component';
import { ExtendEtaComponent } from './tablet-rest/modals/extend-eta/extend-eta.component';
import { NewOrderComponent } from './tablet-rest/modals/new-order/new-order.component';
import { OptionsComponent } from './tablet-rest/modals/options/options.component';
import { ContactComponent } from './tablet-rest/modals/contact/contact.component';
import { StorePinComponent } from './tablet-rest/modals/store-pin/store-pin.component';
import { PauseComponent } from './tablet-rest/modals/pause/pause.component';
import { ResumeComponent } from './tablet-rest/modals/resume/resume.component';
import { EtaupdateSuccessComponent } from './tablet-rest/modals/etaupdate-success/etaupdate-success.component';
import { RefundComponent } from './tablet-rest/modals/refund/refund.component';
import { OrderSummaryComponent } from './tablet-rest/common/order-summary/order-summary.component';
import { MainTableComponent } from './tablet-rest/common/main-table/main-table.component';
import { OrderDetailHeaderComponent } from './tablet-rest/common/order-detail-header/order-detail-header.component';
import { PaymentInfoComponent } from './tablet-rest/common/payment-info/payment-info.component';
import { OrderDetailEtaComponent } from './tablet-rest/common/order-detail-eta/order-detail-eta.component';
import { AcceptButtonsComponent } from './tablet-rest/common/accept-buttons/accept-buttons.component';
import { TabletRestComponent } from './tablet-rest/tablet-rest';
import { LoginComponent } from './tablet-admin/login/login.component';
import { CrubsideComponent } from './tablet-rest/crubside/crubside.component';
import { TicketIdPopupComponent } from './tablet-rest/crubside/ticket-id-popup/ticket-id-popup.component';
@NgModule({
  declarations: [
    AppComponent,
    LongPressDirective,
    HeaderComponent,
    AutofocusDirective,
    FooterComponent,
    StoreReportComponent,
    ExtendEtaComponent,
    NewOrderComponent,
    OptionsComponent,
    ContactComponent,
    StorePinComponent,
    PauseComponent,
    ResumeComponent,
    EtaupdateSuccessComponent,
    RefundComponent,
    OrderSummaryComponent,
    MainTableComponent,

    OrderDetailHeaderComponent,
    PaymentInfoComponent,
    OrderDetailEtaComponent,
    AcceptButtonsComponent,
    TabletRestComponent,
    LoginComponent,
    CrubsideComponent,
    TicketIdPopupComponent

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    UrlRoutes,
    HttpClientModule, FormsModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.circleSwish,
      backdropBackgroundColour: 'rgba(0,0,0,0.7)',
      backdropBorderRadius: '8px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff'
    }),
    RouterModule.forRoot([]),

  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }