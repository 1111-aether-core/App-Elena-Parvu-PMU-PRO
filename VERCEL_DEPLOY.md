# Deploy su Vercel (Alternativa a GitHub Pages)

## Problema Risolto
La cache aggressiva di Fastly (CDN di GitHub Pages) stava servendo una versione stale del sito con `aistudiocdn.com`. Migriamo a **Vercel** che non ha questi problemi di cache.

## Istruzioni di Deploy

### Step 1: Collegare il Repository a Vercel
1. Accedi a https://vercel.com (crea account se non hai)
2. Clicca "Add New..." → "Project"
3. Seleziona "Import Git Repository"
4. Collega il tuo account GitHub: `1111-aether-core/App-Elena-Parvu-PMU-PRO`
5. Clicca "Import"

### Step 2: Configurare le Environment Variables
1. Nella pagina del progetto Vercel, vai a "Settings" → "Environment Variables"
2. Aggiungi una nuova variabile:
   - **Nome:** `VITE_API_KEY`
   - **Valore:** (la tua Google Generative AI key)
   - **Ambienti:** Production, Preview, Development
3. Clicca "Save"

### Step 3: Configurare il Custom Domain
1. Vai a "Settings" → "Domains"
2. Clicca "Add Domain"
3. Inserisci `shop.elenaparvu.it`
4. Vercel ti mostrerà i nameserver da configurare nel tuo DNS provider
5. Aggiorna il DNS: vai al tuo registrar (es: Namecheap, GoDaddy, ecc)
6. Cambia i nameserver oppure aggiungi i record CNAME indicati da Vercel

### Step 4: Deploy Automatico
Una volta collegato, Vercel deployer automaticamente ogni push a `main`.

## Vantaggi di Vercel
- ✅ Cache intelligente (non problemi tipo Fastly)
- ✅ Build automatico su push
- ✅ HTTPS/SSL automatico
- ✅ Analytics e monitoring
- ✅ Ottimizzazione immagini automatica
- ✅ Supporto pieno per Vite + React

## Verifica Deployment
Una volta deployato, il sito sarà visibile su:
- `https://app-elena-parvu-pmu-pro.vercel.app` (default)
- `https://shop.elenaparvu.it` (custom domain, dopo DNS)

## Se DNS non si propaga
Vercel fornisce nameserver alternative. Se il registrar non li accetta, puoi usare record CNAME.

---

**Status:** Pronto per manual deploy via Vercel Dashboard oppure automatico via GitHub integration.
