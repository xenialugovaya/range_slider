class HandlerView {
    constructor(parent) {
        this._handler = document.createElement('div');
        this._handler.classList.add('handler');
        this._parent = parent;
        this._parent.appendChild(this._handler);
    }
}
export { HandlerView };
//# sourceMappingURL=HandlerView.js.map