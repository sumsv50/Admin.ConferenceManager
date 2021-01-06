// function replaceView(url) {
//     var template = Handlebars.compile($('#list-item-template').html());
//     $.getJSON (url, function(result) {

//         result.products.forEach(product => {
//             if(product.createdAt) {
//                 var date = new Date(product.createdAt);
//                 product.createdAt = date.toLocaleString();
//             }
//         });
//         var productHtml = template({products: result.products});
//         $('#items-list').html(productHtml);
//         totalPages = result.totalPages;
//         currentPage = result.currentPage;
//         hasPrevPage = result.hasPrevPage;
//         hasNextPage = result.hasNextPage;

//         paginationBtn(behavior, type, totalPages, currentPage, hasPrevPage, hasNextPage);
//         const newurl = url.replace('/api','');
//         history.pushState({}, 'Product Admin - Dashboard', newurl);
//     });
// }

var productId;
var categoryId;
var btnDeleteProduct = document.getElementById('btnDeleteProduct');
var btnAddNewCategory = document.getElementById('btnAddNewCategory');
var deleteProductForm = document.forms['delete-product-form'];
var txtCategoryName = document.getElementById('nameCategory');
var txtCategoryName_retype = document.getElementById('nameCategory_retype');

var btnAddNewCategory = document.getElementById('btnAddNewCategory');

//When dialog confirm show
$('#delete-product-modal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    productId = button.data('id');
    categoryId = button.data('cate');

    var name = button.data('name');
    var modal = $(this)
    modal.find('.modal-body').text(`Are you sure delete this product? (${name})`);
})

//Listening
btnDeleteProduct.onclick = function () {
    deleteProductForm.action = '/products/' + productId + '/' + categoryId + '?_method=DELETE';
    deleteProductForm.submit();
}



// When type input
txtCategoryName.addEventListener('input', (event) => {
    if (txtCategoryName.value == '') {
        txtCategoryName.classList.add("is-invalid");
        } else {
            txtCategoryName.classList.remove("is-invalid");
        }

        if (txtCategoryName_retype.value == txtCategoryName.value) {
            txtCategoryName_retype.classList.remove("is-invalid");
        } else {
            txtCategoryName_retype.classList.add("is-invalid");
        }

        //Button
        if (txtCategoryName.value != '' && txtCategoryName_retype.value == txtCategoryName.value) {
            btnAddNewCategory.disabled = false;
        } else {
            btnAddNewCategory.disabled = true;
        }
    });

    txtCategoryName_retype.addEventListener('input', (event) => {
        if (txtCategoryName_retype.value == txtCategoryName.value) {
            txtCategoryName_retype.classList.remove("is-invalid");
        } else {
            txtCategoryName_retype.classList.add("is-invalid");
        }

        //Button
        if (txtCategoryName.value != '' && txtCategoryName_retype.value == txtCategoryName.value) {
            btnAddNewCategory.disabled = false;
        } else {
            btnAddNewCategory.disabled = true;
        }
    });





   
