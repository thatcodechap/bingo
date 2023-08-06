export function generateRandomString(length){
    let randomString='',codeForAlphabet;
    for(let i =0;i<length;i++){
        codeForAlphabet = Math.floor(Math.random() * (122 - 97 + 1) + 97);
        randomString += String.fromCharCode(codeForAlphabet);
    }
    return randomString;
}

export function formatPlayers(players){
    return players.map(player=>{
        return {id: player.id, name: player.name, status: player.status};
    });
}

export class LinkedHashmap {
    constructor(){
        let defaultItem = {};
        defaultItem.next = defaultItem;
        defaultItem.prev = defaultItem;
        this.listItems['default'] = defaultItem;
        this.head = defaultItem;
        this.tail = defaultItem;
    }
    listItems = {};
    head;
    tail;
    insert(item){
        this.tail.next = item;
        item.prev = this.tail;
        item.next = this.head;
        this.tail = item;
        this.listItems[item.id] = item;
    }
    delete(item){
        item.prev.next = item.next;
        item.next.prev = item.prev;
        this.tail = item.prev;
        delete this.listItems[item.id];
    }
    inArray(){
        let itemsArray = [];
        let item = this.head.next;
        while(item != this.head){
            itemsArray.push(item);
            item = item.next;
        }
        return itemsArray;
    }
    find(itemId){ return this.listItems[itemId]; }
    nextItem(item){
        if(item.next != this.listItems['default'])
            return item.next;
        return item.next.next;
    }
}
