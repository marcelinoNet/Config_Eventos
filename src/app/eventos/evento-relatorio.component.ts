import { Component, OnInit } from "@angular/core";
import { jsPDF } from "jspdf";
import {EventoService} from './evento.service';


import autoTable from 'jspdf-autotable'

@Component({
    templateUrl:"./evento-relatorio.component.html"
})

export class EventoRelatorioComponent implements OnInit{

    constructor(public service: EventoService){}
    ngOnInit(): void {
       
    }

    convert(){
        const pdf = JSON.parse(this.service.pdfJson);
        console.log(pdf);
        const doc = new jsPDF();
        var col = Object.keys(pdf);
        var col2:any = [];
        var rows:any = [];
        var rows2:any = [];
        col.forEach(function(key) {
            rows2.push(pdf[key]);
        });
        
    var colCountModNew = [[col]]
    var rowCountModNew = [rows2] 
    
    /* var rowCountModNew = [
    ["1721079361", "0001", "2100074911", "200", "22112017", "23112017", "51696"],
    ["1721079362", "0002", "2100074912", "300", "22112017", "23112017", "51691"],
    ["1721079363", "0003", "2100074913", "400", "22112017", "23112017", "51692"],
    ["1721079364", "0004", "2100074914", "500", "22112017", "23112017", "51693"]
    ] */
    
   // var rowCountModNew = [rows]
    
    rowCountModNew.forEach(element => {
          rows.push(element);
    
    }); 
    colCountModNew.forEach(element => {
        col2.push(element);
  
  }); 
    console.log(rows);
    
    
       autoTable(doc,{
           head: [['Id', 'status', 'Nome','Solicitante','Data','Comercialização','Responsável','Publico','Modalidade Evento']],
            body: rows,
          })
       doc.save('config_evento.pdf');
    }

}