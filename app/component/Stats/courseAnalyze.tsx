'use client';
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CourseStats {
  totalAnswered: number;
  correct: number;
  incorrect: number;
  accuracy: number;
}

const StatisticsPage = ({ params }: { params: { course: string } }) => {
  const [allCoursesStats, setAllCoursesStats] = useState<CourseStats>({
    totalAnswered: 0,
    correct: 0,
    incorrect: 0,
    accuracy: 0
  });
  const [courseStats, setCourseStats] = useState<CourseStats>({
    totalAnswered: 0,
    correct: 0,
    incorrect: 0,
    accuracy: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      try {
        const answeredQuestionsStr = localStorage.getItem('answeredQuestions');
        const answeredQuestions: Record<string, boolean> = answeredQuestionsStr 
          ? JSON.parse(answeredQuestionsStr) 
          : {};

        // All courses stats
        const allCorrect = Object.values(answeredQuestions).filter(v => v).length;
        const allTotal = Object.keys(answeredQuestions).length;
        setAllCoursesStats({
          totalAnswered: allTotal,
          correct: allCorrect,
          incorrect: allTotal - allCorrect,
          accuracy: allTotal ? Math.round((allCorrect / allTotal) * 100) : 0
        });

        // Course-specific stats
        const encodedCourse = encodeURIComponent(params.course);
        const courseQuestionIds = Object.keys(answeredQuestions).filter(id =>
          id.startsWith(`q${encodedCourse}_`) || id.startsWith(`${encodedCourse}_`)
        );
        const courseCorrect = courseQuestionIds.filter(id => answeredQuestions[id]).length;
        const courseTotal = courseQuestionIds.length;
        setCourseStats({
          totalAnswered: courseTotal,
          correct: courseCorrect,
          incorrect: courseTotal - courseCorrect,
          accuracy: courseTotal ? Math.round((courseCorrect / courseTotal) * 100) : 0
        });

      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [params.course]);

  const createPieChart = (correct: number, incorrect: number, label: string) => {
    const total = correct + incorrect;
    const accuracy = total ? Math.round((correct / total) * 100) : 0;

    const options: ChartOptions<'pie'> = {
      cutout: '65%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: {
              family: "'Inter', sans-serif",
              size: 12
            },
            padding: 20
          }
        },
        tooltip: {
          enabled: total > 0,
          bodyFont: {
            family: "'Inter', sans-serif",
            size: 12
          }
        }
      }
    };

    return {
      data: {
        labels: ['Correct', 'Incorrect'],
        datasets: [{
          data: [correct, incorrect],
          backgroundColor: ['#10B981', '#EF4444'],
          borderWidth: 0,
        }]
      },
      options,
      centerText: {
        accuracy,
        label
      }
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

  const overallChart = createPieChart(allCoursesStats.correct, allCoursesStats.incorrect, 'Overall Accuracy');
  const courseChart = createPieChart(courseStats.correct, courseStats.incorrect, 'Course Accuracy');

  return (
    <div className="container py-5">
      <h1 className="mb-5 text-3xl font-bold text-gray-800" style={{
        marginTop: '100px', 
        fontSize: '2.5rem',
        color: '#333',
        textAlign: 'left'
      }}>
        {decodeURIComponent(params.course)} Statistics
      </h1>

      <div className="row mb-5">
        <div className="col-lg-6 mb-4">
          <div className="card shadow-sm h-100 border-0">
            <div className="card-header bg-secondary text-white rounded-top">
              <h3 className="mb-0 font-medium">Overall Performance</h3>
            </div>
            <div className="card-body d-flex flex-column align-items-center bg-white rounded-bottom">
              <div className="d-flex justify-content-center w-100" style={{ height: '250px' }}>
                <div className="position-relative" style={{ width: '300px', height: '250px' }}>
                  <Pie 
                    data={overallChart.data} 
                    options={overallChart.options} 
                    style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%) translateY(1rem)' }}
                  />
                  <div className="position-absolute top-50 start-50 translate-middle text-center">
                    <div className="h3 mb-0 fw-bold text-gray-800" style={{ fontSize: '2.3rem', marginTop:'-1rem', marginBottom:'0rem' }}>
                      {overallChart.centerText.accuracy}%
                    </div>
                    <small className="text-muted font-medium">{overallChart.centerText.label}</small>
                  </div>
                </div>
              </div>
              <div className="w-100 mt-5">
                <div className="row text-center">
                  <div className="col-4">
                    <div className="text-sm text-gray-600">Total</div>
                    <div className="h4 font-semibold">{allCoursesStats.totalAnswered}</div>
                  </div>
                  <div className="col-4 text-success">
                    <div className="text-sm text-green-600">Correct</div>
                    <div className="h4 font-semibold">{allCoursesStats.correct}</div>
                  </div>
                  <div className="col-4 text-danger">
                    <div className="text-sm text-red-600">Incorrect</div>
                    <div className="h4 font-semibold">{allCoursesStats.incorrect}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6 mb-4">
          <div className="card shadow-sm h-100 border-0">
            <div className="card-header bg-secondary text-white rounded-top">
              <h3 className="mb-0 font-medium">Course Performance</h3>
            </div>
            <div className="card-body d-flex flex-column align-items-center bg-white rounded-bottom">
              <div className="d-flex justify-content-center w-100" style={{ height: '250px' }}>
                <div className="position-relative" style={{ width: '300px', height: '250px' }}>
                  <Pie 
                    data={courseChart.data} 
                    options={courseChart.options} 
                    style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%) translateY(1rem)' }}
                  />
                  <div className="position-absolute top-50 start-50 translate-middle text-center">
                    <div className="h3 mb-0 fw-bold text-gray-800" style={{ fontSize: '2.3rem', marginTop:'-1rem' }}>
                      {courseChart.centerText.accuracy}%
                    </div>
                    <small className="text-muted font-medium">{courseChart.centerText.label}</small>
                  </div>
                </div>
              </div>
              <div className="w-100 mt-5">
                <div className="row text-center">
                  <div className="col-4">
                    <div className="text-sm text-gray-600">Total</div>
                    <div className="h4 font-semibold">{courseStats.totalAnswered}</div>
                  </div>
                  <div className="col-4 text-success">
                    <div className="text-sm text-green-600">Correct</div>
                    <div className="h4 font-semibold">{courseStats.correct}</div>
                  </div>
                  <div className="col-4 text-danger">
                    <div className="text-sm text-red-600">Incorrect</div>
                    <div className="h4 font-semibold">{courseStats.incorrect}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;