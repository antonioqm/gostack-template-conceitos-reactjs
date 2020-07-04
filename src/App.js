import React, {useState, useEffect} from "react";

import "./styles.css";

import api from "services/api";

function App() {
  /**
   * 'repositories' é uma nova constante para armazenar os dados
   * 'setRepositories' é uma fução que é responsável por inserir os dados na variável 'repositories'
   * 'useState' é uma função que serve para, via destruct, criar uma const que contém os dados e uma função que os seta, 
   */

  const [repositories, setRepositories] = useState([]); 

  useEffect(() => {
    api.get('repositories').then(response => {
      let { data } = response; 
      setRepositories(data);
    })
  },[])
  

  async function handleAddRepository() {
    const response = await api.post('repositories', {
        title: `Real DIgital 3 ${Date.now()}`,
        url: "http://real.qm",
        techs: [ "node.js", "js puro", "css", "vue js"]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    api.delete('repositories/'+id,).then(response => {
      console.log(response)
      setRepositories(repositories.filter( repository => repository.id !== id));
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>  <li key={repository.id}>{repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
