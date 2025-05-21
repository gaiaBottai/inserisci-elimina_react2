import {useState }from 'react';

export default function Modifica(props){
 

const [modifica,setModifica]=useState(false);
const [nome,setNome]=useState("");
const[ cognome,setCognome]=useState("");
const carica=props.caricaAlunni;

 function FormModifica(){ //questa serve per gestire il form ed associa alla variabile i contrario di ciò che è impostato a conferma
    setModifica(!modifica);
 }


async function SalvaModifica(){
   const response=await fetch(`http://localhost:8080/alunni/${alunno.id}`,
   {method:"PUT",
     headers:{"content-type":"application/json"},
     body: JSON.stringify({nome:nome,cognome:cognome})});
     console.log(response);
     setModifica(false);
     props.onCancella();
}
    return(
<>
       
      
       <tr>
        {
       modifica? (

        <>
        <td>{alunno.id}</td>
        <td><input name="nome" id="nome" onChange={(event)=> setNome(event.target.value)}/></td>
        <td><input name="cognome" id="cognome" onChange={(event)=>setCognome(event.target.value)}/></td>
        </>

       ):(
        <><td>{alunno.id}</td>
        <td>{alunno.nome}</td>
        <td>{alunno.cognome}</td>
        </>

       )}
       <td>
        {!conferma?(
        
            <button onClick={()=>{
                 props.onModifica();
                 props.IdAlunno(alunno.id);
            }}>modifica2</button>
        ):(
            <>
            <button onClick={SalvaModifica}>Conferma</button>
            <button onClick={FormModifica}>Annulla</button></>
        )}
       </td>
       </tr>
        </>
    );
}