
window.onpopstate = function(event) {
    var path_product = window.location.pathname + window.location.search;

    if(window.location.pathname == "/products") {
        replaceProducts("api" + path_product, true);
    } else if(window.location.pathname == "/accounts"){
        replaceAccounts("api" + path_product, true);
    }
    
}

function replaceView(url, itemsHtml, result, notPushState) {
    $('#items-list').html(itemsHtml);
    
    totalPages = result.totalPages;
    currentPage = result.currentPage;
    hasPrevPage = result.hasPrevPage;
    hasNextPage = result.hasNextPage;

    if(!notPushState) {
        const newurl = url.replace('/api','');
        history.pushState({}, 'Product Admin - Dashboard', newurl);
    }
    var urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams.toString());
    
    paginationBtn(typeRou, behavior, totalPages, currentPage, hasPrevPage, hasNextPage);
}

function replaceProducts(url, notPushState) {
    var template = Handlebars.compile($('#list-item-template').html());
    $.getJSON (url, function(result) {
        result.products.forEach(product => {
            if(product.createdAt) {
                var date = new Date(product.createdAt);
                product.createdAt = date.toLocaleString();
            }
        });
        var itemsHtml = template({products: result.products});
        replaceView(url, itemsHtml, result, notPushState);

    });
    var row = document.querySelector('.tm-content-row');
    row.scrollIntoView({behavior: "smooth"});
}
function replaceAccounts(url, notPushState) {
    var template = Handlebars.compile($('#list-item-template').html());

    $.getJSON(url
        , function(result) {
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

            var itemsHtml = template({accounts: result.docs});

            //paginate;
            replaceView(url, itemsHtml, result, notPushState);

            setOnClickListener();
           
        } ) 
        var selector = document.querySelector('#select-user');
        selector.scrollIntoView({behavior: "smooth"});
}

function paginationBtn(typeRou, behavior, totalPages, currentPage, hasPrevPage, hasNextPage) {
    var template = Handlebars.compile($('#btnPaginate-item').html());
    var paginateHtml = template({typeRou, behavior, totalPages, currentPage, hasPrevPage, hasNextPage});
    $('#pagination-wrapper').html(paginateHtml);
 }