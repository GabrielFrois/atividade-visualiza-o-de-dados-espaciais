import { useCidadeContext } from '../context/CidadeContext';
import styled from 'styled-components';

const InfoBox = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 220px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  z-index: 1000;
  font-size: 14px;
`;

export default function IrradiacaoInfo() {
  const { irradiacao } = useCidadeContext();

  if (!irradiacao) return null;

  return (
    <InfoBox>
      <h3>Irradiação</h3>
      <p><strong>Anual:</strong> {irradiacao.anual}</p>
      <ul style={{ paddingLeft: 0, listStyleType: 'none' }}>
        {['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'].map((mes) => (
          <li key={mes}>
            <strong>{mes.toUpperCase()}:</strong> {irradiacao[mes]}
          </li>
        ))}
      </ul>
    </InfoBox>
  );
}
