import React, { useState } from 'react';
import { CheckSquare, Wifi, Map, BatteryFull } from 'lucide-react';

export default function PreDepartureChecklist() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Top up UPI Lite Balance via Bank App', icon: <BatteryFull size={18} />, done: false },
    { id: 2, text: 'Download Offline Maps (Google Maps)', icon: <Map size={18} />, done: false },
    { id: 3, text: 'Save important merchant numbers in Vault', icon: <CheckSquare size={18} />, done: false },
    { id: 4, text: 'Connect to home WiFi one last time', icon: <Wifi size={18} />, done: false }
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <CheckSquare color="var(--accent)" />
          WiFi Checklist
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.4' }}>
          Complete these steps while you still have active home internet before leaving.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {tasks.map(task => (
          <div 
            key={task.id}
            onClick={() => toggleTask(task.id)}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '16px', 
              padding: '16px', 
              background: task.done ? 'rgba(16, 185, 129, 0.05)' : 'var(--bg-card)', 
              border: `1px solid ${task.done ? 'var(--accent-glow)' : 'rgba(255,255,255,0.04)'}`, 
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ 
              width: '24px', 
              height: '24px', 
              borderRadius: '6px', 
              border: `2px solid ${task.done ? 'var(--accent)' : 'var(--text-muted)'}`,
              background: task.done ? 'var(--accent)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {task.done && <CheckSquare size={14} color="#000" /> /* removed unsupported fill="transparent" */}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: task.done ? 'var(--text-muted)' : 'var(--text-main)', textDecoration: task.done ? 'line-through' : 'none', flex: 1 }}>
              <span style={{ color: task.done ? 'var(--text-muted)' : 'var(--accent)', display: 'flex' }}>{task.icon}</span>
              <span style={{ fontSize: '0.9rem' }}>{task.text}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
