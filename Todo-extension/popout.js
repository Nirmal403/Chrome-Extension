

document.querySelector('.create-todo').addEventListener('click', function() { 
    document.querySelector('.new-item').style.display='block';
});

document.querySelector('.new-item button').addEventListener('click', function() { 

    let itemName = document.querySelector('.new-item input').value; 

    if(itemName != '') {

        let itemsStorage = localStorage.getItem('todo-items'); 

        if (itemsStorage == null) { 
            itemsStorage = '[]'; 
        }

        let itemsArr = JSON.parse(itemsStorage); 
        itemsArr.push({"item":itemName, "status":0});
        saveItems(itemsArr); 
        getItems(); 
        document.querySelector('.new-item input').value=''; 
        document.querySelector('.new-item').style.display='none'; 

    }
});

function getItems() { 

    const itemsList = document.querySelector('ul.todo-items'); 
    itemsList.innerHTML = ''; 
    let newItemHTML = ''; 

    try {

        let itemsStorage = localStorage.getItem('todo-items'); 
        let itemsArr = JSON.parse(itemsStorage); 

        for (let i = 0; i < itemsArr.length; i++) {

            let status = '';
            if (itemsArr[i].status == 1) { 
                status = 'class="done"'; 
            }
            
            newItemHTML += `<li data-itemindex="${i}" ${status}> 
            <span class="item">${itemsArr[i].item}</span> 
            <div><span class="itemComplete">✅</span><span class="itemDelete">🗑</span></div>
            </li>`;
            
        }

        itemsList.innerHTML = newItemHTML;
        let itemsListUL = document.querySelectorAll('ul li');

        for (let i = 0; i < itemsListUL.length; i++) {

            itemsListUL[i].querySelector('.itemComplete').addEventListener('click', function() { 
                let index = this.parentNode.parentNode.dataset.itemindex;
                itemComplete(index);
            });

            itemsListUL[i].querySelector('.itemDelete').addEventListener('click', function() {
                let index = this.parentNode.parentNode.dataset.itemindex;
                itemDelete(index);
            });

        }

    } catch (e) {

    }

}

function itemComplete(index) { 

    let itemsStorage = localStorage.getItem('todo-items'); 
    let itemsArr = JSON.parse(itemsStorage); 
    itemsArr[index].status = 1; 
    saveItems(itemsArr); 
    document.querySelector('ul.todo-items li[data-itemindex="'+index+'"]').className='done'; 

}

function itemDelete(index) { 

    let itemsStorage = localStorage.getItem('todo-items');
    let itemsArr = JSON.parse(itemsStorage); 
    itemsArr.splice(index, 1); 
    saveItems(itemsArr); 
    document.querySelector('ul.todo-items li[data-itemindex="'+index+'"]').remove();


}

function saveItems(obj) { 

    let str = JSON.stringify(obj); 
    localStorage.setItem('todo-items', str); 

}

getItems();