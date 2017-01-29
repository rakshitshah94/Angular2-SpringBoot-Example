import { Component, OnInit } from '@angular/core';
import {Person} from "../domain";
import {Router, ActivatedRoute} from "@angular/router";
import {PersonService} from "../person.service";
import {Response} from "@angular/http";
import {showLoading, doNothing, hideLoading} from "../commons";
import * as Rx from 'rxjs/Rx';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  person: Person;

  constructor(private router: Router, private route: ActivatedRoute, private personService: PersonService) {

  }

  ngOnInit() {
    this.route.params.subscribe(params=> {
      this.personService.getPerson(Number(params['id'])).subscribe(person => this.person = person);
    });

  }

  create1(person){
    let observable: Rx.Observable<Response> = this.personService.createPerson();
    showLoading();
    observable.subscribe(doNothing, hideLoading, ()=> {
      this.router.navigate(['']);
      hideLoading();
    });
  }

  submit(){
  //this.personService.
  }

}
