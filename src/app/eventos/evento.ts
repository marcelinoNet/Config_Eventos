
export class Evento{
    id: number;
    status: string;
    nmEvento:string;
    nmSolicitante: string;
    dtEvento: Date;
    nmUnidadeOrganizacional:string;
    nmResponsavelEvento:string;
    tpPublico:string;
    tpModalidadeEvento: string;
    tpComercializacao: string;

    nuUnidadeOrganizacional?: number;
    nmTipoPublico?:string;
    nmModalidadeEvento?:string;
    nmTipoComercializacao?:string;
    nuDuracaoEvento?: number;
    nuParticipantes?: number;
    nuTempoFalaParticipante?: number;
    nuSalas?: number;
    nuSessoes?: number;

}