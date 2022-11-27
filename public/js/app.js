


console.log('Client side javascript is loaded!!')



const weatherForm=document.querySelector('form')

const search=document.querySelector('input')

const message_one=document.querySelector('#message-1')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    message_one.textContent='Loading.......'
    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                return message_one.textContent=data.error
            }
            message_one.textContent=data.forecast
        })
})
    
})