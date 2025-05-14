import {useState }from 'react';


export default function AlunniRow(props){ //prendo la variabile con props
    const a=props.alunno;//la variabile ch econtiene la props di alunno la dò alla variabile a, alunno è come l'ho chiamata di là
    const carica=props.caricaAlunni;//prendo l'altra props
    
    const [inconferma,setInConferma]=useState(false);
    async function cancellaAlunno(){
        await fetch(`http://10.22.9.28:8080/alunni/${a.id}`,{method:'DELETE'});
        carica();
    }
    return (
        <tr>
            <td>{a.id}</td>
            <td>{a.nome}</td>
            <td>{a.cognome}</td>
            <td>{!inconferma ?
                (<button onClick={()=>{setInConferma(true)}}>delete</button>
                ):(
           <>
           sei sicuro?
           <button onClick={cancellaAlunno}>si</button>
           <button onClick={()=>{setInConferma(false)}}>no</button>
           </>
                )}</td>


        </tr>
    )
}
