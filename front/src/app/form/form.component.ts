import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Person, User} from "../domain";
import {Router, ActivatedRoute} from "@angular/router";
import {PersonService} from "../person.service";
import {Response} from "@angular/http";
import {showLoading, doNothing, hideLoading} from "../commons";
import * as Rx from 'rxjs/Rx';
import {PersonComponent} from "../person/person.component";
import {userInfo} from "os";
import {PersonListComponent} from "../person-list/person-list.component";
import {PaginationPropertySort, PaginationPage} from "../pagination";
import {FormGroup} from "@angular/forms";
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  styles : [``]
})
export class FormComponent implements OnInit {
  myForm : FormGroup;
  person: Person;
  personPage: PaginationPage<Person>;
  personClass: User = new User();

  @Input() idRendered : number;
  @Input() firstnameRendered : string;
  @Input() lastnameRendered : string;
  @Input() ageRendered : string;
  //@Output() updateByEdit = new EventEmitter();


  constructor(private router: Router, private route: ActivatedRoute, private personService: PersonService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params=> {
      if (params['id'] == null) {
      } else {
        this.personService.getPerson(Number(params['id'])).subscribe(person => this.personClass = person);
      }
    });
    localStorage.clear();
  }



  passingValuesCreate(hiddenId1,firstname1,lastname1,age1){
    this.personClass.id = null;
    this.personClass.firstname = firstname1;
    this.personClass.lastname = lastname1;
    this.personClass.age =age1;
    this.create(this.personClass);
  }

  passingValuesEdit(user) {
   this.personClass = user;
    this.SendVals(this.personClass);
   // this.loadData();
  }

  //which fetches values from text field
  editTemp(hiddenId1,firstname1,lastname1,age1){
    this.personClass.id = hiddenId1;
    this.personClass.firstname = firstname1;
    this.personClass.lastname = lastname1;
    this.personClass.age =age1;
    this.edit(this.personClass);
  }

  edit(personClass){

    let observable : Rx.Observable<string> = this.personService.updatePerson(personClass);
    showLoading();
    observable.subscribe(doNothing, hideLoading, ()=>{
      this.router.navigate(['']);
      hideLoading();
    });
  }
  create(personClass){


    let observable: Rx.Observable<string> = this.personService.createPerson(this.personClass);
    showLoading();
    observable.subscribe(doNothing, hideLoading, ()=> {
      this.router.navigate(['']);
      hideLoading();
    });
  }


//sendvals : this function is used to store and return values for particular chosen person [setters]
  SendVals(newObj) {
    localStorage.setItem('hiddenId',newObj.id);
    localStorage.setItem('firstname',newObj.firstname);
    localStorage.setItem('lastname',newObj.lastname);
    localStorage.setItem('age',newObj.age);
  }
  //loadData : this function is used to store and return values for particular chosen person [getters]
  loadData(){
    this.idRendered = parseInt(localStorage.getItem('hiddenId'));
    this.firstnameRendered = localStorage.getItem('firstname');
    this.lastnameRendered = localStorage.getItem('lastname');
    this.ageRendered =  localStorage.getItem('age');
  }

  reset(){
  localStorage.clear();
  }


}
