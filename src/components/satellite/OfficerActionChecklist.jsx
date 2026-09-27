import React, { useState } from 'react';
import { CheckSquare, FileText, Send } from 'lucide-react';
import './OfficerActionChecklist.css';

export function OfficerActionChecklist({ checklistData = [], onExportBrief }) {
  const [tasks, setTasks] = useState(checklistData);

  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  return (
    <div className="officer-checklist-wrapper">
      <div className="checklist-header">
        <span className="checklist-title">
          <CheckSquare size={14} className="checklist-icon" /> Mandatory Officer Field Actions
        </span>
        <span className="checklist-count">
          {tasks.filter((t) => t.completed).length} / {tasks.length} Done
        </span>
      </div>

      <div className="checklist-items">
        {tasks.map((t) => (
          <label key={t.id} className={`checklist-item ${t.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleTask(t.id)}
            />
            <span>{t.task}</span>
          </label>
        ))}
      </div>

      <div className="checklist-actions">
        <button className="officer-btn primary-btn" onClick={onExportBrief}>
          <FileText size={13} /> Export Satellite Evidence Dossier (PDF)
        </button>
        <button className="officer-btn secondary-btn">
          <Send size={13} /> Issue Form VIII Notice
        </button>
      </div>
    </div>
  );
}

export default OfficerActionChecklist;
