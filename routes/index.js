const router = require('express').Router()
const db = require('../config/connect')

router.get('/report',(req,res)=>{
    res.render('report')
})
router.post('/report',(req,res)=>{
    console.log(req.body);
    db.query(`INSERT INTO faults("fault_desc","reported_by","meter_num","date","status") VALUES('${req.body.fault}','${req.body.name}','${req.body.mtno}','${req.body.date}','Active')`,(err,data)=>{
        if(err){
            console.log(err);
        }else{
            res.send('successfully reported')
        }
    })
})



router.get('/data/trans',(req,res)=>{
    db.query('select * from trans',(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            var coll={
                "name":"transformers",
                "type":"FeatureCollection",
                "crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:OGC:1.3:CRS84"}},
                "features":[]
            }
            data.rows.forEach(element=>{
                var feature={
                    "type":'Feature',
                    "properties":element,
                    "geometry":{"type":"Point","coordinates":[element.lon,element.lat]}
                }
                coll.features.push(feature)
            })
            res.send(coll)
        }
    })
})

router.get('/data/pole',(req,res)=>{
    db.query('select * from poles',(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            var coll={
                "name":"poles",
                "type":"FeatureCollection",
                "crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:OGC:1.3:CRS84"}},
                "features":[]
            }
            data.rows.forEach(element=>{
                var feature={
                    "type":'Feature',
                    "properties":element,
                    "geometry":{"type":"Point","coordinates":[element.lon,element.lat]}
                }
                coll.features.push(feature)
            })
            res.send(coll)
        }
    })
})

router.get('/data/fac',(req,res)=>{
    db.query('select * from facility',(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            var coll={
                "name":"facility",
                "type":"FeatureCollection",
                "crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:OGC:1.3:CRS84"}},
                "features":[]
            }
            data.rows.forEach(element=>{
                var feature={
                    "type":'Feature',
                    "properties":element,
                    "geometry":{"type":"Point","coordinates":[element.lon,element.lat]}
                }
                coll.features.push(feature)
            })
            res.send(coll)
        }
    })
})


router.get('/data/faults',(req,res)=>{
    const qry = `select * 
    from faults,facility
    where faults."meter_num"=facility."meter_num"
    `
    console.log(qry);
    db.query(qry,(err,data)=>{
            if(err){
                console.log(err);
            }
            else{
                var coll={
                    "name":"faults",
                    "type":"FeatureCollection",
                    "crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:OGC:1.3:CRS84"}},
                    "features":[]
                }
                data.rows.forEach(element=>{
                    var feature={
                        "type":'Feature',
                        "properties":element,
                        "geometry":{"type":"Point","coordinates":[element.lon,element.lat]}
                    }
                    coll.features.push(feature)
                })
                res.send(coll)
            }

    })
})


router.get('/faults',(req,res)=>{
    res.render('faultmap')
})


module.exports = router