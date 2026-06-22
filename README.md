# Genesis Geochemical Laboratory

Genesis laboratory website with MongoDB Atlas-backed assay reports, printable PDF certificates, and QR-code verification.

## Report workflow

1. A laboratory administrator opens `/admin/reports` and enters the admin access key.
2. The administrator creates or edits a report and saves it to MongoDB Atlas.
3. **Print / Save PDF** creates the A4 customer certificate using the Genesis Word-template design.
4. The certificate QR code opens `/results/:id`.
5. The public results page reads that exact report from Atlas.

## MongoDB Atlas setup

1. Create an Atlas project and cluster.
2. Under **Database Access**, create a database user with read/write access to the `genesis_lab` database.
3. Under **Network Access**, allow the deployment to reach Atlas. Vercel functions do not have one fixed outbound IP on standard plans, so the common setup is `0.0.0.0/0` together with a strong database username/password.
4. Under **Connect > Drivers**, copy the Node.js connection string.
5. Copy `.env.example` to `.env` for local development and fill in:

```env
MONGODB_URI=mongodb+srv://...
MONGODB_DATABASE=genesis_lab
ADMIN_API_KEY=a-long-private-secret
```

Never commit `.env`.

## Vercel deployment

Add the same three values in **Vercel > Project Settings > Environment Variables**, then redeploy.

The Vite development server does not execute the `/api` serverless functions. For the complete local app, use the Vercel CLI:

```bash
npx vercel dev
```

## Commands

```bash
npm install
npm run lint
npm run build
```
