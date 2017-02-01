import {Injectable} from '@angular/core';
import {Person, User} from './domain'
import {PaginationPage, PaginationPropertySort} from './pagination';
import {webServiceEndpoint} from './commons';
import {Http, Response, URLSearchParams, RequestOptions, Headers} from '@angular/http';
import * as Rx from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';

@Injectable()
export class PersonService {

    constructor(private http: Http) {
        this.http = http;
    }

    findPersons(page: number, pageSize: number, sort: PaginationPropertySort): Rx.Observable<PaginationPage<Person>> {
        let params = new URLSearchParams();
        params.set('size', `${pageSize}`);
        params.set('page', `${page}`);
        if (sort != null) {
            params.set('sort', `${sort.property},${sort.direction}`);
        }

        let options = new RequestOptions({
            search: params
        });
        return this.http.get(`${webServiceEndpoint}/person`, options).map(this.extractData).publish().refCount();
    }

    getPerson(id: number): Rx.Observable<Person> {
        return this.http.get(`${webServiceEndpoint}/person/${id}`).map(this.extractData).publish().refCount();
    }

    deletePerson(id: number): Rx.Observable<Response> {
        return this.http.delete(`${webServiceEndpoint}/person/${id}`).publish().refCount();
    }




    updatePerson(personClass : User) : Rx.Observable<string>{
        console.log("RRRRRRRRRKKKK "+personClass.id + personClass.firstname + personClass.lastname+ personClass.age);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        /*var myObjUpdate ={"id":4,"firstname":"Johnny", "age":14, "lastname":"Canada","dateOfBirth":"null" }*/
        var myObjUpdate ={"id":personClass.id,"firstname":personClass.firstname, "age":personClass.age, "lastname":personClass.lastname,"dateOfBirth":"null" }
        /*return this.http.post(`${webServiceEndpoint}/person/${id}`,JSON.stringify(myObjUpdate),{*/
        return this.http.post(`${webServiceEndpoint}/person/${personClass.id}`,JSON.stringify(myObjUpdate),{
            headers : headers
        }).map((res: Response) => {
            return res.json();
        }).publish().refCount();
    }

    createPerson(personClass : User): Rx.Observable<string>{
        console.log("<<<<<<<<<<<<<<<<<<< person json : "+ personClass);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        /*var myObj = { "firstname":"John", "age":31, "lastname":"New York","dateOfBirth":"null" };*/
        var myObj = { "firstname":personClass.firstname, "age":personClass.age, "lastname":personClass.lastname,"dateOfBirth":"null" };
        return this.http.post(`${webServiceEndpoint}/person`, JSON.stringify(myObj), {
            headers: headers
        }).map((res: Response) => {
                return res.json();
            }).publish().refCount();
    }
    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
}
