import { Component } from '@angular/core';
import { Icon } from "../icon/icon";
import { Button } from "../button/button";

@Component({
  selector: 'app-header',
  imports: [Icon, Button],
  templateUrl: './header.html',
})
export class Header {}
