'use client';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartOptions } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface TopicUnitData {
  [key: string]: number;
}

const TopicAnalyze = ({ params }: { params: { course: string } }) => {
  const [topicData, setTopicData] = useState<TopicUnitData>({});
  const [unitData, setUnitData] = useState<TopicUnitData>({});
  const [loading, setLoading] = useState(true);
  const [showAllUnits, setShowAllUnits] = useState(false);
  const [showAllTopics, setShowAllTopics] = useState(false);

  useEffect(() => {
    const loadData = () => {
      try {
        const courseKey = decodeURIComponent(params.course);
        
        // Load topic data
        const topicsKey = `${courseKey}_Topics`;
        const topicsStr = localStorage.getItem(topicsKey);
        setTopicData(topicsStr ? JSON.parse(topicsStr) : {});

        // Load unit data
        const unitsKey = `${courseKey}_Units`;
        const unitsStr = localStorage.getItem(unitsKey);
        setUnitData(unitsStr ? JSON.parse(unitsStr) : {});

      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [params.course]);

  const createBarChart = (data: TopicUnitData, title: string, maxItems?: number) => {
    // Filter out zero values and process data for chart
    const sortedEntries = Object.entries(data)
      .filter(([, value]) => value > 0)
      .sort(([,a], [,b]) => b - a);
    
    const limitedEntries = maxItems ? sortedEntries.slice(0, maxItems) : sortedEntries;
    
    const labels = limitedEntries.map(([key]) => key);
    const values = limitedEntries.map(([,value]) => value);

    const options: ChartOptions<'bar'> = {
      indexAxis: 'x',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        title: { 
          display: true,
          text: title,
          font: { size: 16 },
          padding: { bottom: 15 }
        },
        tooltip: {
          enabled: true,
          bodyFont: { family: "'Inter', sans-serif", size: 12 }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { 
            font: { family: "'Inter', sans-serif" },
            precision: 0
          },
          grid: { display: false }
        },
        x: {
          ticks: { 
            font: { family: "'Inter', sans-serif" },
            autoSkip: false,
            maxRotation: 45,
            minRotation: 45
          },
          grid: { display: false }
        }
      }
    };

    return {
      data: {
        labels,
        datasets: [{
          data: values,
          backgroundColor: '#EF4444',
          borderWidth: 0,
          borderRadius: 4,
          categoryPercentage: 0.8,
          barPercentage: 0.9
        }]
      },
      options
    };
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Process data for display (filter out zero values)
  const allUnits = Object.entries(unitData)
    .filter(([, count]) => count > 0)
    .sort(([a], [b]) => a.localeCompare(b));
    
  const allTopics = Object.entries(topicData)
    .filter(([, count]) => count > 0)
    .sort(([,a], [,b]) => b - a);

  return (
    <div className="container py-5">
      <div className="row mb-5 g-4" style={{ marginTop: '-8rem' }}>
        {/* Units Report */}
        <div className="col-12 col-lg-6 mb-4">
          <div className="card shadow-sm h-100 border-0">
            <div className="card-header bg-secondary text-white rounded-top py-2">
              <h3 className="mb-0 font-medium">Units Report</h3>
            </div>
            <div className="card-body bg-white rounded-bottom">
              <div style={{ height: '450px' }}>
                <Bar {...createBarChart(unitData, '#errors in each unit')} />
              </div>
              <div className="row mt-3 g-2">
                {allUnits
                  .slice(0, showAllUnits ? allUnits.length : 6)
                  .map(([unit, count]) => (
                    <div key={unit} className="col-6 col-md-4">
                      <div className="d-flex justify-content-between align-items-center px-2 py-1 bg-light rounded">
                        <span className="text-muted small">{unit}</span>
                        <span className="badge bg-danger">{count}</span>
                      </div>
                    </div>
                  ))}
                {allUnits.length > 6 && (
                  <div className="col-12 text-center mt-2">
                    <button 
                      className="btn btn-link text-decoration-none p-0"
                      onClick={() => setShowAllUnits(!showAllUnits)}
                    >
                      {showAllUnits ? 'Hide' : 'Show More...'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Weak Topics */}
        <div className="col-12 col-lg-6 mb-4">
          <div className="card shadow-sm h-100 border-0">
            <div className="card-header bg-secondary text-white rounded-top py-2">
              <h3 className="mb-0 font-medium">Weak Topics</h3>
            </div>
            <div className="card-body bg-white rounded-bottom">
              <div style={{ height: '450px' }}>
                <Bar {...createBarChart(topicData, '#errors on topics', 5)} />
              </div>
              <div className="row mt-3 g-2">
                {allTopics
                  .slice(0, showAllTopics ? allTopics.length : 6)
                  .map(([topic, count]) => (
                    <div key={topic} className="col-12 col-md-6">
                      <div className="d-flex justify-content-between align-items-center px-2 py-1 bg-light rounded">
                        <span className="text-muted small">{topic}</span>
                        <span className="badge bg-danger">{count}</span>
                      </div>
                    </div>
                  ))}
                {allTopics.length > 6 && (
                  <div className="col-12 text-center mt-2">
                    <button 
                      className="btn btn-link text-decoration-none p-0"
                      onClick={() => setShowAllTopics(!showAllTopics)}
                    >
                      {showAllTopics ? 'Hide' : 'Show More...'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicAnalyze;