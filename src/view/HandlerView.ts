class HandlerView{
    private _handler: HTMLElement;
    private _parent: HTMLElement;
    
    constructor(parent: HTMLElement ){
        this._handler = document.createElement('div');
        this._handler.classList.add('handler');
        this._parent = parent;
        this._parent.appendChild(this._handler);
    }
}

export { HandlerView };