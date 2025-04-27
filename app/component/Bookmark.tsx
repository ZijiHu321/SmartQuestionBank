'use client';

import { useEffect, useState } from 'react';
import QuestionCard from '../questiontemp';
import { parseQuestionBlock, parseQuestionFile, Question } from '../questionParser';
import ClearBookmarks from './ClearBookmarks';

interface BookmarkedQuestion extends Question {
  id: string;
}

const Bookmark = () => {
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<BookmarkedQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const loadAllQuestions = async () => {
      try {
        const coursesRes = await fetch('/MCquestion/courses.json');
        const courses: string[] = await coursesRes.json();
        
        const allQuestions = await Promise.all(
          courses.map(async (course) => {
            const filesRes = await fetch(`/MCquestion/${encodeURIComponent(course)}/files.json`);
            const files: string[] = await filesRes.json();
            
            const courseQuestions = await Promise.all(
              files.map(async (file) => {
                const res = await fetch(
                  `/MCquestion/${encodeURIComponent(course)}/${encodeURIComponent(file)}`
                );
                const text = await res.text();
                return parseQuestionFile(text, file.replace('.txt', ''), course);
              })
            );
            
            return courseQuestions.flat();
          })
        );

        setAllQuestions(allQuestions.flat(3).filter(q => q !== null) as Question[]);
      } catch (error) {
        console.error('Error loading questions:', error);
        setError('Failed to load question bank');
      }
    };

    loadAllQuestions();
  }, []);

  useEffect(() => {
    const loadBookmarks = async () => {
      if (allQuestions.length === 0) return;

      try {
        const bookmarks: string[] = JSON.parse(
          localStorage.getItem('Bookmarks') || '[]'
        );
        
        const bookmarked = allQuestions.filter(q => 
          bookmarks.includes(q.id)
        ) as BookmarkedQuestion[];

        setBookmarkedQuestions(bookmarked);
        setError(null);
      } catch (error) {
        console.error('Error loading bookmarks:', error);
        setError('Failed to load bookmarks');
      } finally {
        setLoading(false);
      }
    };

    loadBookmarks();
  }, [allQuestions]);

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading bookmarks...</div>;
  }

  if (error) {
    return (
      <div style={{ 
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#ff4444',
        gap: '1rem'
      }}>
        <h2 style={{ fontSize: '24px' }}>Error Loading Bookmarks</h2>
        <button 
          onClick={() => window.location.reload()}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '100%', 
      margin: '0 auto',
      padding: '2rem 1rem'
    }}>
      <h1 style={{ 
        marginBottom: '-5rem',
        fontSize: '2rem',
        fontWeight: '600',
        textAlign: 'left',
        marginTop: '6rem',
        marginLeft: '6rem'
      }}>
        Your Bookmarked Questions:
      </h1>
      
      {bookmarkedQuestions.length === 0 ? (
        <div style={{ 
          height: '85vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#666',
          fontSize: '25px',
          marginTop: '-8rem'
        }}>
          You haven't bookmarked any questions.
        </div>
      ) : (
        <>
          {bookmarkedQuestions.map((question) => (
            <div key={question.id} style={{ marginBottom: '3rem' }}>
              <QuestionCard
                id={question.id}
                question={question.question}
                choices={question.choices}
                correctIndex={question.correctIndex}
                difficulty={question.difficulty}
                unit={question.unit}
                topics={question.topics}
                course={question.course}
              />
            </div>
          ))}
          <ClearBookmarks onClear={() => {
            localStorage.setItem('Bookmarks', '[]');
            setBookmarkedQuestions([]);
          }} />
        </>
      )}
    </div>
  );
};

export default Bookmark;