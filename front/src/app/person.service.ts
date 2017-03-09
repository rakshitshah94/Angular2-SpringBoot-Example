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

    getValue(personClass : User) : Rx.Observable<Response>{
        var personClassObj = {"id":personClass.id,"firstname":personClass.firstname, "age":personClass.age, "lastname":personClass.lastname,"dateOfBirth":"null" }
        return this.http.get(`${webServiceEndpoint}/person/${personClass.id}`);
    }


    updatePerson(personClass : User) : Rx.Observable<string>{
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("Cache-Control", "no-cache");
        headers.append("Cache-Control", "no-store");
        headers.append("If-Modified-Since", "Mon, 26 Jul 1997 05:00:00 GMT");
        var myObjUpdate ={"id":personClass.id,"firstname":personClass.firstname, "age":personClass.age, "lastname":personClass.lastname,"dateOfBirth":"null" }
        return this.http.post(`${webServiceEndpoint}/person/${personClass.id}`,JSON.stringify(myObjUpdate),{
            headers : headers
        }).map((res: Response) => {
            return res.json();
        }).publish().refCount();
    }

    createPerson(personClass : User): Rx.Observable<string>{
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("Cache-Control", "no-cache");
        headers.append("Cache-Control", "no-store");
        headers.append("If-Modified-Since", "Mon, 26 Jul 1997 05:00:00 GMT");
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
