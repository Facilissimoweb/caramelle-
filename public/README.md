# Cartelle Asset Pubblici

Questa directory contiene gli asset statici del sito web di **Facilissimo Web** che vengono distribuiti direttamente senza compilazione.

## Organizzazione delle Cartelle:

1. `/public/images` - Per tutte le immagini del sito (loghi, screenshot, icone, sfondi).
2. `/public/video` - Per file video (es. video di sfondo, demo dei progetti, presentazioni).
3. `/public/fonts` - Per font personalizzati utilizzati nel design del sito.

---

### Come vengono serviti i file:
In fase di sviluppo e produzione (build), Vite copia automaticamente tutto il contenuto di questa cartella nella root di distribuzione. 
Puoi fare riferimento a questi file direttamente nel tuo codice tramite percorsi assoluti, ad esempio:

- Immagini: `<img src="/images/logo.png" alt="..." />`
- Video: `<video src="/video/hero-bg.mp4" ...>`
- Font: `@font-face { src: url('/fonts/custom-font.woff2') format('woff2'); }`
