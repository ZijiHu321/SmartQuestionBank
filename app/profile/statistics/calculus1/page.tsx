'use client';
import StatisticsPage from "@/app/component/Stats/courseAnalyze";
import TopicAnalyze from "@/app/component/Stats/topicAnalyze";
import Diagnosis from "@/app/component/Stats/diagnosis";
import ClearAllData from "@/app/component/Stats/clearData";
import { useState } from 'react';

export default function UnitPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleClearData = () => {
    setRefreshKey(prev => prev + 1);
    window.location.reload(); // Full page reload to ensure complete reset
  };

  return (
    <div className="space-y-8 p-4">
      <StatisticsPage 
        key={`stats-${refreshKey}`}
        params={{ course: 'Cal1' }} 
      />
      <TopicAnalyze 
        key={`topic-${refreshKey}`}
        params={{ course: 'Cal1' }} 
      />
      <Diagnosis 
        key={`diagnosis-${refreshKey}`}
        courseName="Cal1" 
      />
      
      {/* Clear All Data button at the bottom */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'left',
        marginTop: '6rem',
        marginBottom: '6rem'
      }}>
        <ClearAllData onClear={handleClearData} />
      </div>
    </div>
  );
}