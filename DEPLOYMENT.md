# 🚀 Deployment Guide — Yedeshwari Travels Pune

This project is completely production-ready and configured to run on **any platform** (Render, Railway, VPS, Hostinger/cPanel, or Docker).

---

## ⚡ Option 1: Render.com (Easiest & Free — Recommended)

Render offers free hosting with zero maintenance and automatic SSL.

### Steps:
1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Production release for Yedeshwari Travels"
   git remote add origin https://github.com/<your-username>/yedeshwari-travels.git
   git branch -M main
   git push -u origin main
   ```
2. **Open [Render.com](https://render.com/)** and sign in.
3. Click **New +** ➔ **Web Service**.
4. Connect your GitHub repository.
5. Configure the following fields:
   - **Name**: `yedeshwari-travels`
   - **Region**: `Singapore` (closest to India for low latency)
   - **Branch**: `main`
   - **Root Directory**: *(leave blank)*
   - **Environment**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Plan**: `Free`
6. Add **Environment Variables** (under *Advanced*):
   - `NODE_ENV` = `production`
   - `PORT` = `5000`
   - `JWT_SECRET` = *(enter any random secret string, e.g. `yedeshwari_secure_jwt_pune_2026`)*
7. Click **Create Web Service**.
8. Render will build both the frontend and start the backend. Your live website URL will be `https://yedeshwari-travels.onrender.com`.

---

## 🚂 Option 2: Railway.app

1. Go to [Railway.app](https://railway.app/).
2. Click **Start a New Project** ➔ **Deploy from GitHub repo**.
3. Select this repository.
4. Railway will automatically detect the `package.json` build and start scripts.
5. In **Settings** ➔ **Networking**, click **Generate Domain**.
6. That's it! Your site is live.

---

## 🌐 Option 3: Hostinger / cPanel / Shared Hosting (Node.js App)

If you have a domain like `yedeshwaritravels.com` with Hostinger or cPanel:

1. **Build locally first**:
   ```bash
   npm run build
   ```
   *(This creates `client/dist`)*.
2. In your cPanel / Hostinger dashboard, go to **Setup Node.js App**.
3. Click **Create Application**:
   - **Node.js version**: `20.x` or `18.x`
   - **Application mode**: `Production`
   - **Application root**: `public_html` (or your subdomain folder)
   - **Application startup file**: `server/src/index.js`
4. Upload all project files via FTP / File Manager (make sure to include `client/dist`, `server/`, `package.json`).
5. In the Node.js App manager, click **Run NPM Install**.
6. Click **Restart**.

---

## 🐧 Option 4: Linux VPS (Ubuntu / Debian / AWS EC2 / DigitalOcean)

If you have an Ubuntu VPS:

1. **Connect via SSH**:
   ```bash
   ssh root@your_vps_ip
   ```
2. **Install Node.js & PM2**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs nginx git
   sudo npm install -g pm2
   ```
3. **Clone & Build the project**:
   ```bash
   git clone https://github.com/<your-username>/yedeshwari-travels.git
   cd yedeshwari-travels
   npm run build
   ```
4. **Start the app with PM2 (Auto-restart on reboot)**:
   ```bash
   pm2 start server/src/index.js --name "yedeshwari"
   pm2 startup
   pm2 save
   ```
5. **Setup Nginx reverse proxy**:
   Create `/etc/nginx/sites-available/yedeshwari`:
   ```nginx
   server {
       listen 80;
       server_name yedeshwaritravels.com www.yedeshwaritravels.com;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
   Enable and restart Nginx:
   ```bash
   sudo ln -s /etc/nginx/sites-available/yedeshwari /etc/nginx/sites-enabled/
   sudo systemctl restart nginx
   ```
6. **Free SSL Certificate (HTTPS)**:
   ```bash
   sudo apt install certbot python3-certbot-nginx -y
   sudo certbot --nginx -d yedeshwaritravels.com -d www.yedeshwaritravels.com
   ```

---

## 🐳 Option 5: Docker

Run the entire application in one Docker container on any cloud provider:

```bash
# Build the Docker image
docker build -t yedeshwari-travels .

# Run the container
docker run -d -p 5000:5000 --name yedeshwari-app yedeshwari-travels
```
Visit `http://localhost:5000`.

---

## 🔑 Admin Credentials on Deployed Site
- **Admin URL**: `https://<your-domain>/admin`
- **Username**: `admin`
- **Password**: `Yedeshwari@9767`
*(You can change this password anytime in the Admin Dashboard Settings tab)*.
