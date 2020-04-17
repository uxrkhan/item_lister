var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
var inputField = document.getElementById('item-input')
var filter = document.getElementById('filter');

// add items
form.addEventListener('submit', e => {
    e.preventDefault();
    
    var item = inputField.value;
    if (item == '') {
        alert('Please enter an item name.');
        return;
    }
    
    // new list item element
    var newListItem = document.createElement('li');
    newListItem.className = "list-group-item"
    newListItem.appendChild(document.createTextNode(item));

    // adding delete element
    var deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger btn-sm float-right delete';
    deleteButton.appendChild(document.createTextNode('X'));
    newListItem.appendChild(deleteButton);

    itemList.appendChild(newListItem);

    inputField.value = '';

    checkListSize();
})

// remove item
itemList.addEventListener('click', e => {
    if (e.target.classList.contains('delete')) {
        //if(confirm('Are you sure you want to delete this item?')){ 
        var li = e.target.parentElement;
        itemList.removeChild(li);
    }

    checkListSize();
})

// filter items
filter.addEventListener('keyup', e => {
    var query = filter.value.toLowerCase();
    var items = itemList.getElementsByTagName('li');

    Array.from(items).forEach(item => {
        var itemName = item.firstChild.textContent.toLowerCase();
        if (itemName.indexOf(query) != -1) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    })
})

function checkListSize() {
    var noItemsText = document.getElementById('no-items');
    var items = itemList.getElementsByTagName('li');
    if (items.length == 0) {
        noItemsText.style.display = 'block';
    } else {
        noItemsText.style.display = 'none';        
    }
}