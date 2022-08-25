const catchAsync = require('../util/catchAsync');
const db = require('../models');
const report_display_service = require('../services/report_display');

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
    const v = await report_display_service.getResVisitDetail(visitId);
    res.status(200).json(v);
})

const getReportProduct = catchAsync(async (req, res) => {
    /** logic here */

    /* contoh output */
    const expectedOutput = {
        visit_id: "V.26.865.22081208343138",
        products: [
            {product_id: 1, jumlah: 1},
            {product_id: 2, jumlah: 2},
            {product_id: 3, jumlah: 1},
            {product_id: 5, jumlah: 6},
        ]
    }
    res.status(200).json(expectedOutput)
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