const catchAsync = require('../util/catchAsync');
const db = require('../models');
const report_display_service = require('../services/report_display');
const report_product_service = require('../services/report_product');

const getVisit = catchAsync(async (req, res) => {
    const {visit_id: visitId} = req.params
    const v = await db.report_display.findAll({
        where: {
            visit_id: visitId
        }
    })
    if(v.length > 0){
        res.status(200).json(v)
    }
    else{
        res.status(400).json({
            message: "visit not found"
        })
    }
})

const getReportDisplay = catchAsync(async (req, res) => {
    /** logic here */
    const {visit_id: visitId} = req.body;
    const output = await report_display_service.getResVisitDetail(visitId);
    res.status(200).json(output);
})

const getReportProduct = catchAsync(async (req, res) => {
    /** logic here */
    const {visit_id: visitId} = req.body;
    const productReport = await report_product_service.getResReportProduct(visitId);
    /* contoh output */
    const output = {
        visit_id: visitId,
        products: productReport
    }
    res.status(200).json(output);
})

const batchReportProduct = catchAsync(async (req, res) => {
    /** logic here */
    res.status(200).json({
        status: "OK",
        message: "batch success"
    })
})



module.exports = {
    getVisit,
    getReportDisplay,
    getReportProduct,
    batchReportProduct
}