import { describe, it, expect } from 'vitest';
import { getQuestionCorrectAnswerIndex } from '../components/practice/quiz-runner';

describe('QuizRunner - getQuestionCorrectAnswerIndex', () => {
  it('correctly resolves correctOptionIndex (used in OOP Inheritance & Abstraction)', () => {
    const q = {
      id: 'q1',
      prompt: 'What is inheritance?',
      options: ['Feature A', 'Feature B', 'Feature C'],
      correctOptionIndex: 1,
      explanation: 'Explanation'
    };
    expect(getQuestionCorrectAnswerIndex(q)).toBe(1);
  });

  it('correctly resolves correctAnswer (used in Basics)', () => {
    const q = {
      id: 'q2',
      prompt: 'What is an array?',
      options: ['Option 0', 'Option 1'],
      correctAnswer: 0,
      explanation: 'Explanation'
    };
    expect(getQuestionCorrectAnswerIndex(q)).toBe(0);
  });

  it('correctly resolves correctOption and correctAnswerIndex fallbacks', () => {
    const q1 = {
      id: 'q3',
      prompt: 'Test 1',
      options: ['A', 'B', 'C'],
      correctOption: 2,
      explanation: 'Explanation'
    };
    expect(getQuestionCorrectAnswerIndex(q1)).toBe(2);

    const q2 = {
      id: 'q4',
      prompt: 'Test 2',
      options: ['A', 'B', 'C'],
      correctAnswerIndex: 0,
      explanation: 'Explanation'
    };
    expect(getQuestionCorrectAnswerIndex(q2)).toBe(0);
  });

  it('handles numeric strings gracefully', () => {
    const q = {
      id: 'q5',
      prompt: 'Test numeric string',
      options: ['A', 'B', 'C'],
      correctAnswer: '2',
      explanation: 'Explanation'
    };
    expect(getQuestionCorrectAnswerIndex(q)).toBe(2);
  });

  it('handles option text matching gracefully if correctAnswer is the option string', () => {
    const q = {
      id: 'q6',
      prompt: 'Test string option value',
      options: ['Apple', 'Banana', 'Cherry'],
      correctAnswer: 'Banana',
      explanation: 'Explanation'
    };
    expect(getQuestionCorrectAnswerIndex(q)).toBe(1);
  });

  it('returns -1 when no valid answer is provided', () => {
    const q = {
      id: 'q7',
      prompt: 'Invalid question',
      options: ['A', 'B'],
      explanation: 'Explanation'
    };
    expect(getQuestionCorrectAnswerIndex(q)).toBe(-1);
    expect(getQuestionCorrectAnswerIndex(null)).toBe(-1);
  });
});
