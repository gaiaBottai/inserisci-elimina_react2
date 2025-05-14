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
//vogliio al clck del pulsante compare la tabella
//si vogliono fare le operazioni CRUDD
//si fa la delete aggiungendo un bottone cancella che chiede la conferma della cancellazione e poi cancella
function App(){

  const [alunni,setAlunni]=useState([]); //inizializzo un array vuoto una variabile
  const [loading,setLoading]=useState(false);


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
  const response= await fetch("http://10.22.9.28:8080/alunni",{method:"GET"}); //mi collego all'ip di mangione 
  const data=await response.json(); //carica la risposta e subito dopo va a settare gli alunni
//in questo modo faccio il get degli alunni
  

setAlunni(data);//dò alla variabile alunni il valore di data che contiene la risposta del json
setLoading(false); //finisce di caricare e stampa la tabella
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
        <table border="1">
        {alunni.map(a=> //è la stessa cosa di prima ma scritta in un'altra forma
             <AlunniRow alunno={a} caricaAlunni={caricaAlunni}/>//passo una variabile alle funzione con nome alunno per ogni alunno
                                   //sto passando anche un riferimento alla funzione caricaALunni

                                 
            )}
          
          </table>

     
      )}
      <Inserimento caricaAlunni={caricaAlunni}/>
    </>
     }</div>
  );
}

export default App;