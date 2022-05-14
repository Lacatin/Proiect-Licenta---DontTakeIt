import { Lucrare } from "./lucrare-model";


export class Student{

    id:             number;
    nume:           string;
    prenume:        string;
    anDeStudiu:     number;
    specializare:   string;
    grupa:          string;
    subgrupa:       string;
    numarMatricol:  string;
    lucrari:        Lucrare[];


    constructor(id: number,
                nume: string,
                prenume: string,
                anDeStudiu: number,
                specializare: string,
                grupa: string,
                subgrupa: string,
                numarMatricol: string,
                lucrari: Lucrare[]){

    this.id = id;
    this.nume = nume;
    this.prenume = prenume;
    this.anDeStudiu = anDeStudiu;
    this.specializare = specializare;
    this.grupa = grupa;
    this.subgrupa = subgrupa;
    this.numarMatricol = numarMatricol;
    this.lucrari = lucrari;

    }

}