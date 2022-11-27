const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=ca431f095dc031e431665e49969de248&query='+encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) +'&units=m'

    request({url:url,json:true},(error,response)=>{
        const {error:loc_error,current}=response.body
        if(error){
            callback('Unable to connect to weather api',undefined)
        }
        else if(loc_error){
            callback('Unable to find location',undefined)
        }
        else{
            callback(undefined,'It is '+current.temperature+' degree celsius'+' the chances of rain are '+current.precip+'%')
        }

    })
}
module.exports=forecast


