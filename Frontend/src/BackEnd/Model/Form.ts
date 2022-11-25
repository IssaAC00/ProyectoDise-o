class Form {
    private _idInspection: number;
    private _idSpolaige: number;
    private _image: string;
    private _observation: string;
    private _recomendation: string

    constructor(_idInspection: number, _idSpolaige:number,
        _image: string, _observation: string, _recomendation: string){
        
            this._idInspection = _idInspection;
            this._idSpolaige = _idSpolaige;
            this._image = _image;
            this._observation = _observation;
            this._recomendation = _recomendation;

    }

    public get idInspection(): number {
        return this._idInspection;
    }

    public get idSpolaige(): number {
        return this._idSpolaige;}

    public get image(): string {
        return this._image;
    }

    public get observation(): string {
        return this._observation;
    }

    public get recomendacion(): string {
        return this._recomendation;
    }

    public set idInspection(value: number) {
        this._idInspection = value;
    }

    public set idSpolaige(value: number) {
        this._idSpolaige = value;
    }

    public set image(value: string) {
        this._image = value;
    }

    public set observation(value: string) {
        this._observation = value;
    }

    public set recomendation(value: string) {
        this._recomendation = value;
    }


}

export { Form };