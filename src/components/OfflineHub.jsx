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
      // Simulate network request for realistic articles
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const realisticArticles = [
        {
          id: 1,
          title: "The Future of AI in Personal Finance",
          body: "Artificial intelligence is rapidly transforming how we manage our money. From predictive budgeting apps to automated investment strategies, the tools available to retail investors are becoming increasingly sophisticated. In this deep dive, we explore how machine learning models are analyzing spending patterns to offer real-time financial advice.",
          content: [
            "Financial institutions are now deploying LLMs to process loan applications and customer queries at unprecedented speeds. But the real game changer is happening on the consumer side.",
            "Imagine an app that not only tracks your expenses but actively negotiates lower rates on your utility bills. This is no longer science fiction. AI agents can act on your behalf to cancel unused subscriptions and optimize your savings rates across different accounts.",
            "As we move into an era of hyper-personalized finance, the 'Offline Wallet Assistant' is well positioned. By keeping core functionalities alive even without internet access, users are empowered to make critical financial decisions anywhere, anytime."
          ],
          category: "Technology",
          readTime: 4,
          date: new Date().toLocaleDateString()
        },
        {
          id: 2,
          title: "Sustainable Living: 5 Changes You Can Make Today",
          body: "Transitioning to a sustainable lifestyle doesn't require living off the grid. Small, consistent changes in our daily routines can have a compounding positive effect on the environment.",
          content: [
            "We often hear about the critical impact of large corporations on carbon footprints, but individual consumer choices dictate market trends. The first step is addressing food waste. By simply planning meals and storing perishables correctly, the average household can cut its waste by 30%.",
            "Secondly, energy consumption at home. Swapping to LED bulbs and utilizing smart thermostats are one-time upgrades that offer long-term efficiency. Furthermore, consider the life cycle of your wardrobe. Fast fashion is a significant polluter; choosing durable, timeless pieces reduces textile waste.",
            "Lastly, conscious commuting. If public transport isn't a viable option, carpooling or consolidating errands can significantly reduce your weekly emissions. Sustainability is about progress, not perfection."
          ],
          category: "Lifestyle",
          readTime: 3,
          date: new Date().toLocaleDateString()
        },
        {
          id: 3,
          title: "Understanding Blockchain Beyond Cryptocurrency",
          body: "While Bitcoin and Ethereum grab the headlines, the underlying blockchain technology is quietly revolutionizing supply chains, healthcare records, and digital identity verification.",
          content: [
            "At its core, a blockchain is a distributed ledger that records transactions across many computers, ensuring that the registered data cannot be altered retroactively without the alteration of all subsequent blocks.",
            "In supply chain management, this means unparalleled transparency. A supermarket can trace the origin of a mango back to the specific farm and harvest date. This reduces fraud and ensures ethical sourcing.",
            "Healthcare is another frontier. Patient records are often fragmented across different providers. A secure blockchain system could allow patients to grant doctors temporary access to their complete medical history, improving diagnosis and treatment while maintaining strict privacy."
          ],
          category: "Tech & World",
          readTime: 5,
          date: new Date().toLocaleDateString()
        }
      ];

      setArticles(realisticArticles);
      localStorage.setItem('offline-articles', JSON.stringify(realisticArticles));
      setIsLoading(false);
    } catch (error) {
      alert("Failed to sync. Please try again.");
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
            <p style={{ fontWeight: 'bold' }}>{selectedArticle.body}</p>
            {selectedArticle.content && selectedArticle.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            {!selectedArticle.content && (
              <>
                <p>Enjoy reading this realistic article on your commute, completely offline!</p>
                <p>More detailed content and insights will be synced when you next connect to Wi-Fi. This placeholder ensures you still have engaging reading material.</p>
              </>
            )}
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
                  <span>{article.category || 'News'}</span>
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
