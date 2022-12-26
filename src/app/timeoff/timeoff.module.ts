import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{ TimeOffComponent} from './timeoff.component';
import { TimeOffRoutingModule } from './timeoff-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {
    AccordionModule, ButtonModule, CheckboxModule, ComboBoxModule, ContentSwitcherModule,
    DialogModule, DropdownModule, GridModule, InputModule, ListModule,
    LoadingModule, ModalModule, NumberModule,
    PaginationModule, PlaceholderModule, RadioModule, SliderModule, StructuredListModule,
    TableModule, TabsModule, TagModule, TilesModule, ToggleModule, UIShellModule, DatePickerModule,
    TimePickerModule, TimePickerSelectModule
  } from 'carbon-components-angular';
  import { DatePipe } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TimeOffRoutingModule,
        AccordionModule, ButtonModule, CheckboxModule, ComboBoxModule, ContentSwitcherModule,
        DialogModule, DropdownModule, GridModule, InputModule, ListModule,
        LoadingModule, ModalModule, NumberModule,
        PaginationModule, PlaceholderModule, RadioModule, SliderModule, StructuredListModule,
        TableModule, TabsModule, TagModule, TilesModule, ToggleModule, UIShellModule, DatePickerModule,
        TimePickerModule, TimePickerSelectModule
    ],
    declarations: [
        TimeOffComponent
    ],
    providers: [DatePipe
      ]
})
export class TimeOffModule { }