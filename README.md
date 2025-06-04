# Atividade 7 - Visualização de Dados Espaciais

## Visão Geral
Este projeto implementa uma aplicação composta por um servidor Node.js com Express e um frontend em React com TypeScript e Vite. A aplicação permite consultar e visualizar dados de irradiação solar no Brasil, com base no Atlas Brasileiro de Energia Solar de 2017, desenvolvido pelo LABREN/INPE.  
O frontend exibe as cidades disponíveis, permite selecionar uma cidade, exibe suas informações e plota o polígono correspondente em um mapa interativo com Leaflet.  

## Estrutura do Repositório
```
atividade/
├── frontend/
│   ├── src/
│   │   ├── api/              
│   │   ├── components/       
│   │   ├── context/          
│   │   ├── styles/           
│   │   ├── App.tsx           
│   │   ├── main.tsx          
│   │   └── index.css         
│   ├── package.json          
│   └── vite.config.ts        
├── server/
│   ├── data/
│   │   ├── cidade.geojson    # Arquivo de cidades em formato GeoJSON
│   │   ├── global_horizontal_means.geojson  # Irradiação solar
│   │   └── comandos.sql      # Scripts SQL para criação de tabelas
│   ├── src/
│   │   ├── controllers/      # Lógica de acesso ao banco e carregamento de dados
│   │   │   ├── db.ts
│   │   │   └── load.ts
│   │   ├── routes/           # Rotas da API
│   │   │   └── cidade.ts
│   │   └── index.ts          # Entrada principal do backend
│   ├── package.json          # Dependências e scripts do backend
│   ├── package-lock.json
│   ├── .env                  # Variáveis de ambiente com configuração do banco
│   └── tsconfig.json         # Configuração do TypeScript
└── README.md
```
- `frontend/`
  - `src/`
    - `api/`: Serviços de API para comunicação com o backend.
      -`cidadeService.ts`
    - `components/`: Componentes de interface.
      - `CidadeList.tsx`
      - `IrradiacaoInfo.tsx`
      - `Mapa.tsx`
    - `context/`: Gerenciamento de estado global com React Context.
      - `CidadeContext.tsx`
    - `styles/`: Estilização global com Styled Components.
      - `GlobalStyles.ts`
    - `App.css`
    - `App.tsx`: Componente principal.
    - `index.css` Estilos globais.
    - `main.tsx`: Entrada principal do React.
  - `eslint.config.js`
  - `index.html`
  - `package-lock.json`
  - `package.json`: Dependências e scripts do frontend.
  - `tsconfig.app.json`
  - `tsconfig.json`
  - `tsconfig.node.json`
  - `vite.config.ts`: Configurações do Vite.
- `server/`
  - `data/`: Contém os arquivos de dados espaciais fornecidos pelo LABREN/INPE.
  - `src/`: Contém o código-fonte do servidor.
    - `controllers/`: Lida com a lógica de acesso e carregamento dos dados.
    - `routes/`: Define as rotas da API.
    - `index.ts`: Ponto de entrada da aplicação.
  - `README.md`: Documentação do projeto.
  - `.env`: Arquivo de variáveis de ambiente.
  - `package.json`: Gerencia as dependências e scripts do projeto.
  - `package-lock.json`: Registro detalhado das versões instaladas das dependências.
  - `tsconfig.json`: Configurações do compilador TypeScript.

## Tecnologias Utilizadas
### Backend:
- Node.js
- Express
- PostgreSQL com PostGIS
- TypeScript
### Frontend:
- React
- TypeScript
- Vite
- Styled Components
- Leaflet
- React Context API
### Dados:
- GeoJSON do Atlas Brasileiro de Energia Solar (LABREN/INPE)

## Instalação e Execução
1. Clonar o repositório
```bash
git clone https://github.com/GabrielFrois/atividade-visualizacao-de-dados-espaciais.git atividade
```

2. Configurar o banco de dados:
- Crie um banco de dados PostgreSQL
- Instale a extensão PostGIS
- No pgAdmin ou outro client SQL, copie os comandos do arquivo `data/comandos.sql` e cole para executar os comando para criar as tabelas no banco de dados
- Edite o arquivo .env dentro de server/ com os dados de sua conexão
- Carregue os dados no banco com:
```bash
cd server
npm install
npm run load
```

3. Executar o backend:
```bash
npm run dev
```
O backend estará disponível em: `http://localhost:3001`  

4. Executar o frontend:
```bash
cd frontend
npm install
npm run dev
```
O frontend estará disponível em: `http://localhost:5173`  

## Rotas Disponíveis
1. `/cidade`
Retorna um array com todas as cidades do país.

**Exemplo de resposta**:
```json
[
  {
    "id": 5589,
    "nome": "Abadia de Goiás/GO",
    "lon": -49.43842,
    "lat": -16.75752
  },
  {
    "id": 5590,
    "nome": "Abadia dos Dourados/MG",
    "lon": -47.40341,
    "lat": -18.48653
  }
]
```
2. `/cidade/:id`
Retorna os dados de irradiação solar para a cidade com o ID especificado.

**Parâmetros**:
- `id`: ID da cidade.

**Exemplo de requisição**:
```
/cidade/5589
```
**Exemplo de Resposta**:
```json
{
  "id": 5589,
  "anual": 4869,
  "jan": 5764,
  "fev": 5800,
  "mar": 5201,
  "abr": 4534,
  "mai": 3609,
  "jun": 3252,
  "jul": 3493,
  "ago": 4508,
  "set": 4668,
  "out": 5305,
  "nov": 5957,
  "dez": 6337,
  "geom": "POLYGON((-49.999045178706474 -23.650461434175696,-49.999045178706474 -23.550461434175695,-49.89904517870647 -23.550461434175695,-49.89904517870647 -23.650461434175696,-49.999045178706474 -23.650461434175696))"
}
```

### Base de dados
O LABREN – Laboratório de Modelagem e Estudos de Recursos Renováveis de Energia do INPE gerou o Altas Brasileiro de Energia Solar de 2017 (http://labren.ccst.inpe.br/atlas_2017.html). A base é composta de 72272 registros contendo as médias anuais e mensais do total diário da irradiação Global Horizontal, Difusa, Direta Normal, no Plano Inclinado e PAR em Wh/m2.dia.  
Resolução espacial de 0,1° x 0,1° (aproximadamente 10 km x 10 km).  
Longitude e latitude definem o centroide das entidades, ou células, de 0,1° x 0,1°.  
Os dados estão na pasta `server/data`.  

