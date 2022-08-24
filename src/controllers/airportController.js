const par = require('csv-parser');
const fs= require('fs');

const airportsController = {
    "getAirports": async (req,res) => {
        const results = [];
        const string = req.query.country

        console.log(string);

        fs.createReadStream('airports.csv')
        .pipe(par({}))
        .on('data', (data) => results.push(data))
        .on('end', () => {
            let name = []
            if(string.length > 3) {
                results.forEach(r => {
                    if(r.name === string){
                        name.push({
                            name: r.name,
                            lat:  r.latitude_deg,
                            long: r.longitude_deg
                        });
                    }
                })
            }else{
                results.forEach(r => {
                    if(r.iso_country === string){
                        name.push({
                            name: r.name,
                            lat:  r.latitude_deg,
                            long: r.longitude_deg
                        });
                    }
                })
            }
            return res.json(name)
        })
    },
}
module.exports = airportsController;