const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.set('trust proxy', 1);

// Basic rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 300 });
app.use(limiter);

const dataDir = path.join(__dirname, 'data');
const productsPath = path.join(dataDir, 'products.json');
const ordersPath = path.join(dataDir, 'orders.json');

function readJson(filePath, fallback) {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    return fallback;
  }
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// In-memory OTP store
const otpStore = new Map(); // key: phone, value: { code, expiresAt, attempts }
const OTP_TTL_MS = 5 * 60 * 1000;
const MAX_OTP_ATTEMPTS = 5;

// TWILIO setup
const twilioSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuth = process.env.TWILIO_AUTH_TOKEN;
const twilioFrom = process.env.TWILIO_PHONE_NUMBER;
let twilioClient = null;
if (twilioSid && twilioAuth) {
  try {
    twilioClient = require('twilio')(twilioSid, twilioAuth);
  } catch (e) {
    console.warn('Failed to init Twilio client:', e.message);
  }
}

const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-prod';

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/products', (req, res) => {
  const products = readJson(productsPath, []);
  res.json(products);
});

app.get('/api/orders', (req, res) => {
  const orders = readJson(ordersPath, []);
  res.json(orders);
});

app.post('/api/orders', (req, res) => {
  const orders = readJson(ordersPath, []);
  const newOrder = {
    id: `ORD-${Date.now()}`,
    ...req.body,
    date: new Date().toISOString()
  };
  const updated = [...orders, newOrder];
  try {
    writeJson(ordersPath, updated);
    res.status(201).json(newOrder);
  } catch (e) {
    res.status(500).json({ error: 'Failed to save order' });
  }
});

// Auth stubs
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  res.json({ token: 'demo-token', user: { id: 1, name: 'Demo User', email } });
});

app.post('/api/auth/logout', (req, res) => {
  res.json({ success: true });
});

// Request OTP
app.post('/api/otp/request', async (req, res) => {
  try {
    const { phone } = req.body || {};
    if (!phone || !/^[1-9][0-9]{9,14}$/.test(phone)) {
      return res.status(400).json({ error: 'Valid phone number required (E.164 without + or 10-15 digits)' });
    }
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + OTP_TTL_MS;
    otpStore.set(phone, { code, expiresAt, attempts: 0 });

    if (twilioClient && twilioFrom) {
      await twilioClient.messages.create({
        to: phone.startsWith('+') ? phone : `+${phone}`,
        from: twilioFrom,
        body: `Your NXew verification code is ${code}. It expires in 5 minutes.`
      });
    } else {
      console.log(`[DEV ONLY] OTP for ${phone}: ${code}`);
    }
    res.json({ success: true });
  } catch (e) {
    console.error('OTP request failed', e);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

// Verify OTP
app.post('/api/otp/verify', (req, res) => {
  try {
    const { phone, code } = req.body || {};
    if (!phone || !code) {
      return res.status(400).json({ error: 'Phone and code are required' });
    }
    const entry = otpStore.get(phone);
    if (!entry) return res.status(400).json({ error: 'No OTP requested or expired' });
    if (entry.attempts >= MAX_OTP_ATTEMPTS) {
      otpStore.delete(phone);
      return res.status(429).json({ error: 'Too many attempts' });
    }
    entry.attempts += 1;
    if (Date.now() > entry.expiresAt) {
      otpStore.delete(phone);
      return res.status(400).json({ error: 'OTP expired' });
    }
    if (entry.code !== code) {
      return res.status(400).json({ error: 'Invalid code' });
    }
    otpStore.delete(phone);
    const token = jwt.sign({ phone }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, token, user: { id: `user_${phone}`, name: 'User', phone } });
  } catch (e) {
    console.error('OTP verify failed', e);
    res.status(500).json({ error: 'Verification failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});


