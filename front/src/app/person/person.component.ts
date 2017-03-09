import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Response} from '@angular/http';
import * as Rx from 'rxjs/Rx';

import {PersonService} from '../person.service';
import {Person} from '../domain';
import {showLoading, hideLoading, doNothing} from '../commons'
import {FormComponent} from "../form/form.component";

@Component({
    selector: 'app-person',
    templateUrl: './person.component.html',
    styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

    person: Person;

    @Input() formComponentRef : FormComponent;


    constructor(private router: Router, private route: ActivatedRoute, private personService: PersonService) {

    }

    ngOnInit() {
        this.route.params.subscribe(params=> {
            this.personService.getPerson(Number(params['id'])).subscribe(person => this.person = person);
        });

    }

    delete(person) {
        let observable: Rx.Observable<Response> = this.personService.deletePerson(person.id);
        showLoading();
        observable.subscribe(doNothing, hideLoading, ()=> {
            this.router.navigate(['']);
            hideLoading();
        });
    }


    editpopup(person){//popup-modal
        console.log("person method called ");
        //Add code if you want edit functionality in person component 

        //this.formComponentRef.methodToFetchDataFromOtherComponent(person);
        //this.formComponentRef.methodToFetchDataFromOtherComponent(person);
        /* let observable : Rx.Observable<void> = this.personService.updatePerson(person.id);
        showLoading();
        observable.subscribe(doNothing, hideLoading, ()=>{
            this.router.navigate(['']);
            hideLoading();
        });*/

    }



    back() {
        history.back();
    }
}
