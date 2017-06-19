import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  this.buildForm();
}

buildForm() {
  this.contatoForm = this.fb.group({
    'nome': ['', [Validators.required]],
    'email': ['', [Validators.required]],
    'texto': ['', [Validators.required,
    Validators.minLength(4), Validators.maxLength(100)]]
  })

}

}
