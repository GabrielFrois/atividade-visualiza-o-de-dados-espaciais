import styled from 'styled-components';
import { useCidadeContext } from '../context/CidadeContext';
import { getCidades, getIrradiacao } from '../api/cidadeService';
import { useEffect } from 'react';

const Sidebar = styled.aside`
  position: absolute;
  top: 0;
  left: 0;
  width: 250px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 0;  /* Se quiser tirar o arredondamento pra colar */
  padding: 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  z-index: 1000;
  overflow-y: auto;
  height: 100vh; /* ocupar altura total */

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 4px;
    cursor: pointer;
    padding: 8px 12px;
    transition: background 0.2s;
  }

  li:hover {
    background: #f0f0f0;
  }
`;


export default function CidadeList() {
  const { cidades, setCidades, setIrradiacao } = useCidadeContext();

  useEffect(() => {
    const carregarCidades = async () => {
      try {
        const data = await getCidades();
        setCidades(data);
      } catch (error) {
        console.error('Erro ao carregar cidades:', error);
      }
    };
    carregarCidades();
  }, []);

  const handleClick = async (id: number) => {
    try {
      const dados = await getIrradiacao(id);
      setIrradiacao(dados);
    } catch (error) {
      console.error('Erro ao buscar irradiação:', error);
    }
  };

  return (
    <Sidebar>
      <h2>Cidades</h2>
      {cidades.length === 0 ? (
        <p>Carregando cidades...</p>
      ) : (
        <ul>
          {cidades.map((cidade) => (
            <li key={cidade.id} onClick={() => handleClick(cidade.id)}>
              {cidade.nome}
            </li>
          ))}
        </ul>
      )}
    </Sidebar>
  );
}
