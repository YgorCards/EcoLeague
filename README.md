# EcoLeague — protótipo

Protótipo de reciclagem gamificada em React, Vite e Tailwind CSS v4. Os registros ficam no estado local e voltam aos dados demonstrativos ao recarregar.

## Executar

Com Node.js e npm instalados, abra esta pasta no terminal e rode:

```bash
npm install
npm run dev
```

## Organização

- `src/components/`: cabeçalho, navegação, formulário e peças reutilizáveis.
- `src/pages/`: início, ranking e perfil.
- `src/App.jsx`: navegação e estado compartilhado.
- `src/data.js`: dados fictícios e regras de pontuação.
- `src/index.css`: importação do Tailwind, tema e estilos globais essenciais.
- `vite.config.js`: plugins do Tailwind e React para o Vite.

Os estilos da interface são feitos com classes Tailwind diretamente nos `className` dos componentes.
