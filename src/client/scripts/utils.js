export function isHidden(element){
    if(element.style.display == 'none')
        return true;
    return false;
}

export function show(element){
    element.style.display = '';
}
export function hide(element){
    element.style.display = 'none';
}

export function random(from, to){
    return Math.floor(Math.random() * (to - from + 1) + from);
}

export function attributeSelector(selector, attribute){
    let attributeName = Object.keys(attribute)[0];
    return document.querySelector(`${selector}[${attributeName}="${attribute[attributeName]}"]`);
}

