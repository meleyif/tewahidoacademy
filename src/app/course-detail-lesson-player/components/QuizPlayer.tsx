'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircle, XCircle, AlertCircle, Loader2, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

// BACKEND: GET /api/v1/lessons/:id/quiz — returns quiz questions
const quizQuestions: QuizQuestion[] = [
  {
    id: 'q-001',
    question: 'What term does the Ethiopian Orthodox Tewahido Church use to describe the nature of Christ?',
    options: ['Monophysite', 'Diophysite', 'Miaphysite', 'Dyothelite'],
    correct: 2,
    explanation: 'The Tewahido Church affirms Miaphysitism — the belief that Christ has one united divine-human nature, not two separate natures. This distinguishes it from both Chalcedonian and Monophysite positions.',
  },
  {
    id: 'q-002',
    question: 'In the Ge\'ez doxology, which phrase expresses the co-equality of the three persons of the Trinity?',
    options: [
      'Bism Ab wa Wald wa Menfes Qiddus',
      'Weld Ihud Amlak',
      'Selassie Qiddusat',
      'Kidus Amlak Ihud',
    ],
    correct: 0,
    explanation: '"Bism Ab wa Wald wa Menfes Qiddus" (ቢስም አብ ወወልድ ወመንፈስ ቅዱስ) means "In the name of the Father, the Son, and the Holy Spirit" — the foundational Trinitarian invocation used in all liturgical acts.',
  },
  {
    id: 'q-003',
    question: 'Which Council\'s definition does the Ethiopian Orthodox Church reject regarding the nature of Christ?',
    options: ['Council of Nicaea (325)', 'Council of Ephesus (431)', 'Council of Chalcedon (451)', 'Council of Constantinople (381)'],
    correct: 2,
    explanation: 'The Council of Chalcedon (451 AD) defined Christ as having two distinct natures. The Ethiopian Orthodox Church, along with other Oriental Orthodox churches, rejected this definition and affirmed the one united nature of Christ.',
  },
  {
    id: 'q-004',
    question: 'The Ethiopic term "ተዋሕዶ" (Tewahido) literally means:',
    options: ['Sacred Unity', 'Made One / United', 'Holy Trinity', 'Divine Nature'],
    correct: 1,
    explanation: '"Tewahido" (ተዋሕዶ) comes from the Ge\'ez root meaning "to be made one" or "united" — directly expressing the church\'s Christological position that the divine and human natures of Christ are united into one.',
  },
];

type QuizState = 'answering' | 'reviewing' | 'completed';

interface FormData {
  [key: string]: string;
}

export default function QuizPlayer() {
  const [quizState, setQuizState] = useState<QuizState>('answering');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, watch, reset } = useForm<FormData>();

  const question = quizQuestions[currentQ];
  const selectedAnswer = watch(`answer-${question.id}`);
  const isAnswered = selectedAnswer !== undefined;
  const isReviewing = quizState === 'reviewing';

  const score = quizQuestions.filter(
    (q, i) => answers[q.id] === q.correct
  ).length;

  const scorePercent = Math.round((score / quizQuestions.length) * 100);
  const passed = scorePercent >= 80;

  const handleNext = () => {
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
    }
  };

  const handlePrev = () => {
    if (currentQ > 0) setCurrentQ(currentQ - 1);
  };

  const onSubmitQuiz = async (data: FormData) => {
    const finalAnswers: Record<string, number> = {};
    quizQuestions.forEach((q) => {
      finalAnswers[q.id] = parseInt(data[`answer-${q.id}`] ?? '-1', 10);
    });
    setAnswers(finalAnswers);
    setIsSubmitting(true);
    // BACKEND: POST /api/v1/lessons/:id/quiz-submit with { answers: finalAnswers }
    await new Promise((r) => setTimeout(r, 1000));
    setIsSubmitting(false);
    setQuizState('reviewing');
    setCurrentQ(0);
    if (passed) {
      toast.success(`Quiz passed with ${scorePercent}% — lesson marked complete!`);
    } else {
      toast.error(`Score: ${scorePercent}% — 80% required to pass. Review and try again.`);
    }
  };

  const handleRetry = () => {
    setQuizState('answering');
    setAnswers({});
    setCurrentQ(0);
    reset();
  };

  if (quizState === 'completed' || (quizState === 'reviewing' && currentQ === quizQuestions.length)) {
    return (
      <div className="bg-card border border-border rounded-xl p-8 text-center space-y-4">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${passed ? 'bg-positive-bg' : 'bg-danger-bg'}`}>
          {passed ? (
            <CheckCircle size={32} className="text-positive" />
          ) : (
            <XCircle size={32} className="text-danger" />
          )}
        </div>
        <div>
          <h3 className="text-xl font-700 text-foreground">
            {passed ? 'Quiz Passed!' : 'Not Quite There Yet'}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {passed
              ? 'Excellent work — your understanding of Trinitarian theology is strong.' :'Review the lesson materials and try again when ready.'}
          </p>
        </div>
        <div className="flex items-center justify-center gap-6">
          <div className="text-center">
            <p className={`text-3xl font-800 tabular-nums ${passed ? 'text-positive' : 'text-danger'}`}>{scorePercent}%</p>
            <p className="text-xs text-muted-foreground font-500">Score</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-800 tabular-nums text-foreground">{score}/{quizQuestions.length}</p>
            <p className="text-xs text-muted-foreground font-500">Correct</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-800 tabular-nums text-foreground">80%</p>
            <p className="text-xs text-muted-foreground font-500">Required</p>
          </div>
        </div>
        {!passed && (
          <button
            onClick={handleRetry}
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-border bg-card rounded-lg text-sm font-700 text-foreground hover:bg-secondary transition-all scale-click"
          >
            <RotateCcw size={14} />
            Retry Quiz
          </button>
        )}
      </div>
    );
  }

  const userAnswer = answers[question.id];
  const isCorrect = isReviewing && userAnswer === question.correct;
  const isWrong = isReviewing && userAnswer !== question.correct;

  return (
    <form onSubmit={handleSubmit(onSubmitQuiz)}>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {/* Quiz header */}
        <div className="px-5 py-3.5 border-b border-border bg-secondary/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-700 text-muted-foreground uppercase tracking-wider">
              Question {currentQ + 1} of {quizQuestions.length}
            </span>
            {isReviewing && (
              <span className={`text-xs font-700 px-2 py-0.5 rounded-full ${
                isCorrect ? 'bg-positive-bg text-positive' : 'bg-danger-bg text-danger'
              }`}>
                {isCorrect ? '✓ Correct' : '✗ Incorrect'}
              </span>
            )}
          </div>
          {/* Progress dots */}
          <div className="flex items-center gap-1.5">
            {quizQuestions.map((q, i) => (
              <button
                key={`dot-${q.id}`}
                type="button"
                onClick={() => setCurrentQ(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === currentQ
                    ? 'bg-primary scale-125'
                    : isReviewing
                    ? answers[q.id] === q.correct
                      ? 'bg-positive' :'bg-danger'
                    : answers[q.id] !== undefined
                    ? 'bg-accent' :'bg-muted'
                }`}
                aria-label={`Go to question ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Question */}
        <div className="p-5 space-y-4">
          <p className="text-base font-700 text-foreground leading-snug">{question.question}</p>

          {/* Options */}
          <div className="space-y-2.5">
            {question.options.map((option, idx) => {
              const isSelected = isReviewing
                ? userAnswer === idx
                : watch(`answer-${question.id}`) === String(idx);
              const isCorrectOption = idx === question.correct;

              let optionStyle = 'border-border bg-card hover:bg-secondary/50';
              if (isReviewing) {
                if (isCorrectOption) optionStyle = 'border-positive bg-positive-bg';
                else if (isSelected && !isCorrectOption) optionStyle = 'border-danger bg-danger-bg';
                else optionStyle = 'border-border bg-card opacity-60';
              } else if (isSelected) {
                optionStyle = 'border-primary bg-primary/5';
              }

              return (
                <label
                  key={`opt-${question.id}-${idx}`}
                  className={`flex items-center gap-3 p-3.5 rounded-lg border cursor-pointer transition-all ${optionStyle} ${isReviewing ? 'cursor-default' : ''}`}
                >
                  <input
                    type="radio"
                    value={String(idx)}
                    disabled={isReviewing}
                    {...register(`answer-${question.id}`, { required: true })}
                    className="w-4 h-4 text-primary border-border focus:ring-ring"
                  />
                  <span className={`text-sm font-500 flex-1 ${
                    isReviewing && isCorrectOption ? 'text-positive font-700' : isReviewing && isSelected && !isCorrectOption ?'text-danger font-700': 'text-foreground'
                  }`}>
                    {option}
                  </span>
                  {isReviewing && isCorrectOption && (
                    <CheckCircle size={16} className="text-positive shrink-0" />
                  )}
                  {isReviewing && isSelected && !isCorrectOption && (
                    <XCircle size={16} className="text-danger shrink-0" />
                  )}
                </label>
              );
            })}
          </div>

          {/* Explanation (shown in review mode) */}
          {isReviewing && (
            <div className="flex items-start gap-2.5 p-3.5 bg-info-bg border border-info/20 rounded-lg fade-in">
              <AlertCircle size={15} className="text-info mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-700 text-info mb-1">Explanation</p>
                <p className="text-sm text-foreground leading-relaxed">{question.explanation}</p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="px-5 py-3.5 border-t border-border flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentQ === 0}
            className="px-4 py-2 text-sm font-600 border border-border rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-all scale-click"
          >
            Previous
          </button>

          <span className="text-xs text-muted-foreground font-500 tabular-nums">
            {Object.keys(answers).length > 0 || watch(`answer-${question.id}`)
              ? `${Math.min(currentQ + 1, quizQuestions.length)} answered`
              : 'Select an answer'}
          </span>

          {currentQ < quizQuestions.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 text-sm font-700 gradient-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all scale-click"
            >
              Next Question
            </button>
          ) : !isReviewing ? (
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-4 py-2 text-sm font-700 gradient-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-60 transition-all scale-click"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={13} className="animate-spin" />
                  Submitting…
                </>
              ) : (
                'Submit Quiz'
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleRetry}
              className="flex items-center gap-2 px-4 py-2 text-sm font-700 border border-border bg-card rounded-lg text-foreground hover:bg-secondary transition-all scale-click"
            >
              <RotateCcw size={13} />
              Retry
            </button>
          )}
        </div>
      </div>
    </form>
  );
}