import { useState, useEffect } from 'react';

import styles from './App.modules.css'
import ReposList from './components/ReposList'
import Perfil from './components/Perfil'

function App() {
  const [firstRender, setFirstRender] = useState(true);
  const [inputNomeUsuario, setInputNomeUsuario] = useState("");
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [repoUsuario, setRepoUsuario] = useState([]);
  const [requisicaoOk, setRequisicaoOk] = useState(true);
  const [mensagemErro, setMensagemErro] = useState("");

  
  useEffect(
    () => {
      if (firstRender == false) {
        fetch (`https://api.github.com/users/${nomeUsuario}/repos`)
        .then(function(res){
            if (res.ok) {
                setRequisicaoOk(true);
                return res.json();
            }
            else {
                setRequisicaoOk(false);
                setMensagemErro('O usuário inserido não foi encontrado!')
                return ([]); //retorno com erro de undefined
            }
        })
        .then(resJson => {
            setRepoUsuario(resJson);
        })
        .catch(error => {
            setRequisicaoOk(false); //retorno com erro de rede (não foi possível sequer receber uma resposta)
            setMensagemErro('Houve um erro na requisição do usuário!')
        })
      }
      else {
        setFirstRender(false);
      }
    }, [nomeUsuario]
  )

  return (
    <div className={styles.geral}>
      <input className={styles.input} type="text" onBlur={(e) => setInputNomeUsuario(e.target.value)}/>
      <button className={styles.botao} type="button" onClick={() => setNomeUsuario(inputNomeUsuario)}>Acessar Dados Github</button>
      {nomeUsuario.length > 4 && requisicaoOk == true && (
        <>
          <Perfil nomeUsuario={nomeUsuario}/>
          <ReposList repos={repoUsuario}/>
        </>
      )}
      {nomeUsuario.length > 4 && requisicaoOk == false && (
        <>
          <h3 className={styles.error}>{mensagemErro}</h3>
        </>
      )}
    </div>
  )
}

export default App