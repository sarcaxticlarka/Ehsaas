# 🌐 Hosting Documentation: Ehsaas Backend (Node.js/Express/MongoDB)

To deploy your backend for production accessibility, we recommend using **Render** or **Railway** for the server, and **MongoDB Atlas** for the database. 

---

## Step 1: Database Hosting (MongoDB Atlas)
Since your local MongoDB (`mongodb://localhost:27017`) won't work on the cloud, you need a hosted database.

1.  Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2.  Create a **Shared Cluster** (FREE).
3.  Go to **Database Access** and create a user (e.g., `admin`).
4.  Go to **Network Access** and select **Allow Access from Anywhere** (0.0.0.0/0).
5.  Click **Connect** → **Connect your Application** and copy your **Connection String**.
    - *Example:* `mongodb+srv://admin:<password>@cluster0.abcde.mongodb.net/ehsaas?retryWrites=true&w=majority`

---

## Step 2: Server Hosting (Render - Recommended)
Render is an extremely easy, developer-friendly platform for hosting Node.js apps.

1.  Connect your GitHub account to [Render](https://render.com/).
2.  Click **New +** → **Web Service**.
3.  Select your **Ehsaas** repository.
4.  Configure the service:
    - **Name:** ehsaas-backend
    - **Environment:** Node
    - **Root Directory:** `server`
    - **Build Command:** `npm install`
    - **Start Command:** `node index.js` (or `npm start`)
5.  **Environment Variables:** Add these in Render's "Environment" tab:
    - `PORT`: `5001`
    - `MONGODB_URI`: *[Your MongoDB Atlas Connection String from Step 1]*
    - `JWT_SECRET`: *[A long, random secret key like 'aBcd1234efgh5678']*
6.  Click **Create Web Service**.

---

## Step 3: Connect the Mobile App
Once Render gives you your production URL (e.g., `https://ehsaas-backend.onrender.com`), you need to tell your mobile app to point there.

1.  Open `/mobile/api/client.js`.
2.  Update the `BASE_URL`:
    ```javascript
    const BASE_URL = __DEV__ 
      ? (Platform.OS === 'android' ? 'http://10.0.2.2:5001/api' : 'http://localhost:5001/api')
      : 'https://ehsaas-backend.onrender.com/api'; 
    ```

---

## Step 4: Final Tips
- **Cold Starts:** Free Render services "spin down" after 15 minutes of inactivity. The first request might take 30-45 seconds to load.
- **Node Version:** Render usually uses the latest stable Node version. Ensure your `server/package.json` specifies `"engines": { "node": ">=18" }` for consistency.
