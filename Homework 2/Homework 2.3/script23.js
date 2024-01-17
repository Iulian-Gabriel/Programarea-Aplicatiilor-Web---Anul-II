    const item_container = document.getElementById("items");
    const item_template = document.getElementById("itemTemplate");
    const button = document.getElementById("add");

    let items = getItems();
    function getItems(){
    const value = localStorage.getItem("todo") || "[]";

        return JSON.parse(value);
    }

    function setItems(items){
        const itemsJson = JSON.stringify(items);
        localStorage.setItem("todo", itemsJson);
    }

    function addItem(){
        items.unshift({
            description: "",
            completed: false
        });
        setItems(items)
        refreshList()
    }

    function updateItem(item, key, value){
        item[key] = value;
        setItems(items);    
        refreshList();
    }

    function refreshList(){
        items.sort((a, b) =>{
            if(a.completed){
                return 1;
            }
            if(b.completed){
                return -1;
            }
            return a.description < b.description ? -1 : 1;
        });
        item_container.innerHTML = "";
    
        for (const item of items){
            const itemElement = document.importNode(item_template.content, true);
            const descriptionInput = itemElement.querySelector(".item-description");
            const completedInput = itemElement.querySelector(".item-completed");
            descriptionInput.value = item.description;

            completedInput.checked = item.completed;

            descriptionInput.addEventListener("change", () =>{
                updateItem(item, "description", descriptionInput.value);
            });

            completedInput.addEventListener("change", () =>{
                updateItem(item, "completed", completedInput.checked);
            });

            item_container.append(itemElement);
        }
    }
    
    button.addEventListener("click", () =>{
        addItem();

    })
    refreshList();

