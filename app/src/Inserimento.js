import {useState} from 'react';

export default function Inserimento(props){
    
    
    function impostaNome(eventoNome){
      setNome(eventoNome.target.value);
    }

const [aggiungi,setAggiungi]=useState(false);
    const [nome,setNome]=useState("");
    const[ cognome,setCognome]=useState("");
    const carica=props.caricaAlunni;


    async function Salva(){
        await fetch(`http://localhost:8080/alunni`,{
            method:'POST',
            headers:{'Content-Type':"application/json"},
            body:JSON.stringify({nome: nome,cognome:cognome})});
            carica();
    }
   
    return(
       <>
       
       {!aggiungi ?

        (<button onClick={()=>{setAggiungi(true)}}>inserisci alunno</button>
        ):(
           <>
           <label for="nome" >inserisci nome:</label>
           <input id="nome" name="nome" onChange={impostaNome}/>
           <br/>
           <label for="cognome" >inserisci cognome:</label>
           <input id="cognome" name="cognome" onChange={(e)=>{setCognome(e.target.value)}}/>
           <br/>
           <button onClick={Salva}>aggiungi</button>
           <button onClick={()=>{setAggiungi(false)}}>annulla</button>
           </>
        )}
        </>
    );
}