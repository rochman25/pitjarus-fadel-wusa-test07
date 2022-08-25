const db = require('../models');

//get visit detail with store and surveyor detail data
//expected return single object detail visit
async function getVisitDetail(visitId) {
    const v = await db.sequelize.query(
        `SELECT 
        rd.visit_id, s.id as store_id, s.name as store_name, 
        sr.id as surveyor_id, sr.username as surveyor_name  
        FROM report_display as rd 
        LEFT JOIN store as s on rd.store_id = s.id
        LEFT JOIN surveyor as sr on rd.surveyor_id = sr.id 
        WHERE rd.visit_id = :visit_id
        GROUP BY visit_id`, {
            replacements : {
                visit_id: visitId
            },
            type: db.sequelize.QueryTypes.SELECT
        }
    );

    return v[0];
}


//get report display by visit id
//expected return array of report_display
async function getDisplayByVisitId(visitId) {
    const v = await db.sequelize.query(
        `SELECT rd.category_id, c.name as category_name, rd.json_path
        FROM report_display as rd
        LEFT JOIN category as c on c.id = rd.category_id
        WHERE visit_id = :visit_id
        `,{ 
            replacements: {
                visit_id: visitId
            },
            type: db.sequelize.QueryTypes.SELECT
        }
    );
    return v;
}


//remap function to send to response
//expected return single object of visit detail and array of report displays
async function getResVisitDetail(visitId){

    //get the data
    const visitDetail = await this.getVisitDetail(visitId);
    const displayVisit = await this.getDisplayByVisitId(visitId);
    //end get data

    const displays = [];

    //remap display visit data from db to expected response
    displayVisit.forEach(function(item){
        const existingIndex = displays.findIndex(obj => {
            return obj.category_id === item.category_id;
          });
        const isExist = existingIndex < 0 ? false: true;
        if(!isExist){
            const data = {
                category_id: item.category_id,
                category_name: item.category_name,
                json_paths : [
                    {
                        "path":item.json_path
                    }
                ]
            }
            displays.push(data);
        }else{
            displays[existingIndex].json_paths.push({
                "path":item.json_path
            });
        }
    });
    visitDetail.displays = displays;
    return visitDetail
}

module.exports = {
    getResVisitDetail,
    getDisplayByVisitId,
    getVisitDetail
}
