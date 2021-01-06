module.exports = {
    bodyToMongoose: function(bodyObject){
        const formData = bodyObject;
        const detail = new Object;
        
        detail.isbn = bodyObject.isbn;
        detail.publisher = bodyObject.publisher;
        detail.publication_date = bodyObject.publication_date;
        detail.pages = bodyObject.pages;
        detail.sales_rank = bodyObject.sales_rank;
        detail.product_dimensions = bodyObject.product_dimensions

        formData.detail = detail;
        
        return formData;
    }
}