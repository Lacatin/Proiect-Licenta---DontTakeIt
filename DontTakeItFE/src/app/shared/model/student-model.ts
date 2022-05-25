import { Lucrare } from "./lucrare-model";


export class Student{

    id:             number;
    nume:           string;
    prenume:        string;
    facultate:      string;
    anDeStudiu:     number;
    specializare:   string;
    grupa:          string;
    subgrupa:       string;
    finalizat:      boolean;
    numarMatricol:  string;
    lucrari:        Lucrare[];


    constructor(id: number,
                nume: string,
                prenume: string,
                facultate: string,
                anDeStudiu: number,
                specializare: string,
                grupa: string,
                subgrupa: string,
                numarMatricol: string,
                finalizat: boolean,
                lucrari: Lucrare[]){

    this.id = id;
    this.nume = nume;
    this.prenume = prenume;
    this.facultate = facultate;
    this.anDeStudiu = anDeStudiu;
    this.specializare = specializare;
    this.grupa = grupa;
    this.subgrupa = subgrupa;
    this.finalizat = finalizat;
    this.numarMatricol = numarMatricol;
    this.lucrari = lucrari;

    }

}