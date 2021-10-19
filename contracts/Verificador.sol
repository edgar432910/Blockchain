//SPDX-License-Identifier:MIT
pragma experimental ABIEncoderV2;
pragma solidity >=0.5.0 <0.9.0;


contract Verificador{
    
    // Direccion del profesor
    address public users;
    
    // Constructor 
    constructor ()  {
        users = msg.sender;
    }
       
    struct Student {
        uint id;
        uint dni;
        string fullname;
        string grate;
    }
    
    struct Archivo{
        string hash;
    }
    
    //Todos los estudiantes 
    uint nextId =0;
    
    // array todos los estudiantes
    Student[] Students;
    
    // Todos los TodoslosArchivos
    string [] public TodoslosArchivos; 
    
    
    //dni devuelve un obj alumno
    mapping (uint => Student) MappingAlumno;
    
    //Archivo -indice devuelve un dni
    mapping(string=>Student) MappingDocumentos;
    
    event evento_StudentExist(bool); 
    event event_createStudent(uint);
    
   // default value 0, add public to see the value
    
    function createStudent(uint _dni, string memory _fullname, string memory _grate) public {
        Students.push(Student(nextId,_dni, _fullname, _grate));
        MappingAlumno[_dni]=Student(nextId,_dni, _fullname, _grate);
        nextId++;
        emit event_createStudent(nextId);
    }
    function createArchivo(string memory _hashArchivo, uint _dni) public payable returns(bool)  {
        bool a =false;
        if(StudentExist(_dni)){
            TodoslosArchivos.push(_hashArchivo);
            
            MappingDocumentos[_hashArchivo]=MappingAlumno[_dni] ;
             a= true;
        }
         return a;
        
    }
    function StudentExist(uint _dni)public view returns (bool){
        bool a =false;
        
        for(uint i = 0 ; i<Students.length ; i++){
            if(Students[i].dni == _dni ){
                a= true;
            }
        }
        return a;
        
    }
    function DocumentoName(string memory _hashArchivo) public view returns(uint){
       
    	return MappingDocumentos[_hashArchivo].dni;
    }

//devolver documentos
function ConsultarDocumentos(uint _dni)public view returns(uint){
		string [] memory DocumentoxAlumno = new string[](TodoslosArchivos.length);
	uint contador=0;
	for(uint i=0 ; i<TodoslosArchivos.length; i++){
		if(DocumentoName(TodoslosArchivos[i]) == _dni){
			DocumentoxAlumno[contador]= TodoslosArchivos[i];
			contador++;
		}
	}
	return TodoslosArchivos.length;
	
} 

}