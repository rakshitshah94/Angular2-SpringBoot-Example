import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Response} from '@angular/http';
import {Router, ActivatedRoute} from '@angular/router';
import * as Rx from 'rxjs/Rx';

import 'rxjs/add/operator/switchMap';

import {PaginationPage, PaginationPropertySort} from '../pagination';
import {Table} from '../table';
import {showLoading, hideLoading, doNothing} from '../commons'
import {PersonService} from '../person.service';
import {Person, User} from '../domain';
import {FormComponent} from "../form/form.component";


@Component({
    selector: 'app-person-list',
    templateUrl: './person-list.component.html',
    styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit, Table<Person> {

    personPage: PaginationPage<Person>;
    personClass: User = new User();
    self: Table<Person>;
    @Input() tempmsg ;
    @Output() updateVals = new EventEmitter();

    constructor(private router: Router, private route: ActivatedRoute, private personService: PersonService) {
    }

    @Output() formCompRef = new FormComponent(this.router,this.route,this.personService);

    @Output() editValuesFromFormComponent = new EventEmitter();

    ngOnInit() {
        let observable: Rx.Observable<PaginationPage<any>> = this.fetchPage(0, 10, null);
        showLoading();
        observable.subscribe(doNothing, hideLoading, hideLoading);
        this.self = this;
    }

    fetchPage(pageNumber: number, pageSize: number, sort: PaginationPropertySort): Rx.Observable<PaginationPage<Person>> {
        let observable: Rx.Observable<PaginationPage<Person>> = this.personService.findPersons(pageNumber, pageSize, sort);
        observable.subscribe(personPage => this.personPage = personPage);
        return observable;
    }

    goToDetails(person) {
        this.router.navigate(['person', person.id]);
    }

    delete(person) {

        let observable: Rx.Observable<Response> = this.personService.deletePerson(person.id);
        showLoading();
        observable.switchMap(() => {
            return this.fetchPage(0, 5, null);
        }).subscribe(doNothing, hideLoading, hideLoading);
    }

    editpopup(user : User){//popup-modal
        console.log(""+user.id , user.firstname, user.lastname ,user.age);
        this.formCompRef.passingValuesEdit(user);
    }








}
