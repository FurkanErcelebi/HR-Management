
const express = require("express");
const expressServer = express();
const pg = require("pg");
const cors = require("cors");
const schedule = require('node-schedule');

const processEnv = process.env;
const connectionString = `postgresql://${processEnv.DB_USER}:${processEnv.DB_PASSWORD}@${processEnv.DB_HOST}:${processEnv.DB_PORT}/${processEnv.DB_NAME}`;

function executeSqlOperation(query, values = []) {
    return new Promise(function (resolve, reject) {
        // Some imaginary 2000 ms timeout simulating a db call
        const client = new pg.Client(connectionString);
        client.connect();
        client.on("error", (err) => {
        console.error("pg something bad has happened!", err.stack);
        });

        client.query(`SET search_path TO '${processEnv.DB_SCHEMA}';`);
        client.query(query, values, (err, res) => {
            if(err)
                console.error('db query error: ', err);
            client
                .end()
                .then(() =>
                        console.log("client bağlantıyı kapattı", query?.substring(0, 50))
                )
                .catch((err) =>
                    console.error(
                        "DB bağlantı kapama hatası",
                        query?.substring(0, 50),
                        err.stack
                    )
                );
            resolve(JSON.stringify(err ? err : res));
        });
    });
}

expressServer.use(cors({
    origin: true
}))

expressServer.use(express.json());
expressServer.use(express.urlencoded({ extended: true }));

expressServer.listen(processEnv.PORT, () => {
    console.log(`Start to running in port ${processEnv.PORT} ...`);
    executeSqlOperation("select 1 as number")
            .then((_) => console.log("Database connected"))
            .catch((err) => console.log("Database connection has failed due to : ", err));
});

// add candidates
expressServer.post("/candidate/add", (request, response) => {
    const body = request.body;
    const query = `INSERT INTO basvuranlar(
        adi, soyadi, email, telefon_numarasi, elts_puani, universite, not_ortalamasi, is_deneyimi, basvurulan_pozisyon, basvurulan_departman)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`
    const values = [
        body.name,
        body.surname,
        body.email,
        body.phoneNumber,
        body.eltsScore,
        body.university,
        body.meanScore,
        body.experience,
        body.position,
        body.department
    ];
    executeSqlOperation(query, values)
        .then(() => response.json({ result: "successful"}))
        .catch((_) => response.json({ result: "failed"}));
});

// add candidates
expressServer.post("/candidate/add-list", (request, response) => {
    const candidateList = request.body.list;
    let idx = 0;
    let responseList = [];
    const query = `INSERT INTO basvuranlar(
        adi, soyadi, email, telefon_numarasi, elts_puani, universite, not_ortalamasi, is_deneyimi, basvurulan_pozisyon, basvurulan_departman)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`
    candidateList.forEach((candidateInfo) => {
        const values = [
            candidateInfo.name,
            candidateInfo.surname,
            candidateInfo.email,
            candidateInfo.phoneNumber,
            candidateInfo.eltsScore,
            candidateInfo.university,
            candidateInfo.meanScore,
            candidateInfo.experience,
            candidateInfo.position,
            candidateInfo.department
        ];
        executeSqlOperation(query, values).then((result) => {
            idx++;
            responseList.push({
                values: values,
                result: result
            });
            if (candidateList.length == idx) {
                response.json({ resultList: responseList});
            }
        });
    });
});

function simpleSelectQueryExecution(table, privetKeyColumn, responseListKey, request, response) {
    let values = [];
    let extraCondition = '';
    if (request.query && request.query.id) {
        extraCondition = `where ${privetKeyColumn} = $1`;
        values.push(request.query.id);
    }
    const query = `SELECT * FROM ${table} ${extraCondition};`;
    executeSqlOperation(query, values)
        .then((result) => {
            if (result.includes('error')) {
                response.status(400).json({ message : result});
            }
            else {
                response.json({ [responseListKey]: JSON.parse(result).rows})
            }
        })
        .catch((_) => response.json({ result: "failed"}));
}

// get candidates
expressServer.get("/candidate/get", (request, response) => {
    simpleSelectQueryExecution('basvuranlar', 'basvuran_id', 'candidateList', request, response);
});

//update candidates
expressServer.delete("/candidate/update", (_, response) => {
    const body = request.body;
    let updateAssignments = '';
    let values = [body.id];
    [{
        columnName: "adi",
        keyName: "name"
    },{
        columnName: "adi",
        keyName: "name" 
    },{
        columnName: "adi",
        keyName: "name" 
    },{
        columnName: "adi",
        keyName: "name" 
    },{
        columnName: "adi",
        keyName: "name" 
    },{
        columnName: "adi",
        keyName: "name" 
    },{
        columnName: "adi",
        keyName: "name" 
    },{
        columnName: "adi",
        keyName: "name" 
    },{
        columnName: "adi",
        keyName: "name" 
    },{
        columnName: "adi",
        keyName: "name" 
    }].forEach((updateInfo) => {
        if (Object.keys(body).includes(updateInfo.keyName)) {
          updateAssignments = updateAssignments + (updateAssignments.length > 0 ? ", " : "") + `${updateInfo.columnName}=$${values.length}` + " ";
          values.push(body[updateInfo.keyName]);
        }
    });
    const query = `UPDATE basvuranlar
                    SET ${updateAssignments}
                    WHERE basvuran_id=$1;`;
    executeSqlOperation(query,values)
        .then(() => response.json({ result: "successful"}))
        .catch((_) => response.json({ result: "failed"}));
});

// delete candidates
// add candidates_history

async function removeFromCandidate(idList) {
    const query = `DELETE FROM basvuranlar WHERE basvuran_id IN (${idList});`;
    // let values = [idList];
    return executeSqlOperation(query);
}

expressServer.delete("/candidate/remove", (request, response) => {
    const id = request.body.id;
    removeFromCandidate(id)
        .then(() => response.json({ result: "successful"}))
        .catch((_) => response.json({ result: "failed"}));
});

// get candidates_history

// delete candidates_history


// add candidate info to employee table and remove from candidate
expressServer.post('/employee/add-batch', (request, response) => {
    const employeeInfoList = request.body.employeeInfoList;
    const query = `INSERT INTO calisanlar(adi, soyadi, email, "telefon_numarası", departman, pozisyon, ise_baslama_tarihi, "performans_puanı", maas) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`;
    let values = [];
    let count = 0;
    employeeInfoList.forEach((employeeInfo) => {
        values = [
            employeeInfo.name,
            employeeInfo.surname,
            employeeInfo.email,
            employeeInfo.phoneNumber,
            employeeInfo.department,
            employeeInfo.position,
            employeeInfo.attendanceDate,
            Number(employeeInfo.performanceScore),
            20000];
        executeSqlOperation(query, values)
            .then(() => {
                count++;
                if (employeeInfoList.length == count) {
                    const idList = employeeInfoList.map((employeeInfo) => employeeInfo.candidateId).toString();
                    removeFromCandidate(idList)
                        .then(() => response.json({ result: "successful"}))
                        .catch((_) => response.json({ result: "failed"}));           
                }
            });
    });
});

//get list of employees
expressServer.get("/employee/get", (request, response) => {
    simpleSelectQueryExecution('calisanlar', 'calisanlar_id', 'employeeList', request, response);
});

// raise salary of specified employees

// promote specified employees

// assign specific tasks to specified employees

// get specific tasks to specified employees
expressServer.get("/tasks/get", (request, response) => {
    simpleSelectQueryExecution('gorevler', 'devamsizlık_id', 'taskList', request, response);
});

// get continuity status of days for specified employees
expressServer.get("/absenteeism/get", (request, response) => {
    simpleSelectQueryExecution('devamsizliklar', 'devamsizlık_id', 'absenteeismList', request, response);
});

//get performance score threshold
expressServer.get('/score-threshold', (_,response) => {
    response.json({threshold: Number(processEnv.SCORE_THRS)});
});

async function hesaplaVeGuncelle() {
    try {
        executeSqlOperation('SELECT calisanlar_id, ise_baslama_tarihi FROM calisanlar')
            .then((result) => {
                if (!result.includes('error')) {
                    JSON.parse(result).rows.forEach((calisan) => {
                        const { calisanlar_id: calisanId, ise_baslama_tarihi: iseBaslamaTarihi } = calisan;
                        const query = `
                                        SELECT 
                                        (SELECT COUNT(*) FROM devamsizliklar WHERE calisanlar_id = $1) AS kabul_edilmeyen_devamsizlik_sayisi,
                                        (SELECT COUNT(*) FROM gecikmeler WHERE calisan_id = $1) AS gecikme_gun_sayisi
                                        FROM 
                                        calisanlar
                                        WHERE
                                        calisanlar_id = $1;`;
                        const values = [calisanId];
                        executeSqlOperation(query, values)
                            .then((innerResult) => {
                                if (!innerResult.includes('error')) {
                                    
                                    const { kabul_edilmeyen_devamsizlik_sayisi, gecikme_gun_sayisi } = JSON.parse(innerResult).rows[0];
    
                                    const simdikiTarih = new Date();
                                    const iseBaslamaTarihiDate = new Date(iseBaslamaTarihi);
                                    const calismaGunleri = Math.ceil((simdikiTarih - iseBaslamaTarihiDate) / (1000 * 60 * 60 * 24));
                                    const devamlilikGunleri = Math.max(calismaGunleri - (kabul_edilmeyen_devamsizlik_sayisi + gecikme_gun_sayisi), 0);
                                    const devamlilikOrani = devamlilikGunleri / calismaGunleri;
                                    const performansPuani = devamlilikOrani * 10;
                                    executeSqlOperation('UPDATE calisanlar SET performans_puanı = $1 WHERE calisanlar_id = $2', [performansPuani, calisanId]);
                                }

                            });
                    });
                }

            });
    } catch (err) {
      console.error('Bir hata oluştu:', err);
    }
  }

//get performance score threshold
expressServer.post('/trigger-performance-calculation', (_,response) => {
    response.json({result: "successful"});
    hesaplaVeGuncelle();
});

const __ = schedule.scheduleJob('0 */1 * *', function(){
    console.log('Employee performances recalcuating...');
    hesaplaVeGuncelle();
});
