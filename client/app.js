App ={

    contracts: {},
  
    init: async ()=> {
        console.log('loaded')
         App.loadEthereum()
         App.loadAccount()
         App.loadContracts()
        
    },

    loadEthereum: async () =>{
        if( window.ethereum){
            App.web3Provider =window.ethereum
            await window.ethereum.request({method: 'eth_requestAccounts'})
           
        } else{
            console.log('instale ethereum')
        }
    },
    loadAccount: async ()=>{
        const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
        // console.log(App.accounts)
        App.account = accounts[0] 
        console.log(App.account)
     }
 
     ,
    loadContracts: async () => {
        const res = await fetch("Verificador.json");
        const VerificadorJSON = await res.json();
         //traer el json 
        App.contracts.verificador = TruffleContract(VerificadorJSON)
 
        //conectar a metamask
        App.contracts.verificador.setProvider(App.web3Provider)
 
        //inicializar 
 
        App.Verificador= await App.contracts.verificador.deployed()
 
        
     },
     // FUnciones del smartcontract- llamadas desde appjs
     createStudent: async (dni, fullname, grade) =>{
        const result = await App.Verificador.createStudent(dni, fullname, grade, {from: App.account})
        console.log(result)
        // result.logs[0].args
     },
     createArchivo: async (hash, dni) =>{
        const a = await App.Verificador.createArchivo(hash, dni, {from: App.account})
        console.log(a)
        // result.logs[0].args ConsultarDocumentos
     },
     ConsultarDocumentos: async (dni) =>{
        let html = ''
        const a = await App.Verificador.ConsultarDocumentos(dni, {from: App.account})
        var c =[]
        var contador=0
        for(var i=0; i<a.length; i++){
          if( a[i]!= ""){
            c[contador]=a[i]

            const documt=a[i]
            contador++

            let taskElement = `
            <div class = "card bg-dark rounded-0 mb-2">
                <div class= "card-header">
                <span><h2 class="text-info"> Documento  numero  ${contador}</h2> </span>
                </div>
                <div class="card-body">
                    <p>contenido del archivo <span class="text-warning">${documt} </span> </p>
                    
                </div>
                
                
                
            </div>
          `
          html+= taskElement;

          }  
        }
        if(contador==0){
            console.log('no hay elemento')
            let taskElement = `
            <div class = "card bg-dark rounded-0 mb-2">
                <div class= "card-header">
                <span> <h1 class="text-danger">No hay  Documento</h1> </span>
                </div>
                <div class="card-body">
                    <span>Vuelva a buscar</span>
                </div>
                
                
                
            </div>
          `
          html+= taskElement;
        }
        console.log(c)
       
        document.querySelector('#tasksList').innerHTML= html;
        
     },
    
    
}

