const catchAsync = require('../util/catchAsync');
const db = require('../models');
const report_display_service = require('../services/report_display');
const report_product_service = require('../services/report_product');
const Joi = require('joi');

const getVisit = catchAsync(async (req, res) => {
    const {
        visit_id: visitId
    } = req.params
    const v = await db.report_display.findAll({
        where: {
            visit_id: visitId
        }
    })
    if (v.length > 0) {
        res.status(200).json(v)
    } else {
        res.status(400).json({
            message: "visit not found"
        })
    }
})

const getReportDisplay = catchAsync(async (req, res) => {
    /** logic here */
    const {
        visit_id: visitId
    } = req.body;
    const validate = schema.validate({
        visit_id: visitId
    });

    if (validate.error) {
        res.status(400).json({
            message: validate.error
        });
    }

    if (!isExistVisitId(visitId)) {
        res.status(400).json({
            message: "visit not found"
        })
    } else {
        const output = await report_display_service.getResVisitDetail(visitId);
        res.status(200).json(output);
    }

})

const getReportProduct = catchAsync(async (req, res) => {
    /** logic here */
    const {
        visit_id: visitId
    } = req.body;
    const validate = schema.validate({
        visit_id: visitId
    });
    if (validate.error) {
        res.status(400).json({
            message: validate.error
        });
    }

    if (!isExistVisitId(visitId)) {
        res.status(400).json({
            message: "visit not found"
        })
    } else {

        const productReport = await report_product_service.getResReportProduct(visitId);
        /* contoh output */
        const output = {
            visit_id: visitId,
            products: productReport
        }
        res.status(200).json(output);
    }
})

const batchReportProduct = catchAsync(async (req, res) => {
    /** logic here */
    const {
        visit_id: visitId
    } = req.body;
    const validate = schema.validate({
        visit_id: visitId
    });
    if (validate.error) {
        res.status(400).json({
            message: validate.error
        });
    }

    if (!isExistVisitId(visitId)) {
        res.status(400).json({
            message: "visit not found"
        })
    } else {
        const productReport = await report_product_service.getResReportProduct(visitId);
        const dataArr = productReport.map(item => {
            return {
                visit_id: visitId,
                product_id: item.product_id,
                jumlah_product: item.jumlah
            }
        });
        db.report_product.bulkCreate(dataArr);
        res.status(200).json({
            status: "OK",
            message: "batch success"
        });
    }


});


const schema = Joi.object({
    visit_id: Joi.string().max(50).required()
});


function isExistVisitId(visit_id) {
    const v = db.report_display.findAll({
        where: {
            visit_id: visit_id
        }
    })
    return v.length > 0 ? true : false;
}



module.exports = {
    getVisit,
    getReportDisplay,
    getReportProduct,
    batchReportProduct
}