import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Page, QueryBuilder } from "../util/Pagination";
import { DuracaoEvento } from "./duracao-evento";
import { Evento } from "./evento";

@Injectable({
    providedIn: 'root'
})

export class EventoService{

    pdfJson: any; 

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

    private baseURl = 'http://localhost:3000';
    private endpoint = 'eventos';

    constructor(private httpClient: HttpClient){}

    listarTodos(queryBuilder: QueryBuilder): Observable<Page<Evento>>{
        return this.httpClient
           .get<Evento[]>(`${this.baseURl}/${this.endpoint}?${queryBuilder.buildQueryString()}`,{observe: 'response'})
        .pipe(
            map(response =>  <Page<Evento>>Page.fromResponse(response))
        );
    }

    listarById(id: number): Observable<Evento>{
        return this.httpClient.get<Evento>(`${this.baseURl}/${this.endpoint}/${id}`);
    }
    cadastrar(evento: Evento){
        
        const myJSON = JSON.stringify(evento);
        this.pdfJson = myJSON;
        var url = this.baseURl+"/"+this.endpoint;
        console.log(`${this.baseURl}/${this.endpoint}/${evento.id}`);
        return this.httpClient.put<Evento>(url,myJSON, this.httpOptions);
    }

    retrieveDuracao(): DuracaoEvento[]{
        return DURACAO;
    }
}

var DURACAO: DuracaoEvento[] = [
    {
        id: 1,
        duracao:2
    },
    {
        id: 2,
        duracao:4
    },
    {
        id: 3,
        duracao:6
    },
    {
        id: 4,
        duracao:8
    },
   
]