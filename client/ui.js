const taskForm= document.querySelector("#taskForm")
const CreateDom= document.querySelector("#CreateDocm")
const ConsultarDocm= document.querySelector("#ConsultarDocm")



document.addEventListener("DOMContentLoaded", () =>
{
    App.init()
})

// taskForm.addEventListener("submit", e=>{
//     e.preventDefault() //cancelar el refresh

//     console.log(
//             taskForm["dni"].value,
//         taskForm["fullname"].value,
//         taskForm["grade"].value
//     )
//     App.createStudent(
//         taskForm["dni"].value,
//         taskForm["fullname"].value,
//         taskForm["grade"].value
//     )
// })
// CreateDom.addEventListener("submit", e=>{
//     e.preventDefault() //cancelar el refresh

//     console.log(
//         CreateDom["doc"].value,
//         CreateDom["dni"].value,
        
       
//     )
//     App.createArchivo(
//         CreateDom["doc"].value,
//         CreateDom["dni"].value,
        
       
//     )
// })
ConsultarDocm.addEventListener("submit", e=>{
    e.preventDefault() //cancelar el refresh

    console.log(
    
        ConsultarDocm["dni"].value,
        
       
    )
    App.ConsultarDocumentos(
       
        ConsultarDocm["dni"].value,
        
       
    )
})