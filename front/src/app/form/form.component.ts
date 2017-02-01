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
import {PaginationPage, PaginationPropertySort} from "../pagination";
import {Table} from "../table";
import {FormGroup} from "@angular/forms";
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  myForm : FormGroup;
  person: Person;
  personClass: User = new User();
  self: Table<Person>;
  personPage: PaginationPage<Person>;

  @Input() message;
  @Input() personListComponent:PersonListComponent;

  @Output() updateByEdit = new EventEmitter();

  passingValuesCreate(hiddenId1,firstname1,lastname1,age1){
    this.personClass.id = hiddenId1;
    this.personClass.firstname = firstname1;
    this.personClass.lastname = lastname1;
    this.personClass.age =age1;
    this.create(this.personClass);
  }

  passingValuesEdit(hiddenId1,firstname1,lastname1,age1) {
    console.log("temp calledd edit>>>>>>>>>>>>>>> "+ hiddenId1 );
    this.personClass.id = hiddenId1;
    this.personClass.firstname = firstname1;
    this.personClass.lastname = lastname1;
    this.personClass.age =age1;
  }




  constructor(private router: Router, private route: ActivatedRoute, private personService: PersonService) {
  }


  ngOnInit() {
    this.route.params.subscribe(params=> {
      if (params['id'] == null) {
        //this.person = Person;
      } else {
        this.personService.getPerson(Number(params['id'])).subscribe(person => this.person = person);
      }
    });
    localStorage.clear();
    let observable: Rx.Observable<PaginationPage<any>> = this.fetchPage(0, 5, null);
    showLoading();
    observable.subscribe(doNothing, hideLoading, hideLoading);
    this.self = this;

  //this.message = "5";
  }
  fetchPage(pageNumber: number, pageSize: number, sort: PaginationPropertySort): Rx.Observable<PaginationPage<Person>> {
    let observable: Rx.Observable<PaginationPage<Person>> = this.personService.findPersons(pageNumber, pageSize, sort);
    observable.subscribe(personPage => this.personPage = personPage);
    return observable;
  }


  edit(hiddenId1,firstname1,lastname1,age1,personClass){

    this.personClass.id = hiddenId1;
    this.personClass.firstname = firstname1;
    this.personClass.lastname = lastname1;
    this.personClass.age =age1;

    this.storedValues(this.personClass.id,this.personClass.firstname,this.personClass.lastname,this.personClass.age);

    let observable : Rx.Observable<string> = this.personService.updatePerson(personClass);
    showLoading();
    observable.switchMap(() => {
      return this.fetchPage(0, 5, null);
    }).subscribe(doNothing, hideLoading, hideLoading);
    /*observable.subscribe(doNothing, hideLoading, ()=>{
      this.router.navigate(['']);
      hideLoading();
    });*/
  }

  storedValues(hiddenid2,firstname2,lastname2,age2){
    localStorage.setItem('hiddenId',hiddenid2);
    localStorage.setItem('firstname',firstname2);
    localStorage.setItem('lastname',lastname2);
    localStorage.setItem('age',age2);
  }





  create(personClass){
    localStorage.clear();
    console.log("create form called" +this.personClass.firstname);

    let observable: Rx.Observable<string> = this.personService.createPerson(this.personClass);
    showLoading();
    observable.switchMap(() => {
      return this.fetchPage(0, 3, null);
    }).subscribe(doNothing, hideLoading, hideLoading);
    /*observable.subscribe(doNothing, hideLoading, ()=> {
      this.router.navigate(['']);
      hideLoading();
    });*/

  }



  reset(){
  this.myForm.reset();
  }


}
