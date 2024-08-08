import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../model/user.model";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    readonly loginURL: string = `${environment.apiUrl}login`;
    public loggedInUser$ = new BehaviorSubject({});

    constructor(
        private http: HttpClient
    ) {

    }

    login(user: User) {
        return this.http.post(this.loginURL, user, {observe: "response"});
    }
}