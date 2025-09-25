import React, { useState } from 'react';

const Account = ({ user, onLogin, onLogout, showPopup }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',       // ✅ New
    address: ''      // ✅ New
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [otpMode, setOtpMode] = useState(false);
  const [otpRequested, setOtpRequested] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone) => {
    const re = /^[6-9]\d{9}$/; // Indian mobile format
    return re.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1200));

    try {
      if (!otpMode) {
        if (!validateEmail(formData.email)) {
          throw new Error('Please enter a valid email address.');
        }
        if (formData.password.length < 6) {
          throw new Error('Password must be at least 6 characters.');
        }
      }

      if (!isLogin) {
        if (formData.name.trim().length < 2) {
          throw new Error('Please enter your full name.');
        }
        if (!validatePhone(formData.phone)) {
          throw new Error('Please enter a valid 10-digit mobile number starting with 6-9.');
        }
        if (formData.address.trim().length < 5) {
          throw new Error('Please enter a valid address (min 5 characters).');
        }
      }

      // Simulate successful auth (email/password path)
      const userData = {
        name: isLogin ? 'User' : formData.name.trim(),
        email: formData.email.toLowerCase(),
        id: Math.random().toString(36).substr(2, 9),
        ...(isLogin ? {} : {
          phone: formData.phone,
          dob: formData.dob,
          address: formData.address.trim()
        })
      };

      if (rememberMe) {
        localStorage.setItem('nxew_user', JSON.stringify(userData));
      }

      if (!isLogin) {
        showPopup(`Account created successfully! Welcome, ${userData.name}!`, 'success');
      }
      onLogin(userData);
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.');
      if (showPopup) {
        showPopup(err.message || 'Authentication failed. Please try again.', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const requestOtp = async () => {
    try {
      setError('');
      setLoading(true);
      if (!validatePhone(formData.phone)) {
        throw new Error('Enter a valid 10-digit mobile number starting with 6-9.');
      }
      const res = await fetch('/api/otp/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone })
      });
      if (!res.ok) throw new Error('Failed to send OTP');
      setOtpRequested(true);
      showPopup && showPopup('OTP sent to your mobile number', 'info');
    } catch (e) {
      setError(e.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      setError('');
      setLoading(true);
      if (!validatePhone(formData.phone)) {
        throw new Error('Enter a valid 10-digit mobile number starting with 6-9.');
      }
      if (!otpCode || otpCode.length !== 6) {
        throw new Error('Enter the 6-digit OTP code');
      }
      const res = await fetch('/api/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone, code: otpCode })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'OTP verification failed');
      }
      if (rememberMe && data.token) {
        localStorage.setItem('nxew_token', data.token);
      }
      onLogin({ ...data.user, email: formData.email || '', address: formData.address || '' });
      showPopup && showPopup('Logged in successfully!', 'success');
    } catch (e) {
      setError(e.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('nxew_user');
    onLogout();
  };

  // If user is logged in
  if (user) {
    return (
      <div className="account-container logged-in">
        <div className="user-card">
          <div className="user-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <h2 className="account-title">Welcome back, {user.name} 👋</h2>
          <div className="user-details">
            <div className="user-detail">
              <strong>📧 Email:</strong> {user.email}
            </div>
            {user.phone && (
              <div className="user-detail">
                <strong>📱 Phone:</strong> {user.phone}
              </div>
            )}
            {user.address && (
              <div className="user-detail">
                <strong>🏠 Address:</strong> {user.address}
              </div>
            )}
            <div className="user-detail">
              <strong>🆔 User ID:</strong> {user.id || 'N/A'}
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            🔒 Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="account-container">
      <div className="auth-wrapper">
        <div className="auth-header">
          <h1 className="auth-title">{isLogin ? 'Welcome Back!' : 'Create Account'}</h1>
          <p className="auth-subtitle">
            {isLogin 
              ? 'Log in to access your orders and wishlist' 
              : 'Join NXew for exclusive deals and faster checkout'}
          </p>
        </div>

        {error && (
          <div className="alert alert-error">
            ❌ {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  autoComplete="name"
                />
              </div>

              {/* ✅ New Fields for Sign Up */}
              <div className="form-group">
                <label htmlFor="phone">Mobile Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  required
                  maxLength="10"
                  pattern="[6-9][0-9]{9}"
                  title="Enter 10-digit Indian mobile number"
                  autoComplete="tel"
                />
              </div>
               <div className="form-group">
                <label htmlFor="address">Full Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House No, Street, City, State, PIN"
                  required
                  rows="3"
                  minLength="5"
                  style={{ resize: 'vertical' }}
                ></textarea>
              </div>
            </>
          )}

          {!otpMode && (
            <>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  autoComplete={isLogin ? "username" : "email"}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  minLength="6"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                />
              </div>
            </>
          )}

          {otpMode && (
            <>
              <div className="form-group">
                <label htmlFor="phone">Mobile Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  required
                  maxLength="10"
                  pattern="[6-9][0-9]{9}"
                  title="Enter 10-digit Indian mobile number"
                  autoComplete="tel"
                />
              </div>
              <div className="form-group" style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
                <div style={{ flex: 1 }}>
                  <label htmlFor="otp">OTP Code</label>
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="Enter 6-digit code"
                    maxLength="6"
                    inputMode="numeric"
                    pattern="\\d{6}"
                  />
                </div>
                <button type="button" className="link-btn" onClick={requestOtp} disabled={loading}>
                  {otpRequested ? 'Resend OTP' : 'Send OTP'}
                </button>
              </div>
              <button type="button" className="submit-btn" onClick={verifyOtp} disabled={loading}>
                {loading ? 'Verifying...' : 'Verify & Login'}
              </button>
            </>
          )}

          {isLogin && (
            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <a href="#forgot" className="forgot-password" onClick={(e) => {
                e.preventDefault();
                if (showPopup) {
                  showPopup("Password reset link sent to your email!", 'info');
                } else {
                  alert("Password reset link sent to your email!");
                }
              }}>
                Forgot Password?
              </a>
            </div>
          )}

          {!otpMode && (
            <button 
              type="submit" 
              className="submit-btn" 
              disabled={loading}
            >
              {loading ? (
                <span className="loading">⏳ Processing...</span>
              ) : (
                isLogin ? 'Log In' : 'Create Account'
              )}
            </button>
          )}
        </form>

        <div className="form-switcher">
          <span>
            {isLogin 
              ? "Don't have an account?" 
              : "Already have an account?"}
          </span>
          <button 
            type="button" 
            className="link-btn" 
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setFormData({ name: '', email: '', password: '', phone: '', dob: '', address: '' });
            }}
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </div>

        <div className="form-switcher" style={{ marginTop: '8px' }}>
          <span>{otpMode ? 'Prefer password login?' : 'Prefer OTP login?'}</span>
          <button 
            type="button" 
            className="link-btn"
            onClick={() => { setOtpMode(!otpMode); setError(''); setOtpRequested(false); setOtpCode(''); }}
          >
            {otpMode ? 'Use Email/Password' : 'Use Mobile OTP'}
          </button>
        </div>

        <div className="auth-footer">
          <p>By continuing, you agree to our <a href="#terms">Terms</a> and <a href="#privacy">Privacy Policy</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default Account;