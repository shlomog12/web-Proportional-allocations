const numAgentsElement = document.getElementById('numAgents');
const numItemsElement = document.getElementById('numItems');
const playersModal =document.getElementById('edit-players-modal');
const itemsModal =document.getElementById('edit-items-modal');

let namesOfPlayers = ['שחקן 0'];
let nameOfItems = ['פריט 0'];

window.onload = ()=>{
    initPlayersModal();
    initItemsModal();
    createPreferences();
};

function initPlayersModal(){
    playersModal.title = 'הכנס שמות שחקנים:';
    playersModal.typesInput = 'player';
    playersModal.names = namesOfPlayers;
}

function initItemsModal(){
    itemsModal.title = 'הכנס שמות פריטים:';
    itemsModal.typesInput = 'item';
    itemsModal.names = nameOfItems;
}

function setNamesPlayers(len){
    if (len > namesOfPlayers.length){
        for (let index = namesOfPlayers.length ; index < len; index++) {
            namesOfPlayers.push(`שחקן ${index}`);
        }
    }
    while(len < namesOfPlayers.length){
        namesOfPlayers.pop();
    }
    playersModal.names = namesOfPlayers;
    updatePlayersName();
}

function updatePlayersName(){
    const names = playersModal.names;
    const preferences = document.querySelector('.preferences');
    players_ids = Object.keys(names);
    for (let index = 0; index < players_ids.length; index++) {
        const id = players_ids[index];
        const current_preferences = preferences.querySelector(`#preferences-${id}`);
        if (current_preferences){
            current_preferences.title = names[id];
        }
    }
}

function updateItemsName(){
    const preferences = Array.from(document.querySelector('.preferences').children);
    const names = itemsModal.names;
    for (const preference of preferences) {
        const current_items = preference.items;
        for (let index = 0; index < Object.keys(names).length; index++) {
            const item = current_items[index];
            if (!names[item.id]){
                console.log(item.id);
                console.log(names);
                console.log(preference.items);
            }else{
                item.textContent = names[item.id];
            }
        } 
    }
}

function createPreferences(){
    const names = playersModal.names;
    const preferences = document.querySelector('.preferences');
    for (const [key, value] of Object.entries(names)) { 
            const element = document.createElement('sort-able');
            element.setAttribute('id',`preferences-${key}`);
            element.insertItems(itemsModal.names);
            element.title = value;
            preferences.appendChild(element);
    }
}

function updateNumberItems(){
    const len = parseInt(numItemsElement.value);
    if (len > nameOfItems.length){
        for (let index = nameOfItems.length ; index < len; index++) {
            nameOfItems.push(`פריט ${index}`);
        }
    }
    while(len < nameOfItems.length){
        nameOfItems.pop();
    }
    itemsModal.names = nameOfItems;
    const preferences = Array.from(document.querySelector('.preferences').children);
    for (const preference of preferences) {
        const current_items = preference.items;
        if (current_items.length < nameOfItems.length){
            const keys = Object.keys(itemsModal.names);
            for (let index = current_items.length; index < keys.length; index++) {
                const key = keys[index];
                const itemData = {[key]: itemsModal.names[key]};
                preference.insertItems( itemData);
            }
            
        }
        while(preference.items.length > nameOfItems.length){
            const len = preference.items.length;
            console.log(preference.getItemById('item_3'));
            preference.getItemById(`item_${len -1}`).remove();
        }
    }
    updateItemsName();
    itemsModal.names = nameOfItems;
    
}

function updatePreferences(){
    const names = playersModal.names;
    const preferences = document.querySelector('.preferences');
    const old_len = preferences.children.length;
    players_ids =  Object.keys(names);
    const new_len = players_ids.length;
    if (old_len < new_len){     //up
        for (let index = old_len; index < new_len; index++) {
            const key = players_ids[index];
            const value = names[key];
            const element = document.createElement('sort-able');
            element.setAttribute('id',`preferences-${key}`);
            element.insertItems(itemsModal.names);
            element.title = value;
            preferences.appendChild(element);
        }
    }else if (old_len > new_len){   //down
        while(preferences.children.length > new_len){
            elementChild = preferences.children[preferences.children.length - 1];
            preferences.removeChild(elementChild);
        }
    }

}

numItemsElement.addEventListener('input',(event)=>{
    if (!validNumberItemsInput()) return; 
    updatePreferences();
    updateNumberItems();
});

numAgentsElement.addEventListener('input',(event)=>{
    const numAgents = numAgentsElement.value;
    if (numAgentsElement.value.length < 1) return;
    makeNumItemsMultipleOfnumAgents(parseInt(numAgents));
    setNamesPlayers(numAgents);
    updatePreferences();
    updateNumberItems();
});

playersModal.addEventListener('saved',()=>{
    namesOfPlayers = Object.values(playersModal.names);
    setNamesPlayers(namesOfPlayers.length);
});
itemsModal.addEventListener('saved',()=>{
    nameOfItems = Object.values(itemsModal.names);
    updateItemsName();
});

function makeNumItemsMultipleOfnumAgents(numAgents){
    numItemsElement.step = numAgents;
    numItemsElement.min = numAgents;
    let numItems = parseInt(numItemsElement.value);
    if (numAgents > numItems){
        numItemsElement.value = numAgents;
    }else{
        numItems /=numAgents;
        numItems = parseInt(numItems)* numAgents;
        numItemsElement.value = numItems;
    }
}

function validNumberItemsInput(){
    if (numItemsElement.value.length < 1 ) return false;
    if (parseInt(numItemsElement.value) < parseInt(numAgentsElement.value)) return false;
    if (parseInt(numItemsElement.value) % parseInt(numAgentsElement.value) != 0) return false;
    return true;
}

document.getElementById('edit-players-button').addEventListener('click', ()=>{
    playersModal.openModal();
});
document.getElementById('edit-items-button').addEventListener('click', ()=>{
    itemsModal.openModal();
});

// agents_to_test_0 = AgentList({"Shlomo": {"A": 0, "B": 1, "C": 2, "D": 3},"Shira": {"A": 2, "B": 0, "C": 1, "D": 3},"Hadar": {"A": 2, "B": 0, "C": 1, "D": 3},"Or": {"A": 3, "B": 2, "C": 1, "D": 0}})
function getAgentList(){
    const preferences = Array.from(document.querySelector('.preferences').childNodes);
    const agentList = {}; 
    for (const preference of preferences) {
        const playerName = preference.title;
        agentList[playerName] = {};
        const current_items = preference.items;
        const k = current_items.length;
        for (let index = 0; index < k; index++) {
            const itemName = current_items[index].textContent;
            agentList[playerName][itemName] = k - index - 1;
        } 
    }
    return agentList;
}
function runAlgo(){
    const agentList = getAgentList();
    console.log(agentList);
}