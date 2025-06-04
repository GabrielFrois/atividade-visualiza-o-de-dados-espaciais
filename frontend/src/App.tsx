import styled from 'styled-components';
import CidadeList from './components/CidadeList';
import IrradiacaoInfo from './components/IrradiacaoInfo';
import Mapa from './components/Mapa';
import { CidadeProvider } from './context/CidadeContext';
import { GlobalStyle } from './styles/GlobalStyle';

const Container = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const Sidebar = styled.div`
  width: 250px;
  background: #f9f9f9;
  overflow-y: auto;
  border-right: 1px solid #ddd;
`;

const Main = styled.main`
  flex: 1;
  position: relative;
`;

function App() {
  return (
    <CidadeProvider>
      <GlobalStyle />
      <Container>
        <Sidebar>
          <CidadeList />
        </Sidebar>
        <Main>
          <Mapa />
          <IrradiacaoInfo />
        </Main>
      </Container>
    </CidadeProvider>
  );
}

export default App;
