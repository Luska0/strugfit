# Strugfit Academia — site

Landing page estática (HTML, CSS e JavaScript puros, sem dependências) da Strugfit Academia, Passagem de Areia, Parnamirim - RN.

## Estrutura
- `index.html` — página
- `css/style.css` — estilos e variáveis de design (cores, tipografia, espaçamentos)
- `js/main.js` — dados (modalidades e horários), carrossel com arraste, rolagem com inércia e menu
- `images/` — logo, imagem do hero e fotos das modalidades
- `extras/` — vídeo do hero com partículas (não usado no momento)

## Rodar localmente
Abra `index.html` no navegador ou use `python3 -m http.server`.

## Editar conteúdo
- Horários e modalidades: arrays `M` e `D` em `js/main.js`.
- Planos: seção `#planos` em `index.html` (cards ainda "Em breve").
- WhatsApp: procure por `whatsa.me` em `index.html`.

## Publicar
Funciona em qualquer hospedagem estática (GitHub Pages, Vercel, Netlify).
