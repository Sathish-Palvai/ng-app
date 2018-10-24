import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Party } from '../models/customer';
 
export const CREATE_PARTY = 'Party_Create';
export const DELETE_PARTY = 'Party_Delete';
export const RETRIEVE_PARTY = 'Party_Retrieve';
 
export class CreateParty implements Action {
    readonly type = CREATE_PARTY;
 
    constructor(public payload: Party) { }
}
 
export class DeleteParty implements Action {
    readonly type = DELETE_PARTY;
 
    constructor(public id: string) { }
}

export class RetrieveParty implements Action {
    readonly type = RETRIEVE_PARTY;
 
    constructor(public id: string) { }
}
 
export type Actions = CreateParty | DeleteParty | RetrieveParty;