
console.log("My javascript file is loaded sucessfully!!")



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')

// messageone.textContent = 'From JavaScript'
// messagetwo.textContent = "From Javascript 2"


weatherForm.addEventListener('submit',(e) => {
   e.preventDefault()

   const location = search.value

   messageone.textContent = "Loading..."
   messagetwo.textContent = ''

   fetch('http://localhost:3000/weatherapp?address=' + location).then((response) => {
   response.json().then((data) => {
         if(data.error){
            messageone.textContent = data.error
            return  console.log(data.error)
         }
         else {
            messageone.textContent = data.location
            messagetwo.textContent = data.forecastdata
            
         }

         console.log("forecast:" , data.forecastdata)
         console.log("location:",data.location)

            
   })
}
)
   console.log(location)
    console.log('testing')
})



