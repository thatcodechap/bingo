export function createPlayerCard({name, id , status}){
    let card = document.createElement('div');
    card.className = 'playerCard';
    card.setAttribute('data-id',id);
    card.innerHTML = 
    `<p class="playerName">${name}</p><div><div class="status-dot"></div><p class="status-message">${status}</p></div>`;
    if(status == 'ready')
        updatePlayerCard(card, 'ready');
    return card;
}

export function updatePlayerCard(card, status){
    card.querySelector('.status-dot').classList.add('greenBg');
    card.querySelector('.status-message').innerText = status;
}