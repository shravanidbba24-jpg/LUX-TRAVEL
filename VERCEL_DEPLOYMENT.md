# 🚀 Deploying Infinity Travels on Vercel

### Fixes Applied:
1. **Fixed `Command "npm install" exited with 1` (ERESOLVE conflict)**:
   - Root cause: An explicit `"esbuild": "^0.25.0"` version in `devDependencies` conflicted with `vite@8.3.x`'s peer dependency requirement during Vercel's strict `npm install`.
   - Resolution:
     - Removed the conflicting explicit `esbuild` lock (Vite automatically manages its internal esbuild).
     - Added `.npmrc` configured with `legacy-peer-deps=true` and `auto-install-peers=true`.
     - Added `"installCommand": "npm install --legacy-peer-deps"` in `vercel.json`.

2. **Fixed `No Flask entrypoint found`**:
   - Added `app.py` root Flask WSGI application with REST endpoints (`/api/packages`, `/api/quote`, `/api/book`, `/api/health`) and static frontend serving.
   - Added `api/index.py` for Vercel Serverless Functions.
   - Added `pyproject.toml` with `[tool.vercel] entrypoint = "app.py"`.
   - Added `requirements.txt` (`flask>=3.0.0`, `werkzeug>=3.0.0`, `requests>=2.31.0`).

3. **`vercel.json` Configuration**:
   - Preset: `"framework": "vite"`
   - Install Command: `"npm install --legacy-peer-deps"`
   - Build Command: `"npm run build"`
   - Output Directory: `"dist"`
   - Rewrites: `/api/*` routed to Python serverless function, SPA routes to `/index.html`.

---

### How to Deploy (Step-by-Step):

#### Option A: Deploy from GitHub / Git Repository (Vercel Dashboard)
1. Go to [vercel.com](https://vercel.com) and click **"Add New..." > "Project"**.
2. Select your repository.
3. In the project setup screen:
   - **Framework Preset**: **Vite**
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install --legacy-peer-deps`
4. Click **Deploy**.

#### Option B: Deploy via Vercel CLI
```bash
npm install -g vercel
vercel
```
Select default settings and deploy!
