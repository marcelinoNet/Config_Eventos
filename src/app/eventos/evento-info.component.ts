import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { DuracaoEvento } from "./duracao-evento";
import { Evento } from "./evento";
import { EventoService } from "./evento.service";


@Component({
    templateUrl:'./evento-info.component.html'
})


export class EventInfoComponent implements OnInit{
    eventData: Evento = {
        id: 0,
        status: "",
        nmEvento: "",
        nmSolicitante: "",
        dtEvento: new Date(),
        nmUnidadeOrganizacional:"",
        nmResponsavelEvento:"",
        tpPublico:"",
        tpModalidadeEvento: "",
        tpComercializacao: "",

        nuUnidadeOrganizacional: 0,
        nmTipoPublico: "",
        nmModalidadeEvento:"",
        nmTipoComercializacao: "",
        nuDuracaoEvento:0,
        nuParticipantes:0,
        nuTempoFalaParticipante:0,
        nuSalas:0,
        nuSessoes:0   
    }

   
    //eventHours: new FormControl('');
    
    event$: Observable<Evento>;

    nuParticipantes: number = 20;
    quantidadeSalas: number = 5;
    nuSessoes: number = 6;
    nuDuracaoEvento: number;
    nuTempoFalaParticipante: number;

    _duracaoEventos: DuracaoEvento[] = [];

    constructor(
        private activatedRouter: ActivatedRoute,
        private eventoService: EventoService
    
        ){
    }
    
    ngOnInit(): void {
        this.event$ = this.eventoService.listarById(+this.activatedRouter.snapshot.paramMap.get('id'));
        
        this._duracaoEventos = this.eventoService.retrieveDuracao();
    }

    checkNumberPart(){
        const tP = this.nuParticipantes;
        
        this.nuParticipantes = Number(tP > 121) ? 121 : this.nuParticipantes;
        this.nuParticipantes = (Number(this.nuParticipantes) < 20) ? 20 : this.nuParticipantes;

        //validar quantidade de mesas
        if (Number(this.nuParticipantes) >= 20 && Number(this.nuParticipantes) <= 25 ) {
            this.quantidadeSalas = 5;
            this.nuSessoes = this.quantidadeSalas +1;
        }
        if (Number(this.nuParticipantes) >= 26 && Number(this.nuParticipantes) <= 49) {
            this.quantidadeSalas = 7;
            this.nuSessoes = this.quantidadeSalas +1;
        }
        if (Number(this.nuParticipantes) >= 50 && Number(this.nuParticipantes) <= 121) {
            this.quantidadeSalas = 11;
            this.nuSessoes = this.quantidadeSalas +1;
        }
    }

    attDuracao(){
        console.log(this.nuDuracaoEvento);
       
    }

    updateEvent(evento: Evento){
        this.eventData.id = evento.id;
        this.eventData.status = evento.status;
        this.eventData.nmEvento = evento.nmEvento;
        this.eventData.nmSolicitante = evento.nmSolicitante;
        this.eventData.nmResponsavelEvento = evento.nmResponsavelEvento;
        this.eventData.tpPublico = evento.tpPublico;
        this.eventData.tpModalidadeEvento = evento.tpModalidadeEvento;
        this.eventData.nmTipoComercializacao = evento.nmTipoComercializacao;
        this.eventData.dtEvento = evento.dtEvento;
        this.eventData.nuParticipantes = this.nuParticipantes;
        this.eventData.nuSalas = this.quantidadeSalas;
        this.eventData.nuSessoes = this.nuSessoes;
        
        this.eventData.nuDuracaoEvento = 100;
        this.eventData.nuTempoFalaParticipante = 2;
        
        //console.log(this.eventData);

        this.eventoService.cadastrar(this.eventData);
    }


}