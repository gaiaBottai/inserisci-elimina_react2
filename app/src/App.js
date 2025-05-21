import logo from './logo.svg';
import './App.css';
/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/
import {useState} from 'react';
import AlunniRow from './Alunnirow';
import Inserimento from './Inserimento';
import Modifica from './Modifica';
//vogliio al clck del pulsante compare la tabella
//si vogliono fare le operazioni CRUDD
//si fa la delete aggiungendo un bottone cancella che chiede la conferma della cancellazione e poi cancella
function App(){

  const [alunni,setAlunni]=useState([]); //inizializzo un array vuoto una variabile
  const [loading,setLoading]=useState(false);

  const [mostraForm, setMostraForm] = useState(false);
  const [mostraModifica, setMostraModifica] = useState(false);


  async function caricaAlunni(){

    /*fetch("http://localhost:8080/alunni",{method:"GET"})
    .then(function(response){
      console.log(response);
      response.json().then(function(data){
        console.log(data);
      });

    }) questo è uguale a fare :
  }*/
  setLoading(true);//sta caricadno
  const response= await fetch("http://localhost:8080/alunni",{method:"GET"}); //mi collego all'ip di mangione 
  const data=await response.json(); //carica la risposta e subito dopo va a settare gli alunni
//in questo modo faccio il get degli alunni
  

setAlunni(data);//dò alla variabile alunni il valore di data che contiene la risposta del json
setLoading(false); //finisce di caricare e stampa la tabella
function impostaId(id){
  setId(id);
}
/*function toggleModifica() {
  setMostraModifica(!mostraModifica);
}*/
async function salvaModifiche(alunno) {
  const response = await fetch(`http://localhost:8080/alunni/${id}`, {method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({nome: nome, cognome: cognome})});
  console.log(response);
  caricaAlunni();
}
  return (
    <div className="App">
      {loading &&
      <div> carimaneto in corso....</div>
      }
      {!loading &&
      <>
      {alunni.length===0 ? ( //se la lunghezza di alunni è uguale a zero compare il numero
         <button onClick={caricaAlunni}>carica alunni</button>
      ):(
      //se non è uguale a zero faccio comparire una tabella
      /*<table border="1">
        {alunni.map(function(a){//itero i componenti dentro l'array e li stampo
            return(
              <tr> 
                <td>{a.id}</td>
                <td>{a.nome}</td>
                <td>{a.cognome}</td>
              </tr>
            )
          })
        }*/
        <>
        <table border="1">
        {alunni.map(a=> //è la stessa cosa di prima ma scritta in un'altra forma
             <AlunniRow alunno={a} caricaAlunni={caricaAlunni} refId={impostaId}/>//passo una variabile alle funzione con nome alunno per ogni alunno
              //sto passando anche un riferimento alla funzione caricaALunni
          
                          
             
            )}
          
          </table>
          mostraModifica 
          <label htmlFor='nome'>nome</label>
        <input name='nome' id='nome' onChange={(event) => setNome(event.target.value)}/><br/>
        <label htmlFor='cognome'>cognome</label>
        <input name='cognome' id='cognome' onChange={(event) => setCognome(event.target.value)}/><br/>
        <button onClick={salvaModifiche}>Conferma</button>
        <button onClick={toggleModifica}>annulla</button>

           
          <Inserimento caricaAlunni={caricaAlunni}/>
     </>
      )}
      
    </>
     }</div>
  );
}

export default App;