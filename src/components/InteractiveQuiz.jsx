import React, { useState } from 'react';
import { quizQuestions } from '../data/networkData';
import { HelpCircle, CheckCircle2, XCircle, Award, RotateCcw, ArrowRight } from 'lucide-react';

export default function InteractiveQuiz() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const q = quizQuestions[currentIdx];

  const handleSelectOption = (idx) => {
    if (hasAnswered) return;
    setSelectedOpt(idx);
    setHasAnswered(true);

    if (idx === q.answerIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < quizQuestions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOpt(null);
      setHasAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setHasAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="card-panel fade-in" style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <span className="badge badge-mint">Uji Pemahaman</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>8 Pertanyaan Pilihan Ganda</span>
        </div>
        <h2 style={{ fontSize: '1.8rem', letterSpacing: '-0.02em' }}>
          Kuis Interaktif <span className="text-mint">Dasar Jaringan</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '780px', marginTop: '0.4rem' }}>
          Uji pemahaman Anda seputar model OSI, TCP vs UDP, topologi fisik, nomor port, hingga pengalamatan IP dan CIDR.
        </p>
      </div>

      {!isFinished ? (
        <div style={{ maxWidth: '750px', margin: '0 auto' }}>
          {/* Progress bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>
              Pertanyaan <b style={{ color: '#ffffff' }}>{currentIdx + 1}</b> dari {quizQuestions.length}
            </span>
            <span className="mono" style={{ color: 'var(--accent-mint)', fontWeight: 700 }}>
              Skor Sementara: {score}
            </span>
          </div>

          <div style={{
            height: '6px',
            background: '#15364d',
            borderRadius: '999px',
            marginBottom: '1.75rem',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${((currentIdx + 1) / quizQuestions.length) * 100}%`,
              background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-mint))',
              transition: 'width 0.3s ease'
            }} />
          </div>

          {/* Question Box */}
          <div style={{
            background: 'var(--bg-card-alt)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '1rem',
            padding: '1.75rem',
            marginBottom: '1.5rem'
          }}>
            <h3 style={{ fontSize: '1.15rem', color: '#ffffff', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              {q.question}
            </h3>

            {/* Options list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {q.options.map((opt, idx) => {
                let optStyle = {
                  padding: '0.9rem 1.25rem',
                  borderRadius: '0.65rem',
                  border: '1px solid var(--border-subtle)',
                  background: '#0a1d2e',
                  color: 'var(--text-main)',
                  cursor: hasAnswered ? 'default' : 'pointer',
                  textAlign: 'left',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.15s ease'
                };

                if (hasAnswered) {
                  if (idx === q.answerIndex) {
                    optStyle.background = 'rgba(121, 224, 181, 0.15)';
                    optStyle.borderColor = 'var(--accent-mint)';
                    optStyle.color = '#ffffff';
                  } else if (idx === selectedOpt) {
                    optStyle.background = 'rgba(248, 113, 113, 0.15)';
                    optStyle.borderColor = 'var(--accent-rose)';
                  }
                } else if (selectedOpt === idx) {
                  optStyle.borderColor = 'var(--accent-cyan)';
                }

                return (
                  <button
                    key={idx}
                    disabled={hasAnswered}
                    onClick={() => handleSelectOption(idx)}
                    style={optStyle}
                  >
                    <span>{opt}</span>
                    {hasAnswered && idx === q.answerIndex && (
                      <CheckCircle2 size={18} color="var(--accent-mint)" />
                    )}
                    {hasAnswered && idx === selectedOpt && idx !== q.answerIndex && (
                      <XCircle size={18} color="var(--accent-rose)" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box after answer */}
            {hasAnswered && (
              <div style={{
                marginTop: '1.25rem',
                padding: '1rem',
                borderRadius: '0.65rem',
                background: selectedOpt === q.answerIndex ? 'rgba(121, 224, 181, 0.08)' : 'rgba(248, 113, 113, 0.08)',
                borderLeft: `4px solid ${selectedOpt === q.answerIndex ? 'var(--accent-mint)' : 'var(--accent-rose)'}`,
                fontSize: '0.85rem',
                lineHeight: 1.5
              }}>
                <b style={{ color: selectedOpt === q.answerIndex ? 'var(--accent-mint)' : 'var(--accent-rose)' }}>
                  {selectedOpt === q.answerIndex ? 'Jawaban Benar! 🎉' : 'Jawaban Kurang Tepat! 💡'}
                </b>
                <p style={{ margin: '0.35rem 0 0', color: '#d0e0ec' }}>
                  {q.explanation}
                </p>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {hasAnswered && (
              <button
                onClick={handleNext}
                className="btn btn-primary"
                style={{ padding: '0.75rem 1.5rem' }}
              >
                <span>{currentIdx < quizQuestions.length - 1 ? 'Pertanyaan Berikutnya' : 'Lihat Hasil Akhir'}</span>
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results screen */
        <div style={{
          maxWidth: '550px',
          margin: '0 auto',
          textAlign: 'center',
          background: 'var(--bg-card-alt)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '1rem',
          padding: '2.5rem 2rem'
        }}>
          <div style={{
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            background: 'rgba(121, 224, 181, 0.15)',
            border: '2px solid var(--accent-mint)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem'
          }}>
            <Award size={36} color="var(--accent-mint)" />
          </div>

          <h3 style={{ fontSize: '1.8rem', color: '#ffffff', marginBottom: '0.5rem' }}>
            Kuis Selesai!
          </h3>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
            Anda berhasil menjawab <b style={{ color: 'var(--accent-mint)' }}>{score}</b> dari total {quizQuestions.length} pertanyaan dengan benar.
          </p>

          <div style={{
            background: '#071827',
            border: '1px solid #1c425c',
            borderRadius: '0.75rem',
            padding: '1.25rem',
            marginBottom: '1.75rem'
          }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>NILAI AKHIR:</div>
            <div className="mono" style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
              {Math.round((score / quizQuestions.length) * 100)}%
            </div>
            <div style={{ fontSize: '0.85rem', color: '#cadde8', marginTop: '0.35rem' }}>
              {score >= 7 ? 'Luar biasa! Pemahaman konsep dasar jaringan Anda sangat solid.' : 
               score >= 5 ? 'Bagus! Anda memahami konsep utama jaringan dengan cukup baik.' :
               'Tetap semangat! Pelajari kembali materi OSI, topologi, dan port di dashboard.'}
            </div>
          </div>

          <button
            onClick={handleReset}
            className="btn btn-primary"
            style={{ padding: '0.75rem 1.75rem' }}
          >
            <RotateCcw size={16} />
            <span>Ulangi Kuis</span>
          </button>
        </div>
      )}
    </div>
  );
}

