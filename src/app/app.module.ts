import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { HttpModule } from "@angular/http";
import { AppService } from "./app.service";
import { NewService } from "./new.service";
import { FormsModule } from "@angular/forms";
import { LongPressDirective } from "./tablet-rest/long-press";
import { NgxLoadingModule, ngxLoadingAnimationTypes } from "ngx-loading";
import { AutofocusDirective } from "./tablet-rest/auto-focus";
import { UrlRoutes } from "./app.router";
import { FooterComponent } from "./tablet-rest/footer/footer.component";
import { HeaderComponent } from "./tablet-rest/header/header.component";
import { StoreReportComponent } from "./tablet-rest/modals/store-report/store-report.component";
import { ExtendEtaComponent } from "./tablet-rest/modals/extend-eta/extend-eta.component";
import { NewOrderComponent } from "./tablet-rest/modals/new-order/new-order.component";
import { OptionsComponent } from "./tablet-rest/modals/options/options.component";
import { ContactComponent } from "./tablet-rest/modals/contact/contact.component";
import { StorePinComponent } from "./tablet-rest/modals/store-pin/store-pin.component";
import { PauseComponent } from "./tablet-rest/modals/pause/pause.component";
import { ResumeComponent } from "./tablet-rest/modals/resume/resume.component";
import { EtaupdateSuccessComponent } from "./tablet-rest/modals/etaupdate-success/etaupdate-success.component";
import { RefundComponent } from "./tablet-rest/modals/refund/refund.component";
import { OrderSummaryComponent } from "./tablet-rest/common/order-summary/order-summary.component";
import { MainTableComponent } from "./tablet-rest/common/main-table/main-table.component";
import { OrderDetailHeaderComponent } from "./tablet-rest/common/order-detail-header/order-detail-header.component";
import { PaymentInfoComponent } from "./tablet-rest/common/payment-info/payment-info.component";
import { OrderDetailEtaComponent } from "./tablet-rest/common/order-detail-eta/order-detail-eta.component";
import { AcceptButtonsComponent } from "./tablet-rest/common/accept-buttons/accept-buttons.component";
import { TabletRestComponent } from "./tablet-rest/tablet-rest";
import { LoginComponent } from "./tablet-admin/login/login.component";
import { CrubsideComponent } from "./tablet-rest/crubside/crubside.component";
import { TicketIdPopupComponent } from "./tablet-rest/crubside/ticket-id-popup/ticket-id-popup.component";
import { RespondPopupComponent } from "./tablet-rest/crubside/respond-popup/respond-popup.component";
import { RespondSuccessComponent } from "./tablet-rest/crubside/respond-popup/respond-success/respond-success.component";
import { FeedbackComponent } from "./tablet-rest/feedback/feedback.component";
import { BroadcastComponent } from "./tablet-rest/broadcast/broadcast.component";
import { StoreManageComponent } from "./tablet-rest/store-manage/store-manage.component";
import { StoreManageDialogComponent } from "./tablet-rest/store-manage/store-manage-dialog/store-manage-dialog.component";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatRadioModule } from "@angular/material/radio";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatSelectModule } from "@angular/material/select";
import { MatDividerModule } from "@angular/material/divider";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatTableModule } from "@angular/material/table";
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    LongPressDirective,
    HeaderComponent,
    StoreManageDialogComponent,
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
    TicketIdPopupComponent,
    RespondPopupComponent,
    RespondSuccessComponent,
    FeedbackComponent,
    BroadcastComponent,
    StoreManageComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatCheckboxModule,
    MatDividerModule,
    MatGridListModule,
    UrlRoutes,
    HttpClientModule,
    FormsModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.circleSwish,
      backdropBackgroundColour: "rgba(0,0,0,0.7)",
      backdropBorderRadius: "8px",
      primaryColour: "#ffffff",
      secondaryColour: "#ffffff",
      tertiaryColour: "#ffffff",
    }),
    RouterModule.forRoot([]),
  ],
  providers: [AppService, NewService],
  bootstrap: [AppComponent],
  entryComponents: [StoreManageDialogComponent],
})
export class AppModule {}
