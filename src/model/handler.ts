class Handler{
    private _position: number;
    constructor(position: number){
       this._position = position;
    }

    get position(): number {
		return this._position;
	}

	set position(value: number){
        this._position  =  value;
	}
}

export { Handler };