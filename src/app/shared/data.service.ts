import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Party } from "../models/customer";
import { HttpClient, HttpResponse } from "@angular/common/http";
import * as fromRoot from "../app.reducer";

@Injectable()
export class DataService {
  headers;
  parties: Party;
  constructor(private store: Store<fromRoot.State>, private http: HttpClient) {}

  getParties() {
    return this.http.get<Party[]>("http://localhost:3000/parties");
  }

  getPartyResponse(): Observable<HttpResponse<Party>> {
    return this.http.get<Party>("http://localhost:3000/parties", {
      observe: "response"
    });
  }

  showPartyResponse() {
    this.getPartyResponse()
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map(key => `${key}: ${resp.headers.get(key)}`);
        console.log("Headers: " + JSON.stringify(this.headers));
        // access the body directly, which is typed as `Config`.
        this.parties = { ...resp.body };
        console.log("Parties: " + JSON.stringify(this.parties));
      });
  }
}
