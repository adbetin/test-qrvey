import { CountryData } from './country-data';
export class Country {
    private _name: string;
    private _selected: boolean;

    constructor(data: CountryData, selected: boolean = false){
        this._name = data.name;
        this._selected = selected;
    }

    public get name(){
        return this._name;
    }

    public get selected(){
        return this._selected;
    }
}
