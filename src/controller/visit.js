const catchAsync = require('../util/catchAsync');
const db = require('../models')


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

    /* contoh output */
    const expectedOutput = {
        visit_id: "V.26.865.22081208343138",
        store_id: 865,
        store_name: "Toko A",
        surveyor_id: 1,
        surveyor_name: "Surveyor 1",
        displays: [
            {
                category_id: 1,
                category_name: "SKin Care",
                json_paths : [
                    {path: "https://storage2.pitjarus.co/galderma/jsons/20220812/V.26.865.22081208343138_1_1_display1_1.json"},
                    {path: "https://storage2.pitjarus.co/galderma/jsons/20220812/V.26.865.22081208343138_1_1_display1_2.json"}
                ]
            },
            {
                category_id: 2,
                category_name: "SKin Cleansing",
                json_paths : [
                    {path: "https://storage2.pitjarus.co/galderma/jsons/20220812/V.26.865.22081208343138_2_2_display2_1.json"},
                    {path: "https://storage2.pitjarus.co/galderma/jsons/20220812/V.26.865.22081208343138_2_2_display1_1.json"}
                ]
            }
        ]
    }
    res.status(200).json(expectedOutput)
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