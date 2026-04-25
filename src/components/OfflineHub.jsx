import React, { useState, useEffect } from 'react';
import { DownloadCloud, BookOpen, AlertCircle, ArrowLeft } from 'lucide-react';

export default function OfflineHub() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    // Load cached articles on mount
    const cached = localStorage.getItem('offline-articles');
    if (cached) {
      setArticles(JSON.parse(cached));
    }
  }, []);

  const syncContent = async () => {
    setIsLoading(true);
    try {
      // Fetch mock posts to simulate a news batch
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      
      // Add fake images/metadata for realism
      const enrichedData = data.slice(0, 15).map(article => ({
        ...article,
        readTime: Math.floor(Math.random() * 5) + 2, // 2-6 min read
        date: new Date().toLocaleDateString()
      }));

      setArticles(enrichedData);
      localStorage.setItem('offline-articles', JSON.stringify(enrichedData));
      
      setTimeout(() => setIsLoading(false), 800); // UI delay for effect
    } catch (error) {
      alert("Failed to sync. Please ensure you are connected to the internet first!");
      setIsLoading(false);
    }
  };

  // Article Reader View
  if (selectedArticle) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '20px' }}>
        <button 
          onClick={() => setSelectedArticle(null)}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', color: 'var(--accent)', padding: '0', width: 'fit-content' }}
        >
          <ArrowLeft size={18} />
          Back to Hub
        </button>
        
        <article style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '12px', textTransform: 'capitalize', lineHeight: '1.3' }}>
            {selectedArticle.title}
          </h1>
          <div style={{ display: 'flex', gap: '12px', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '24px' }}>
            <span>{selectedArticle.date}</span>
            <span>•</span>
            <span>{selectedArticle.readTime} min read</span>
          </div>
          
          <div style={{ width: '100%', height: '150px', background: 'var(--bg-input)', borderRadius: '8px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            [Offline Image Cached]
          </div>

          <div style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p>{selectedArticle.body}</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </article>
      </div>
    );
  }

  // Main Hub View
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), transparent)', border: '1px solid var(--accent-glow)', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
          <DownloadCloud size={40} color="var(--accent)" />
        </div>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Daily Cache Sync</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px', lineHeight: '1.5' }}>
          Tap this button while on WiFi at home to download today's essential articles and news for your commute.
        </p>
        <button 
          onClick={syncContent}
          disabled={isLoading}
          style={{ width: '100%', padding: '14px', background: 'var(--accent)', color: '#000', fontWeight: 'bold' }}
        >
          {isLoading ? 'Downloading...' : 'Sync Today\'s Content (8.4 MB)'}
        </button>
      </div>

      <div>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontSize: '1.1rem' }}>
          <BookOpen size={18} color="var(--accent)" />
          Downloaded for Offline
        </h3>
        
        {articles.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '30px 20px', background: 'var(--bg-card)', borderRadius: '12px', color: 'var(--text-muted)', textAlign: 'center' }}>
            <AlertCircle size={24} />
            <p>No content synced yet. Connect to WiFi and press Sync above.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {articles.map(article => (
              <div 
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '16px', cursor: 'pointer', transition: 'border 0.2s', display: 'flex', flexDirection: 'column', gap: '8px' }}
              >
                <h4 style={{ textTransform: 'capitalize', margin: 0, fontSize: '1rem', lineHeight: '1.4' }}>
                  {article.title}
                </h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                  <span>Tech & World</span>
                  <span>{article.readTime} min read</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
