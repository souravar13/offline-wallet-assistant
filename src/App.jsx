import React, { useState } from 'react';
import { Wallet, Users, CheckSquare, WifiOff, BookOpen } from 'lucide-react';
import './index.css';

import USSDDialer from './components/USSDDialer';
import SavedVault from './components/SavedVault';
import PreDepartureChecklist from './components/PreDepartureChecklist';
import OfflineHub from './components/OfflineHub';

function App() {
  const [activeTab, setActiveTab] = useState('hub'); // default to new hub for testing

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-title">
          <Wallet size={24} />
          <span>WalletAssist</span>
        </div>
        <div className="offline-badge">
          <WifiOff size={12} />
          Works Offline
        </div>
      </header>

      <main className="main-content">
        {activeTab === 'dialer' && <USSDDialer />}
        {activeTab === 'vault' && <SavedVault />}
        {activeTab === 'hub' && <OfflineHub />}
        {activeTab === 'checklist' && <PreDepartureChecklist />}
      </main>

      <nav className="bottom-nav">
        <button 
          className={`nav-item ${activeTab === 'dialer' ? 'active' : ''}`}
          onClick={() => setActiveTab('dialer')}
        >
          <Wallet size={24} />
          <span>Pay</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'vault' ? 'active' : ''}`}
          onClick={() => setActiveTab('vault')}
        >
          <Users size={24} />
          <span>Contacts</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'hub' ? 'active' : ''}`}
          onClick={() => setActiveTab('hub')}
        >
          <BookOpen size={24} />
          <span>Read</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'checklist' ? 'active' : ''}`}
          onClick={() => setActiveTab('checklist')}
        >
          <CheckSquare size={24} />
          <span>Prep</span>
        </button>
      </nav>
    </div>
  );
}

export default App;
