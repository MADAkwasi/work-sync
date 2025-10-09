import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Header } from "@shared/components/header/header";

@Component({
  selector: 'app-unauthorized',
  imports: [Header, RouterLink],
  templateUrl: './unauthorized.html',
})
export class Unauthorized {}
