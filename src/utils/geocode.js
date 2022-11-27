const request=require('request')


const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYWNoaW50eWExOCIsImEiOiJjbGFsY3IybWIwNDV1M3Bwd2R6ZDNwbGEwIn0.PeKcRo2VPsn0vTuNqD30vw&limit=1'

    request({url:url,json:true},(error,response)=>{
            const  {message,features}=response.body
            if(error){
                callback('Unable to connect to geocode!!!',undefined)
            }
            else if(message){
                callback('ACCESS DENIED!!!',undefined)
            }
            else if(features.length===0){
                callback('Enter a valid place',undefined)
            }
            else{
                callback(undefined,{
                    longitude:features[0].center[0],
                    latitude:features[0].center[1]
                })
            }
    })
}

module.exports=geocode