export default function createTile(clickEventListener){
    let tile = document.createElement('div');
    tile.className = 'tile';
    tile.addEventListener('click', clickEventListener);
    return tile;
}