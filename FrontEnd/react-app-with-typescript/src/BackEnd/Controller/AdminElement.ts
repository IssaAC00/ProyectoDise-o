import { Element } from '../Model/Element'

class AdminElement{
    private _elements: Element[] = [];

    constructor(){}

    public search(id: string): Element{
        for(const element of this._elements){
            if (element.id === id) {
                return element;
            }
        }
        return null!;
    }

    public add(element: Element):boolean{
        this._elements.push(element);
        return true;
    }

    public see(id: string): Element{
        return this.search(id);

    }

    public modify(element: Element):boolean{
        this._elements.forEach((item, index, arr) => {
            if (item.id === element.id){
                arr[index] = element;
            }
        });
        return true;
    }

    public delete(id: string):boolean{
        let element = this.search(id);
        this._elements = this._elements.filter(item => item !== element);
        return true;
    }
}

export{ AdminElement };