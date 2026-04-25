import React, { useState, useEffect } from 'react';
import { Users, Plus, Trash2 } from 'lucide-react';

export default function SavedVault() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('offline-contacts');
    if (saved) {
      setContacts(JSON.parse(saved));
    }
  }, []);

  const saveContact = () => {
    if (!name || !phone) return;
    const newContacts = [...contacts, { id: Date.now(), name, phone }];
    setContacts(newContacts);
    localStorage.setItem('offline-contacts', JSON.stringify(newContacts));
    setName('');
    setPhone('');
  };

  const deleteContact = (id) => {
    const newContacts = contacts.filter(c => c.id !== id);
    setContacts(newContacts);
    localStorage.setItem('offline-contacts', JSON.stringify(newContacts));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Users color="var(--accent)" />
          Saved Contacts
        </h2>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{contacts.length} saved</span>
      </div>

      <div style={{ display: 'flex', gap: '8px', padding: '16px', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          <input 
            type="text" 
            placeholder="Name (e.g. Raju Groceries)" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: '10px 12px', fontSize: '0.875rem' }}
          />
          <input 
            type="tel" 
            placeholder="Mobile Number" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ padding: '10px 12px', fontSize: '0.875rem' }}
          />
        </div>
        <button 
          onClick={saveContact}
          style={{ width: '48px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent)', border: '1px solid var(--accent-glow)' }}
        >
          <Plus size={24} />
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {contacts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
            No contacts saved. Add them here while on WiFi so you have their numbers offline!
          </div>
        ) : (
          contacts.map((contact) => (
            <div key={contact.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)' }}>
              <div>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>{contact.name}</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{contact.phone}</div>
              </div>
              <button 
                onClick={() => deleteContact(contact.id)}
                style={{ background: 'transparent', padding: '8px', color: 'var(--text-muted)' }}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
