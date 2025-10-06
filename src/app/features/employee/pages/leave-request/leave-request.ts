import { Component } from '@angular/core';
import { Header } from '@shared/components/header/header';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { Button } from "@shared/components/button/button";

@Component({
  selector: 'app-leave-request',
  imports: [Header, FloatLabelModule, DatePickerModule, InputTextModule, TextareaModule, Button],
  templateUrl: './leave-request.html',
})
export class LeaveRequest {}
