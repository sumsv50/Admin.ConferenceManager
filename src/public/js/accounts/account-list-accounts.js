selectionUser = document.querySelector('#select-user');
const url = "api/accounts"

var template = Handlebars.compile($('#list-item-template').html());

selectionUser.onchange = function() {
    type = selectionUser.value;
    
    $.getJSON(url,
        {
            type,
        }
        ,function(result) {
            
            result.docs.forEach(user => {
                if(user.createdAt){
                    var date = new Date(user.createdAt);
                    user.createdAt = date.toLocaleString();
                }
                if(user._id == meId) {
                    user.me = true;
                }
                user.active = user.status == "ACTIVE" ? true : false;
                user.type = type;
            });


            var accountHtml = template({accounts: result.docs});
            $('#items-list').html(accountHtml);
            
            setOnClickListener();
            
            //paginate;
            totalPages = result.totalPages;
            currentPage = result.currentPage;
            hasNextPage = result.hasNextPage;
            hasPrevPage = result.hasPrevPage;

            //Change URL
            var newParams = new URLSearchParams(window.location.search);

           // var oldType = newParams.get('type');
            //console.log(oldType);
            newParams.set('type', type);
            newParams.delete('page');
            var changedUrl =  window.location.pathname +'?' + newParams;

            //if(oldType) {
                history.replaceState({}, 'Product Admin - Dashboard', changedUrl);
            //} else {
            //   history.pushState({}, 'Product Admin - Dashboard', changedUrl);
            //}
            paginationBtn(type, behavior, totalPages, currentPage,hasPrevPage, hasNextPage);
        }
    )
}

function setOnClickListener(){
    //Sử lý khi nhấn vào nút "Block" , "UnBlock"
    btnStatuss = document.querySelectorAll('.tm-product-delete-link');
    
   
    btnStatuss.forEach(btnStatus => {
        var spinner = btnStatus.querySelector('#spinner-change-status');
        var id = btnStatus.getAttribute("id");
        btnStatus.onclick = function(event){
            event.preventDefault();
            
            var behavior = btnStatus.getAttribute("title");
            var child = btnStatus.querySelector('.fas');
            if(behavior=="Block") {
                child.classList.remove("fa-lock-open");
            } else if(behavior=="UnBlock") {
                child.classList.remove("fa-lock");
            }
            spinner.removeAttribute("hidden");

            $.getJSON('api/accounts/edit-status', {type, behavior, id}, (result)=>{
                changView(btnStatus, spinner, result.newStatus);
            })
          

        }
    })
}


getParent = function(element, selector){
    while(element.parentElement) {
        if(element.parentElement.matches(selector)) {
            return element.parentElement
        }
        element = element.parentElement;
    }
}

changView = function(btnStatus, spinner, newStatus) {
    
    spinner.setAttribute("hidden", "hidden");
    child = btnStatus.querySelector(".fas");
    var statusIcon = getParent(child, "tr").querySelector('.status-icon');

    if(newStatus == "BLOCK"){
        btnStatus.setAttribute("title", "UnBlock");

        child.classList.add("fa-lock");
        statusIcon.classList.remove("fa-circle");
        statusIcon.classList.add("fa-ban");
        statusIcon.setAttribute("title", "Status: BLOCK");

    } else if(newStatus == "ACTIVE") {
        btnStatus.setAttribute("title", "Block");

        child.classList.add("fa-lock-open");
        statusIcon.classList.remove("fa-ban");
        statusIcon.classList.add("fa-circle");
        statusIcon.setAttribute("title", "Status: ACTIVE");
    }
}


