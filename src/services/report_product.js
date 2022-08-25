const db = require("../models");
const axios = require('axios');
const report_display_service = require('./report_display');

async function countProductFromArrayJson(arr) {
    const result = [];
    arr.forEach(function (item) {
        const existingIndex = result.findIndex(obj => {
            return obj.object_name === item.object_name;
        });

        const isExist = existingIndex < 0 ? false : true;
        if (!isExist) {
            const data = {
                object_name: item.object_name,
                count: 1,
            }
            result.push(data);
        } else {
            result[existingIndex].count += 1;
        }
    });
    return result;
}

async function getResReportProduct(visitId) {
    const reportDisplays = await report_display_service.getDisplayByVisitId(visitId);
    let resultResponse = [];
    const jsonPaths = reportDisplays.map(item => (item.json_path));
    const response = await axios.all(jsonPaths.map((endpoint) => axios.get(endpoint)));
    
    response.forEach(function(item){
        resultResponse = resultResponse.concat(item.data);
    });

    const resultCount = await countProductFromArrayJson(resultResponse);

    const result = [];
    const products = await getAllProducts();
    resultCount.forEach(async function(item){
        const existingIndex = products.findIndex(obj => {
            return obj.product_label === item.object_name;
        });

        const isExist = existingIndex < 0 ? false : true;
        if(isExist){
            result.push({
                product_id: products[existingIndex].product_id,
                jumlah: item.count
            });
        }
    });
    return result;
}

async function getAllProducts(){
    const v = await db.sequelize.query(
        `SELECT 
        p.id as product_id, p.label as product_label
        FROM product as p
        `, {
            type: db.sequelize.QueryTypes.SELECT
        }
    );

    return v;
}

module.exports = {
    countProductFromArrayJson,
    getResReportProduct
}