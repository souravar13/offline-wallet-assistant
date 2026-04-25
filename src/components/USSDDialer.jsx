import React, { useState } from 'react';
import { Phone, IndianRupee, Copy, PhoneCall } from 'lucide-react';

export default function USSDDialer() {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopyDetails = () => {
    const details = `Number: ${phone}\nAmount: ${amount}`;
    navigator.clipboard.writeText(details);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="dialer-container" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--bg-input)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', border: '1px solid var(--accent)' }}>
          <IndianRupee size={32} color="var(--accent)" />
        </div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Send Offline Payment</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.4' }}>
          This uses the free *99# USSD telecom service. It works entirely without internet.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ position: 'relative' }}>
          <Phone size={20} color="var(--text-muted)" style={{ position: 'absolute', left: '16px', top: '16px' }} />
          <input 
            type="tel" 
            placeholder="Recipient Mobile Number" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ width: '100%', paddingLeft: '48px' }}
          />
        </div>

        <div style={{ position: 'relative' }}>
          <IndianRupee size={20} color="var(--text-muted)" style={{ position: 'absolute', left: '16px', top: '16px' }} />
          <input 
            type="number" 
            placeholder="Amount (₹)" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ width: '100%', paddingLeft: '48px', fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--accent)' }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
        <button 
          onClick={handleCopyDetails}
          style={{ flex: 1, padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'var(--bg-card)', border: '1px solid var(--glass-border)' }}
        >
          <Copy size={18} />
          {copied ? 'Copied!' : 'Copy Info'}
        </button>

        <a 
          href="tel:*99#"
          style={{ flex: 2, padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'linear-gradient(135deg, var(--accent), #059669)', color: '#000', borderRadius: '12px', textDecoration: 'none', fontWeight: '600' }}
        >
          <PhoneCall size={18} fill="#000" />
          Dial *99# Now
        </a>
      </div>

      <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '16px', borderRadius: '12px', marginTop: '10px' }}>
        <h4 style={{ color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--danger)' }}></span>
          How it works
        </h4>
        <ol style={{ marginLeft: '16px', color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <li>Tap "Copy Info" to save the number locally.</li>
          <li>Tap "Dial *99#" to open your phone app.</li>
          <li>Press Call. A black native menu will appear.</li>
          <li>Reply with '1' to Send Money.</li>
          <li>Paste the number & amount when asked.</li>
        </ol>
      </div>

    </div>
  );
}
