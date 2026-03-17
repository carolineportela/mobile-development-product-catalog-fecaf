# ModaCatalog Mobile - Catálogo Interativo E-commerce

Este é o projeto prático da disciplina de **Mobile Development**. O aplicativo é um catálogo interativo de moda, desenvolvido com foco em performance, responsividade e consumo de APIs REST.

##  Tecnologias Utilizadas

- **React 19** (Arquitetura Mobile-First)
- **Redux Toolkit** (Gerenciamento de Estado Global)
- **Axios** (Consumo de API REST)
- **React Router** (Navegação entre telas)
- **Tailwind CSS** (Estilização e Design System)
- **Lucide React** (Pacote de Ícones)
- **DummyJSON API** (Fonte de dados real)

##  Funcionalidades

1. **Autenticação (Login)**:
   - Validação de campos em tempo real.
   - Armazenamento de sessão via Redux.
2. **Catálogo de Produtos**:
   - Listagem dinâmica por categorias (Masculino/Feminino).
   - Filtro de busca por nome ou categoria.
   - Estados de Loading e Error handling.
3. **Detalhes do Produto**:
   - Visualização completa de informações.
   - Cálculo automático de desconto.
   - Galeria de imagens (simulada).
4. **Logout**:
   - Limpeza de estado e retorno seguro à tela de login.

##  Como Executar o Projeto

1. **Clone o repositório**:
   ```bash
   git clone <url-do-seu-repositorio>
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

4. **Acesse no navegador**:
   O projeto estará disponível em `http://localhost:3000` (ou na porta indicada no terminal).

##  Estrutura do Projeto

- `src/components`: Componentes reutilizáveis (ex: MobileContainer).
- `src/screens`: Telas principais da aplicação (Login, Catálogo, Detalhes).
- `src/services`: Configuração do Axios e chamadas de API.
- `src/store`: Configuração do Redux (Slices de Auth e Products).
- `src/types.ts`: Definições de interfaces TypeScript.

---
*Desenvolvido como parte do portfólio de Mobile Development.*
# mobile-development-product-catalog-fecaf
