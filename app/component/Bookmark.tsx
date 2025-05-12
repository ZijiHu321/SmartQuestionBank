'use client';

import { useEffect, useState } from 'react';
import QuestionCard from '../questiontemp';
import LACard from '../LA_Temp';
import { parseQuestionFile, Question } from '../questionParser';
import { parseLAQuestionFile, LAQuestion } from '../LA_Parser';
import ClearBookmarks from './ClearBookmarks';

type AnyQuestion = Question | LAQuestion;

const Bookmark = () => {
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<AnyQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allQuestions, setAllQuestions] = useState<AnyQuestion[]>([]);

  useEffect(() => {
    const loadAllQuestions = async () => {
      try {
        const questionTypes = ['MCquestion', 'LAquestion'];
        const loadedQuestions: AnyQuestion[] = [];

        for (const type of questionTypes) {
          // Load courses for current question type
          const coursesRes = await fetch(`/${type}/courses.json`);
          const courses: string[] = await coursesRes.json();
          
          for (const course of courses) {
            // Load files for current course
            const filesRes = await fetch(`/${type}/${encodeURIComponent(course)}/files.json`);
            const files: string[] = await filesRes.json();
            
            for (const file of files) {
              const res = await fetch(
                `/${type}/${encodeURIComponent(course)}/${encodeURIComponent(file)}`
              );
              const text = await res.text();
              
              // Parse based on question type
              const questions = type === 'MCquestion'
                ? parseQuestionFile(text, file.replace('.txt', ''), course)
                : parseLAQuestionFile(text, file.replace('.txt', ''), course);
              
              loadedQuestions.push(...questions);
            }
          }
        }

        setAllQuestions(loadedQuestions);
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
        // drop the begging 'q' if exists
        const bookmarks: string[] = JSON.parse(
          localStorage.getItem('Bookmarks') || '[]'
        ).map((id: string) => id.startsWith('q') ? id.substring(1) : id);
        
        // drop the begging 'q' if exists
        const bookmarked = allQuestions.filter(q => 
          bookmarks.includes(q.id.startsWith('q') ? q.id.substring(1) : q.id)
        );

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
    return <div style={{ padding: '2rem', textAlign: 'center', marginTop:'5rem' }}>Loading bookmarks...</div>;
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
        marginLeft: '6vw'
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
          You haven&#39;t bookmarked any questions.
        </div>
      ) : (
        <>
          {bookmarkedQuestions.map((question) => (
            <div key={question.id} style={{ marginBottom: '3rem' }}>
              {'choices' in question ? (
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
              ) : (
                <LACard
                  id={question.id}
                  question={question.question}
                  solution={question.solution}
                  difficulty={question.difficulty}
                  tags={question.tags}
                  topics={question.topics}
                  unit={question.unit}
                  course={question.course}
                />
              )}
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