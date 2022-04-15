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

    search:string = "";
    status:string = "";

    options = [
        { name: "Concluido", value: "Concluido" },
        { name: "Em Andamento", value: "Em Andamento" },
        { name: "Não iniciado", value: "Não iniciado" }
      ]


    filteredEvents$: Observable<Evento []>;
    _filterBy: string;


    constructor(private eventoService: EventoService){

    } 
    
    ngOnInit(): void {
        this.listarEventos();
    }

    listarEventos( reset:boolean = false){

        if(reset && this.pageEvent){
            this.pageEvent.pageIndex = 0;
        }    

        let queryAdicional;

        this.eventoService.listarTodos(
            new PageRequest(
                {
                    pageNumber: this.pageEvent ? this.pageEvent.pageIndex: 0,
                    pageSize: this.pageEvent ? this.pageEvent.pageSize: 3,
                    search: this.search ? this.search: '',
                    status: this.status ? this.status:''
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
   
    /*  set filter(value: string){
        this._filterBy = value;

        this.page = this.page.content. .pipe(map(
            evento => evento.filter(
            (evento: Evento) => (evento.nmEvento.toLocaleLowerCase()
                                       .indexOf(this._filterBy.toLocaleLowerCase()) > -1) ||
                                evento.nmSolicitante.toLocaleLowerCase()
                                       .indexOf(this._filterBy.toLocaleLowerCase()) > -1)));
    }

    get filter(){
        return this._filterBy;
    }    */
    
}

