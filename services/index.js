const fetchProducts = require("../dal/fetchProducts");

const getProducts = async (data) => {
    const { currentPage = 1, pageSize = 10 } = data;
    const results = await fetchProducts(data);
    console.log("getProducts results", results);
    delete data.currentPage;
    delete data.pageSize;
    const totalRows = await fetchProducts(data);
    const formattedResponse = responseFormatter(results, currentPage, pageSize, totalRows.length);
    return formattedResponse;
}

const responseFormatter = (results, currentPage, pageSize, totalRows) => {
    const responseObj = {
        "currentPage": currentPage,
        "pageSize": pageSize,
        "totalPages": (totalRows / pageSize) ,
        "totalCount": 0,
        "data": []
    }
    responseObj.totalCount = results.length;
    responseObj.data = results;
    return responseObj;
}

module.exports = getProducts;