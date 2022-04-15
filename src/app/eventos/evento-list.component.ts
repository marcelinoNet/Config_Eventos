import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import * as moment from "moment";
import { map, Observable, take } from "rxjs";
import { Page, PageRequest } from "../util/Pagination";
import { Evento} from "./evento";
import { EventoService } from "./evento.service";

@Component({
    templateUrl: './evento-list.component.html'
})

export class EventListComponent implements OnInit{
    
    page: Page<Evento>  = new Page([],0);
    pageEvent: PageEvent;


    filteredEvents$: Observable<Evento []>;
    _filterBy: string;


    constructor(private eventoService: EventoService){

    } 
    
    ngOnInit(): void {
        this.listarEventos();
    }

    listarEventos(){
        let queryAdicional;
        this.eventoService.listarTodos(
            new PageRequest(
                {
                    pageNumber: this.pageEvent ? this.pageEvent.pageIndex: 0,
                    pageSize: this.pageEvent ? this.pageEvent.pageSize: 3
                },
                queryAdicional
            )
        ).subscribe(
            page => {
                this.page = page;
                console.log(page);
            }, 
            error => {
                this.page = new Page([],0);
            }
            
        );
    }

    

    formatDate(d='') {
        if (d) {
            return (moment(d).locale('pt-br').format('DD/MM/YYYY hh:mm'));
        } else {
            return '';
        }

    }
   
   /* set filter(value: string){
        this._filterBy = value;

        this.filteredEvents$ = this.events$.pipe(map(
            evento => evento.filter(
            (evento: Evento) => (evento.nmEvento.toLocaleLowerCase()
                                       .indexOf(this._filterBy.toLocaleLowerCase()) > -1) ||
                                evento.nmSolicitante.toLocaleLowerCase()
                                       .indexOf(this._filterBy.toLocaleLowerCase()) > -1)));
    }

    get filter(){
        return this._filterBy;
    }  */
    
}