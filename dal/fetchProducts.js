const connection = require("../package/mysql");
// const columns = ["productId", "productName", "productImagesName", "productImagesURLs", "brandName", "description", "itemCode", "itemType", "currency", "currencyCode", "saleAmount", "brochureFileName", "brochureFileURL", "vendors", "status", "createdBy", "created", "updated", "subCategoryId", "categoryId", "uomId", "shippingMethodId", "shippingTermsId", "paymentTermsId", "categoryName", "subCategoryName", "uomCode", "uomDescription", "organisationName", "organisationId", "vendorInfo" ]
const productTable = "ProductV2";
const productColumns = ["prd.productId", "prd.productName", "prd.productImagesName", "prd.productImagesURLs", "prd.brandName", "prd.description", "prd.itemCode", "prd.itemType", "prd.currency", "prd.currencyCode", "prd.saleAmount", "prd.broshureFileName", "prd.broshureUrls", "prd.vendors", "prd.status", "prd.createdBy", "prd.createdAt", "prd.updatedAt", "prd.subCategoryId", "prd.categoryId", "prd.categoryId", "prd.subCategoryId", "prd.custOrgId"];
const categoryColumns = ["cat.categoryName"];
const subcatColumns = ["subcat.subCategoryName"];
const categoryTable = "CategoryV2";
const subcatTable = "SubCategoryV2";
const orderDirections = ["descending", "ascending"]

const fetchProducts = async (data) => {

    let query = `SELECT ${[...productColumns, ...categoryColumns, ...subcatColumns ].join(", ")} from ${productTable} prd 
    left join ${categoryTable} cat on cat.categoryId = ( SELECT categoryId FROM ${categoryTable} where categoryId = cat.categoryId ) 
    left join ${subcatTable} subcat on subcat.subCategoryId = ( SELECT subCategoryId FROM ${subcatTable} where subCategoryId = subcat.categoryId ) `;
    const { pageSize, currentPage, orderBy = "createdAt", orderDir = "desc", searchBy = "", searchFields = "" } = data;

    if (searchFields && searchBy) {
        query += ` where ${searchFields} = "${searchBy}"`
    }

    if (orderBy && [...productColumns, ...categoryColumns, ...subcatColumns ].includes(orderBy)) {
        query += ` order by ${orderBy}`
    }

    if(orderDir && orderDirections.includes(orderDir)) {
        query += ` ${orderDir}`
    }

    if (pageSize) {
        query += ` LIMIT ${pageSize}`
    }

    if (currentPage) {
        query += ` OFFSET ${currentPage}`
    }

    let result = await connection.awaitQuery(query);
    console.log(result);
    return result;

}


module.exports = fetchProducts;