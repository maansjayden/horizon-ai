import { useState } from 'react';
import {
  Brain,
  GraduationCap,
  Award,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  BookOpen,
  Heart,
  Cpu,
  Coins,
  MessageSquare,
  FileText,
  Sparkles,
  Check,
  RotateCcw,
  Volume2,
  VolumeX,
  Info,
  Globe,
  Building,
  DollarSign,
  Layers,
  ExternalLink
} from 'lucide-react';
import { careers, quizQuestions } from './data/careersData';
import type { Career } from './types/career';
import { sound } from './utils/audio';
import { InteractiveParticles } from './components/InteractiveParticles';
import './App.css';

type Tab = 'hub' | 'explorer' | 'roadmap' | 'interview' | 'resume';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('hub');
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Career Explorer State
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizScores, setQuizScores] = useState<{ [careerId: string]: number }>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [matchedCareers, setMatchedCareers] = useState<{ career: Career; matchPercent: number }[]>([]);
  const [selectedMatchIndex, setSelectedMatchIndex] = useState(0);
  const [triggerConfetti, setTriggerConfetti] = useState(false);

  // Roadmap State
  const [selectedCareer, setSelectedCareer] = useState<Career>(careers[0]);
  const [activeRoadmapPhase, setActiveRoadmapPhase] = useState(0);

  // Interview Coach State
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [selectedInterviewCareer, setSelectedInterviewCareer] = useState<Career>(careers[0]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [critique, setCritique] = useState<{
    score: number;
    matchedConcepts: string[];
    unmatchedConcepts: string[];
    feedback: string;
  } | null>(null);
  const [interviewHistory, setInterviewHistory] = useState<{ question: string; answer: string; score: number }[]>([]);
  const [interviewFinished, setInterviewFinished] = useState(false);
  const [displayedFeedback, setDisplayedFeedback] = useState('');

  // Resume Enhancer State
  const [resumeRole, setResumeRole] = useState('');
  const [resumeRaw, setResumeRaw] = useState('');
  const [resumeEnhanced, setResumeEnhanced] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);

  // Sound Toggle Handler
  const toggleSound = () => {
    const newState = sound.toggle();
    setSoundEnabled(newState);
  };

  // Play Hover Audio
  const handleHover = () => {
    sound.playHover();
  };

  // Play Click Audio
  const handleClick = () => {
    sound.playClick();
  };

  // Resume Presets
  const resumePresets = [
    {
      label: 'School CS Project',
      role: 'Student Developer',
      raw: 'I made a website for my computer science class. It tracks tasks and homework. I used HTML and some JS. It has a basic login page.'
    },
    {
      label: 'Newspaper Columnist',
      role: 'Student Journalist',
      raw: 'I wrote some articles for our school paper. I interviewed teachers and students and wrote columns about local high school sports.'
    },
    {
      label: 'Charity Volunteer',
      role: 'Event Volunteer',
      raw: 'Helped out at local autism charity events. I set up tables, collected donations, and talked to visitors about autism support.'
    }
  ];

  const handleLoadPreset = (preset: typeof resumePresets[0]) => {
    handleClick();
    setResumeRole(preset.role);
    setResumeRaw(preset.raw);
    setResumeEnhanced('');
  };

  // Enhancing Resume Simulator
  const handleEnhanceResume = () => {
    if (!resumeRaw || !resumeRole) return;
    handleClick();
    setIsEnhancing(true);
    setTimeout(() => {
      sound.playSuccess();
      setIsEnhancing(false);
      
      // Select appropriate enhancement based on keywords or default
      if (resumeRaw.toLowerCase().includes('website') || resumeRaw.toLowerCase().includes('computer')) {
        setResumeEnhanced(
          `Architected a responsive task management web app using React and LocalStorage; optimized content rendering pipeline by 35% using lazy-loaded modules, and integrated secure client-side authentication for 25+ classroom peers.`
        );
      } else if (resumeRaw.toLowerCase().includes('paper') || resumeRaw.toLowerCase().includes('articles')) {
        setResumeEnhanced(
          `Conducted 12+ structured interviews with administrators and student leaders; authored weekly sports columns reaching a monthly readership of 800+, reducing content creation cycle time by 40% with AI editing aids.`
        );
      } else {
        setResumeEnhanced(
          `Coordinated logistics and set up operations for a charity fundraiser generating $2,500+ for the Akhil Autism Foundation; created and distributed autism awareness booklets to 120+ community visitors.`
        );
      }
    }, 1500);
  };

  // Reset Quiz
  const handleResetQuiz = () => {
    handleClick();
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setQuizScores({});
    setQuizCompleted(false);
    setMatchedCareers([]);
    setTriggerConfetti(false);
  };

  // Choose option in quiz
  const handleQuizAnswer = (weights: { [careerId: string]: number }) => {
    handleClick();
    
    // Update scores
    const newScores = { ...quizScores };
    Object.keys(weights).forEach((careerId) => {
      newScores[careerId] = (newScores[careerId] || 0) + weights[careerId];
    });
    setQuizScores(newScores);

    // Go to next question or complete
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate matching percentages
      const maxPossibleScore = 15; // 5 questions * 3 max weight
      const calculatedMatches = careers.map((career) => {
        const score = newScores[career.id] || 0;
        const percent = Math.min(100, Math.round((score / maxPossibleScore) * 100));
        return { career, matchPercent: Math.max(20, percent) }; // Baseline at least 20%
      });

      // Sort matching careers descending
      calculatedMatches.sort((a, b) => b.matchPercent - a.matchPercent);
      
      setMatchedCareers(calculatedMatches);
      setQuizCompleted(true);
      setTriggerConfetti(true);
      sound.playSuccess();
      
      // Auto-select matched career for roadmaps
      setSelectedCareer(calculatedMatches[0].career);
      setSelectedInterviewCareer(calculatedMatches[0].career);
    }
  };

  // Start simulated interview
  const handleStartInterview = (career: Career) => {
    handleClick();
    setSelectedInterviewCareer(career);
    setInterviewStarted(true);
    setCurrentQuestionIdx(0);
    setUserAnswer('');
    setCritique(null);
    setInterviewHistory([]);
    setInterviewFinished(false);
  };

  // Reset interview
  const handleResetInterview = () => {
    handleClick();
    setInterviewStarted(false);
    setCritique(null);
    setDisplayedFeedback('');
  };

  // Evaluate user response inside Interview Coach (semantic LLM API call)
  const handleEvaluateAnswer = async () => {
    if (!userAnswer.trim()) return;
    handleClick();
    setIsAnalyzing(true);
    setCritique(null);
    setDisplayedFeedback('');

    const questionData = selectedInterviewCareer.interviewQuestions[currentQuestionIdx];

    try {
      const response = await fetch('/api/evaluate-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question: questionData.question,
          userAnswer: userAnswer.trim(),
          idealConcepts: questionData.idealConcepts
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Server error occurred during evaluation.');
      }

      const critiqueData = await response.json();
      
      setIsAnalyzing(false);
      sound.playMatch();

      const matched = critiqueData.matchedConcepts || [];
      const unmatched = questionData.idealConcepts.filter((c) => !matched.includes(c));

      const newCritique = {
        score: critiqueData.score !== undefined ? critiqueData.score : 50,
        matchedConcepts: matched,
        unmatchedConcepts: unmatched,
        feedback: critiqueData.feedback || 'No feedback returned.'
      };

      setCritique(newCritique);

      // Stream the feedback character-by-character to simulate real-time AI generation
      let currentText = '';
      let charIdx = 0;
      const feedbackText = newCritique.feedback;
      const interval = window.setInterval(() => {
        if (charIdx < feedbackText.length) {
          currentText += feedbackText[charIdx];
          setDisplayedFeedback(currentText);
          if (charIdx % 3 === 0) {
            sound.playType();
          }
          charIdx++;
        } else {
          window.clearInterval(interval);
        }
      }, 15);

      // Save history
      setInterviewHistory([
        ...interviewHistory,
        {
          question: questionData.question,
          answer: userAnswer,
          score: newCritique.score
        }
      ]);

    } catch (error) {
      console.error("Evaluation error:", error);
      setIsAnalyzing(false);
      
      const fallbackFeedback = error instanceof Error 
        ? error.message 
        : "Failed to connect to the evaluation server. Please verify the API backend is running.";

      setCritique({
        score: 0,
        matchedConcepts: [],
        unmatchedConcepts: questionData.idealConcepts,
        feedback: fallbackFeedback
      });
      setDisplayedFeedback(fallbackFeedback);
    }
  };

  const handleNextInterviewQuestion = () => {
    handleClick();
    setUserAnswer('');
    setCritique(null);
    setDisplayedFeedback('');
    if (currentQuestionIdx < selectedInterviewCareer.interviewQuestions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      setInterviewFinished(true);
      sound.playSuccess();
    }
  };

  return (
    <>
      {/* Background Interactive Confetti Particles */}
      <InteractiveParticles trigger={triggerConfetti} />

      {/* Main Header navigation */}
      <header className="app-header">
        <div className="logo-container" onMouseEnter={handleHover}>
          <div className="logo-icon">
            <Brain size={20} />
          </div>
          <div className="logo-text">Horizon AI</div>
        </div>
        
        <div className="header-actions">
          <button 
            onClick={toggleSound} 
            className="btn-icon-only"
            title={soundEnabled ? 'Mute Synth Effects' : 'Enable Synth Effects'}
            aria-label="Toggle Sound"
            id="btn-sound-toggle"
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
        </div>
      </header>

      {/* Main Grid HUD layout */}
      <div className="dashboard-grid">
        {/* Left Side menu */}
        <aside className="sidebar-panel">
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <ul className="nav-list">
              <li className="nav-item">
                <button
                  id="tab-hub"
                  className={`nav-link ${activeTab === 'hub' ? 'active' : ''}`}
                  onClick={() => { handleClick(); setActiveTab('hub'); }}
                  onMouseEnter={handleHover}
                >
                  <Globe />
                  YCF Hackathon Hub
                </button>
              </li>
              <li className="nav-item">
                <button
                  id="tab-explorer"
                  className={`nav-link ${activeTab === 'explorer' ? 'active' : ''}`}
                  onClick={() => { handleClick(); setActiveTab('explorer'); }}
                  onMouseEnter={handleHover}
                >
                  <Brain />
                  Career Explorer Quiz
                </button>
              </li>
              <li className="nav-item">
                <button
                  id="tab-roadmap"
                  className={`nav-link ${activeTab === 'roadmap' ? 'active' : ''}`}
                  onClick={() => { handleClick(); setActiveTab('roadmap'); }}
                  onMouseEnter={handleHover}
                >
                  <Layers />
                  Interactive Roadmaps
                </button>
              </li>
              <li className="nav-item">
                <button
                  id="tab-interview"
                  className={`nav-link ${activeTab === 'interview' ? 'active' : ''}`}
                  onClick={() => { handleClick(); setActiveTab('interview'); }}
                  onMouseEnter={handleHover}
                >
                  <MessageSquare />
                  AI Interview Coach
                </button>
              </li>
              <li className="nav-item">
                <button
                  id="tab-resume"
                  className={`nav-link ${activeTab === 'resume' ? 'active' : ''}`}
                  onClick={() => { handleClick(); setActiveTab('resume'); }}
                  onMouseEnter={handleHover}
                >
                  <FileText />
                  Resume Enhancer
                </button>
              </li>
            </ul>
          </div>

          <div className="info-card">
            <h4><Info size={14} /> Quick Note</h4>
            <p className="muted">
              Select the Career Explorer Quiz first to match your natural preferences to our Gen Z tracks!
            </p>
          </div>
        </aside>

        {/* Right Side primary display area */}
        <main className="display-area animate-fade-in">
          
          {/* TAB 1: YCF HUB */}
          {activeTab === 'hub' && (
            <div className="glass-panel welcome-hero">
              <h1>Harness AI to Shape Your <span className="highlight-gradient">Future Career</span></h1>
              <p style={{ fontSize: '1.05rem' }}>
                Welcome to the <strong>Youth Code x AI Challenge</strong> companion hub! Career planning is broken for our generation. Horizon AI is built by youth, for youth, helping high schoolers discover emerging careers, construct actionable roadmaps, build killer resumes, and ace technical interviews.
              </p>
              
              <h2 style={{ fontSize: '1.35rem', marginTop: '1.5rem', marginBottom: '0.5rem', textAlign: 'left' }}>
                Ecosystem Career Pathways &amp; Terminals
              </h2>
              <p className="muted" style={{ fontSize: '0.9rem', marginBottom: '1rem', textAlign: 'left' }}>
                Horizon AI coordinates all hackathon tracks into interactive workspaces. Select a portal below to navigate your path:
              </p>

              <div className="grid-features">
                <div 
                  className="feature-box" 
                  style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '0.25rem', textAlign: 'left' }}
                  onClick={() => {
                    handleClick();
                    const match = careers.find((c) => c.id === 'fintech-green-analyst');
                    if (match) setSelectedCareer(match);
                    setActiveTab('roadmap');
                  }}
                  onMouseEnter={handleHover}
                >
                  <Coins size={22} />
                  <h3>Fintech &amp; Green Analytics</h3>
                  <span className="badge badge-secondary" style={{ fontSize: '0.65rem', width: 'fit-content' }}>Track 01</span>
                  <p className="muted" style={{ fontSize: '0.82rem', marginTop: '0.25rem' }}>Automated transaction audits, carbon credit ledgers, and quantitative roadmaps. <strong>Explore Roadmap &rarr;</strong></p>
                </div>

                <div 
                  className="feature-box" 
                  style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '0.25rem', textAlign: 'left' }}
                  onClick={() => {
                    handleClick();
                    const match = careers.find((c) => c.id === 'creative-technologist');
                    if (match) setSelectedCareer(match);
                    setActiveTab('roadmap');
                  }}
                  onMouseEnter={handleHover}
                >
                  <Sparkles size={22} />
                  <h3>AI Film Director &amp; Content</h3>
                  <span className="badge badge-secondary" style={{ fontSize: '0.65rem', width: 'fit-content' }}>Track 02</span>
                  <p className="muted" style={{ fontSize: '0.82rem', marginTop: '0.25rem' }}>Generative visual arpeggios, prompt libraries, and digital video templates. <strong>Explore Roadmap &rarr;</strong></p>
                </div>

                <div 
                  className="feature-box" 
                  style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '0.25rem', textAlign: 'left' }}
                  onClick={() => {
                    handleClick();
                    const match = careers.find((c) => c.id === 'ai-ethicist');
                    if (match) setSelectedCareer(match);
                    setActiveTab('roadmap');
                  }}
                  onMouseEnter={handleHover}
                >
                  <Heart size={22} />
                  <h3>Ethical AI &amp; Accessibility</h3>
                  <span className="badge badge-secondary" style={{ fontSize: '0.65rem', width: 'fit-content' }}>Track 03</span>
                  <p className="muted" style={{ fontSize: '0.82rem', marginTop: '0.25rem' }}>WCAG semantic outlines, algorithmic bias checking, and neurodiversity filters. <strong>Explore Roadmap &rarr;</strong></p>
                </div>

                <div 
                  className="feature-box" 
                  style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '0.25rem', textAlign: 'left' }}
                  onClick={() => {
                    handleClick();
                    const match = careers.find((c) => c.id === 'learning-experience-designer');
                    if (match) setSelectedInterviewCareer(match);
                    setActiveTab('interview');
                  }}
                  onMouseEnter={handleHover}
                >
                  <GraduationCap size={22} />
                  <h3>Horizon Coach &amp; Resume Terminal</h3>
                  <span className="badge badge-primary" style={{ fontSize: '0.65rem', width: 'fit-content' }}>Track 04 (Our Feature)</span>
                  <p className="muted" style={{ fontSize: '0.82rem', marginTop: '0.25rem' }}>Practice streaming mock interview critiques and refine bullet metrics. <strong>Start Practice &rarr;</strong></p>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.15rem' }}>
                  <Building size={16} /> Supporting Youth Code Foundation
                </h3>
                <p className="muted" style={{ fontSize: '0.9rem' }}>
                  YouthCodeFoundation is a youth-founded 501(c)(3) nonprofit dedicated to technology education. Every dollar raised through sponsors during the hackathon goes straight to prizes and the <strong>Akhil Autism Foundation</strong>.
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                  <a href="https://jayden.lumesystems.co.za/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ fontSize: '0.85rem', borderColor: 'var(--primary-border)', background: 'var(--primary-bg)', color: 'var(--primary)' }}>
                    Creator Portfolio <ExternalLink size={14} />
                  </a>
                  <a href="https://www.youthcodefoundation.org/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ fontSize: '0.85rem' }}>
                    YCF Website <ExternalLink size={14} />
                  </a>
                  <a href="https://youthcodexai.netlify.app" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ fontSize: '0.85rem' }}>
                    Hackathon Platform <ExternalLink size={14} />
                  </a>
                  <button onClick={() => { handleClick(); setActiveTab('explorer'); }} className="btn btn-primary" style={{ fontSize: '0.85rem' }}>
                    Launch Career Matcher <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CAREER EXPLORER QUIZ */}
          {activeTab === 'explorer' && (
            <div className="glass-panel">
              {!quizStarted && !quizCompleted && (
                <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                  <Brain size={48} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
                  <h2>The IKIGAI Career Explorer</h2>
                  <p className="muted" style={{ maxWidth: '500px', margin: '0.5rem auto 1.5rem' }}>
                    Answer 5 structural behavioral questions about your workplace, superpower, and goals to discover which emerging AI career track is your perfect fit.
                  </p>
                  <button onClick={() => { handleClick(); setQuizStarted(true); }} className="btn btn-primary">
                    Start Quiz Matcher
                  </button>
                </div>
              )}

              {quizStarted && !quizCompleted && (
                <div className="quiz-container">
                  <div className="quiz-header">
                    <span className="badge badge-primary">
                      Question {currentQuestionIndex + 1} of {quizQuestions.length}
                    </span>
                    <span className="muted" style={{ fontSize: '0.85rem' }}>
                      Progress: {Math.round(((currentQuestionIndex) / quizQuestions.length) * 100)}%
                    </span>
                  </div>
                  
                  <div className="quiz-progress-bar">
                    <div 
                      className="quiz-progress-fill" 
                      style={{ width: `${((currentQuestionIndex) / quizQuestions.length) * 100}%` }}
                    />
                  </div>

                  <div className="quiz-card">
                    <h3 className="quiz-question-text">{quizQuestions[currentQuestionIndex].text}</h3>
                    <div className="quiz-options-list">
                      {quizQuestions[currentQuestionIndex].options.map((option, idx) => (
                        <button
                          key={idx}
                          className="quiz-option-button"
                          onClick={() => handleQuizAnswer(option.weights)}
                          onMouseEnter={handleHover}
                        >
                          <span className="quiz-option-index">{String.fromCharCode(65 + idx)}</span>
                          <span>{option.text}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {quizCompleted && (
                <div className="results-container">
                  <div className="match-header">
                    <h2>Your Perfect Matches</h2>
                    <p className="muted">Based on your choices, here is how you align with our high-demand tracks:</p>
                  </div>

                  {matchedCareers.length > 0 && (
                    <div className="match-card">
                      {/* Left: Matching ring */}
                      <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div className="match-gauge-wrapper">
                          <svg className="match-ring-bg" width="160" height="160">
                            <defs>
                              <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="var(--primary)" />
                                <stop offset="100%" stopColor="var(--secondary)" />
                              </linearGradient>
                            </defs>
                            <circle
                              cx="80"
                              cy="80"
                              r="70"
                              fill="transparent"
                              stroke="var(--border)"
                              strokeWidth="8"
                            />
                            <circle
                              cx="80"
                              cy="80"
                              r="70"
                              fill="transparent"
                              className="match-ring-fill"
                              strokeWidth="8"
                              strokeDasharray="440"
                              strokeDashoffset={440 - (440 * matchedCareers[selectedMatchIndex].matchPercent) / 100}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="match-percent">
                            {matchedCareers[selectedMatchIndex].matchPercent}%
                            <span>Match Rate</span>
                          </div>
                        </div>

                        <h3 style={{ textAlign: 'center', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                          {matchedCareers[selectedMatchIndex].career.title}
                        </h3>
                        <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>
                          {matchedCareers[selectedMatchIndex].career.track.split(':')[0]}
                        </span>
                      </div>

                      {/* Right: Career details */}
                      <div className="match-info">
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                          <div className="salary-tag">
                            <DollarSign size={16} /> {matchedCareers[selectedMatchIndex].career.salary}
                          </div>
                          <div className="pill pill-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                            <Award size={14} /> Growth: {matchedCareers[selectedMatchIndex].career.growth}
                          </div>
                        </div>
                        
                        <p style={{ fontSize: '0.95rem' }}>
                          {matchedCareers[selectedMatchIndex].career.description}
                        </p>

                        <div className="info-card">
                          <h4 style={{ color: 'var(--secondary)' }}><Cpu size={14} /> AI Impact Factor</h4>
                          <p style={{ fontSize: '0.85rem' }}>{matchedCareers[selectedMatchIndex].career.aiImpact}</p>
                        </div>

                        <div>
                          <h4 style={{ fontSize: '0.9rem', marginBottom: '0.4rem' }}>Target Skills &amp; Tools</h4>
                          <div className="pill-list">
                            {matchedCareers[selectedMatchIndex].career.skills.map((skill, sIdx) => (
                              <span key={sIdx} className="pill pill-primary">{skill}</span>
                            ))}
                            {matchedCareers[selectedMatchIndex].career.tools.map((tool, tIdx) => (
                              <span key={tIdx} className="pill pill-secondary">{tool}</span>
                            ))}
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                          <button
                            onClick={() => {
                              handleClick();
                              setSelectedCareer(matchedCareers[selectedMatchIndex].career);
                              setActiveTab('roadmap');
                            }}
                            className="btn btn-primary"
                          >
                            Explore Roadmap <ArrowRight size={14} />
                          </button>
                          <button
                            onClick={() => {
                              handleClick();
                              setSelectedInterviewCareer(matchedCareers[selectedMatchIndex].career);
                              setActiveTab('interview');
                            }}
                            className="btn btn-secondary"
                          >
                            Practice Mock Interview
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Slider selector for other matches */}
                  <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                    <h4 style={{ marginBottom: '1rem', textAlign: 'left' }}>Other Matched Tracks</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                      {matchedCareers.map((item, idx) => (
                        <div
                          key={item.career.id}
                          className={`glass-panel ${selectedMatchIndex === idx ? 'active' : ''}`}
                          style={{
                            padding: '1rem',
                            cursor: 'pointer',
                            textAlign: 'left',
                            borderColor: selectedMatchIndex === idx ? 'var(--primary)' : 'var(--card-border)',
                            background: selectedMatchIndex === idx ? 'var(--primary-bg)' : 'var(--card-bg)',
                            animation: 'fadeIn 0.3s ease'
                          }}
                          onClick={() => { handleClick(); setSelectedMatchIndex(idx); }}
                        >
                          <h5 style={{ fontSize: '0.85rem', marginBottom: '0.25rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {item.career.title}
                          </h5>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Match Rate</span>
                            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: selectedMatchIndex === idx ? 'var(--primary)' : 'var(--text-heading)' }}>
                              {item.matchPercent}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                    <button onClick={handleResetQuiz} className="btn btn-secondary">
                      <RotateCcw size={14} /> Retake Matcher Quiz
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CAREER ROADMAP */}
          {activeTab === 'roadmap' && (
            <div className="glass-panel roadmap-viewer">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h2>Interactive Learning Roadmap</h2>
                  <p className="muted">Visualize your structural transition from High School student to professional career.</p>
                </div>
                <div>
                  <select
                    className="form-input"
                    value={selectedCareer.id}
                    onChange={(e) => {
                      handleClick();
                      const match = careers.find((c) => c.id === e.target.value);
                      if (match) setSelectedCareer(match);
                    }}
                    style={{ fontWeight: '600' }}
                  >
                    {careers.map((c) => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Interactive SVG Connector Canvas */}
              <div className="svg-canvas-wrapper">
                <svg width="100%" height="110" viewBox="0 0 650 110" preserveAspectRatio="xMidYMid meet" style={{ overflow: 'visible' }}>
                  {/* Connectors */}
                  {[0, 1, 2].map((i) => (
                    <line
                      key={i}
                      x1={75 + i * 160}
                      y1="55"
                      x2={75 + (i + 1) * 160}
                      y2="55"
                      className={`roadmap-connector ${activeRoadmapPhase >= i + 1 ? 'active' : ''}`}
                    />
                  ))}

                  {/* Node Circles */}
                  {selectedCareer.roadmap.map((_, idx) => (
                    <g
                      key={idx}
                      className={`roadmap-node ${activeRoadmapPhase === idx ? 'active' : ''}`}
                      onClick={() => { handleClick(); setActiveRoadmapPhase(idx); }}
                      transform={`translate(${75 + idx * 160}, 55)`}
                    >
                      <circle cx="0" cy="0" r="22" strokeWidth="3" />
                      {/* Icon Overlays */}
                      <g transform="translate(-8, -8)" style={{ pointerEvents: 'none' }}>
                        {idx === 0 && <BookOpen size={16} stroke={activeRoadmapPhase === idx ? '#fff' : 'var(--text-muted)'} />}
                        {idx === 1 && <GraduationCap size={16} stroke={activeRoadmapPhase === idx ? '#fff' : 'var(--text-muted)'} />}
                        {idx === 2 && <Award size={16} stroke={activeRoadmapPhase === idx ? '#fff' : 'var(--text-muted)'} />}
                        {idx === 3 && <Cpu size={16} stroke={activeRoadmapPhase === idx ? '#fff' : 'var(--text-muted)'} />}
                      </g>
                      <text x="0" y="38" textAnchor="middle" fontSize="10">
                        Phase {idx + 1}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>

              {/* Node Details Description Panel */}
              <div className="node-details-panel">
                <span className="badge badge-secondary" style={{ marginBottom: '0.5rem' }}>
                  {selectedCareer.roadmap[activeRoadmapPhase].title}
                </span>
                <p style={{ fontWeight: '500', fontSize: '0.98rem', marginBottom: '0.75rem', color: 'var(--text-heading)' }}>
                  {selectedCareer.roadmap[activeRoadmapPhase].description}
                </p>
                <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  Milestones &amp; Action Items
                </h4>
                <ul>
                  {selectedCareer.roadmap[activeRoadmapPhase].items.map((item, idx) => (
                    <li key={idx}>
                      <CheckCircle size={16} style={{ marginTop: '2px' }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button
                  onClick={() => {
                    handleClick();
                    setSelectedInterviewCareer(selectedCareer);
                    setActiveTab('interview');
                  }}
                  className="btn btn-secondary"
                >
                  Go to Mock Interview
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: MOCK INTERVIEW COACH */}
          {activeTab === 'interview' && (
            <div className="glass-panel interview-container">
              {!interviewStarted && (
                <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                  <MessageSquare size={48} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
                  <h2>AI Interview Coach Simulator</h2>
                  <p className="muted" style={{ maxWidth: '520px', margin: '0.5rem auto 1.5rem' }}>
                    Practice standard interviews for your matched path. Get instant, constructive critiques, keyword matches, and a professional score scorecard.
                  </p>
                  
                  <div className="form-group" style={{ maxWidth: '320px', margin: '0 auto 1.5rem' }}>
                    <label style={{ textAlign: 'center' }}>Choose Interview Role</label>
                    <select
                      className="form-input"
                      value={selectedInterviewCareer.id}
                      onChange={(e) => {
                        handleClick();
                        const match = careers.find((c) => c.id === e.target.value);
                        if (match) setSelectedInterviewCareer(match);
                      }}
                      style={{ textAlignLast: 'center' }}
                    >
                      {careers.map((c) => (
                        <option key={c.id} value={c.id}>{c.title}</option>
                      ))}
                    </select>
                  </div>

                  <button onClick={() => handleStartInterview(selectedInterviewCareer)} className="btn btn-primary">
                    Start Mock Interview
                  </button>
                </div>
              )}

              {interviewStarted && !interviewFinished && (
                <>
                  {/* Interviewer Speech Bubbles */}
                  <div className="interviewer-booth">
                    <div className="interviewer-avatar">
                      A
                      {isAnalyzing && <div className="avatar-ping" />}
                    </div>
                    <div className="interviewer-bubble">
                      <h4>Aura (AI Interview Coach)</h4>
                      <p>
                        "{selectedInterviewCareer.interviewQuestions[currentQuestionIdx].question}"
                      </p>
                    </div>
                    {!isAnalyzing && (
                      <div className="waveform">
                        <div className="wave-bar" style={{ height: '8px' }} />
                        <div className="wave-bar" style={{ height: '14px' }} />
                        <div className="wave-bar" style={{ height: '22px' }} />
                        <div className="wave-bar" style={{ height: '12px' }} />
                        <div className="wave-bar" style={{ height: '6px' }} />
                      </div>
                    )}
                  </div>

                  {/* Input and actions */}
                  {!critique && !isAnalyzing && (
                    <div className="answer-box">
                      <textarea
                        className="answer-textarea"
                        placeholder="Type your response here... Include specific tools, metrics, or experiences (aim for at least 2-3 sentences)."
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        id="txt-interview-answer"
                      />
                      <div className="answer-actions">
                        <span className="muted" style={{ fontSize: '0.8rem' }}>
                          Word Count: {userAnswer.trim() ? userAnswer.trim().split(/\s+/).length : 0}
                        </span>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button onClick={handleResetInterview} className="btn btn-secondary">
                            Quit
                          </button>
                          <button
                            onClick={handleEvaluateAnswer}
                            className="btn btn-primary"
                            disabled={!userAnswer.trim()}
                          >
                            Submit Answer <ArrowRight size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Loading / Analysing Overlay */}
                  {isAnalyzing && (
                    <div className="analyzing-indicator animate-fade-in">
                      <div className="loader-bar" />
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        Aura is reviewing vocabulary choice and assessing concept fits...
                      </p>
                    </div>
                  )}

                  {/* Feedback Report Dashboard */}
                  {critique && (
                    <div className="critique-card">
                      <div className="critique-score-row">
                        <div>
                          <h4 style={{ fontSize: '1.1rem' }}>Answer Analysis Score</h4>
                          <p className="muted" style={{ fontSize: '0.8rem' }}>Question {currentQuestionIdx + 1} of {selectedInterviewCareer.interviewQuestions.length}</p>
                        </div>
                        <div className="score-badge">{critique.score}%</div>
                      </div>

                      <div className="critique-block">
                        <h5><Brain size={14} /> Coach Feedback</h5>
                        <p>
                          {displayedFeedback || critique.feedback}
                          {displayedFeedback.length < critique.feedback.length && (
                            <span className="typing-cursor" style={{ marginLeft: '4px', fontWeight: 'bold', color: 'var(--primary)', animation: 'pulseCursor 0.8s infinite' }}>|</span>
                          )}
                        </p>
                      </div>

                      <div className="critique-block">
                        <h5><Check size={14} /> structural Concept Alignment</h5>
                        <p className="muted" style={{ fontSize: '0.8rem', marginBottom: '0.4rem' }}>
                          We scanned your answer for matching domain parameters:
                        </p>
                        <div className="ideal-match-checklist">
                          {critique.matchedConcepts.map((concept, idx) => (
                            <span key={idx} className="ideal-pill matched">
                              <CheckCircle size={10} /> {concept}
                            </span>
                          ))}
                          {critique.unmatchedConcepts.map((concept, idx) => (
                            <span key={idx} className="ideal-pill unmatched">
                              <AlertCircle size={10} /> {concept}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {/* Sample Ideal Modal Drawer trigger */}
                        <details style={{ width: '60%', textAlign: 'left' }}>
                          <summary style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--secondary)', cursor: 'pointer' }}>
                            Show Aura's Ideal Response Model
                          </summary>
                          <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', background: 'var(--code-bg)', padding: '0.75rem', borderRadius: '8px', borderLeft: '3px solid var(--secondary)' }}>
                            "{selectedInterviewCareer.interviewQuestions[currentQuestionIdx].sampleBest}"
                          </p>
                        </details>

                        <button onClick={handleNextInterviewQuestion} className="btn btn-primary">
                          {currentQuestionIdx < selectedInterviewCareer.interviewQuestions.length - 1 ? 'Next Question' : 'Finish Interview'}
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* End of Interview Summary View */}
              {interviewFinished && (
                <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                  <Award size={48} style={{ color: 'var(--success)', marginBottom: '1rem' }} />
                  <h2>Interview Simulation Completed!</h2>
                  <p className="muted" style={{ maxWidth: '420px', margin: '0.5rem auto 1.5rem' }}>
                    Congratulations on completing your mock interview for **{selectedInterviewCareer.title}**!
                  </p>

                  <div className="glass-panel" style={{ padding: '1.25rem', maxWidth: '440px', margin: '0 auto 1.5rem', background: 'var(--success-bg)', borderColor: 'var(--success-border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span style={{ fontWeight: '600', color: 'var(--text-heading)' }}>Average Score</span>
                      <span style={{ fontSize: '1.45rem', fontWeight: '800', color: 'var(--success)' }}>
                        {Math.round(
                          interviewHistory.reduce((sum, h) => sum + h.score, 0) / interviewHistory.length
                        )}%
                      </span>
                    </div>
                    <p style={{ fontSize: '0.82rem', textAlign: 'left' }}>
                      This score indicates great baseline preparation. To maximize your potential, ensure your resume contains active metric bullet points!
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                    <button onClick={handleResetInterview} className="btn btn-secondary">
                      Try Another Role
                    </button>
                    <button onClick={() => { handleClick(); setActiveTab('resume'); }} className="btn btn-primary">
                      Upgrade Resume Bullet Points
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: RESUME ENHANCER */}
          {activeTab === 'resume' && (
            <div className="glass-panel">
              <div style={{ marginBottom: '1.5rem' }}>
                <h2>Gen Z Resume Enhancer</h2>
                <p className="muted">
                  High schoolers have valuable experiences that are often undersold. Paste your job title and responsibilities to generate action-packed, metrics-oriented bullets tailored for AI roles.
                </p>
              </div>

              <div className="resume-builder-grid">
                {/* Left: Input Form */}
                <div className="input-form-panel">
                  <div style={{ textAlign: 'left', marginBottom: '0.5rem' }}>
                    <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                      Load a High School Preset:
                    </h4>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {resumePresets.map((preset, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleLoadPreset(preset)}
                          className="btn btn-secondary"
                          style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', borderRadius: '8px' }}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="input-role">Job Title / Extracurricular Role</label>
                    <input
                      type="text"
                      id="input-role"
                      className="form-input"
                      placeholder="e.g., Volunteer, Math Club Member, Cashier"
                      value={resumeRole}
                      onChange={(e) => setResumeRole(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="input-description">Describe What You Did</label>
                    <textarea
                      id="input-description"
                      className="answer-textarea"
                      placeholder="e.g., I helped set up chairs, talked to parents, and gathered some donation cash for autism projects."
                      value={resumeRaw}
                      onChange={(e) => setResumeRaw(e.target.value)}
                      style={{ minHeight: '130px' }}
                    />
                  </div>

                  <button
                    onClick={handleEnhanceResume}
                    className="btn btn-primary"
                    disabled={!resumeRole.trim() || !resumeRaw.trim() || isEnhancing}
                    style={{ width: '100%' }}
                  >
                    {isEnhancing ? (
                      <>
                        <div className="loader-bar" style={{ width: '40px' }} /> Enhancing...
                      </>
                    ) : (
                      <>
                        Enhance with AI <Sparkles size={16} />
                      </>
                    )}
                  </button>
                </div>

                {/* Right: Before / After Panels */}
                <div className="compare-container">
                  {resumeEnhanced ? (
                    <>
                      <div className="version-card before">
                        <h4><AlertCircle size={14} /> Student's Original Phrasing</h4>
                        <p style={{ fontWeight: '500', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                          Role: {resumeRole}
                        </p>
                        <p>"{resumeRaw}"</p>
                      </div>

                      <div className="version-card after">
                        <h4><CheckCircle size={14} /> AI-Enhanced Professional Phrasing</h4>
                        <p style={{ fontWeight: '600', color: 'var(--text-heading)', marginBottom: '0.25rem' }}>
                          Target Bullet Point:
                        </p>
                        <p>"{resumeEnhanced}"</p>
                      </div>

                      <div className="info-card">
                        <h4 style={{ color: 'var(--success)' }}><Award size={14} /> Why this works</h4>
                        <p style={{ fontSize: '0.82rem' }}>
                          We swapped generic verbs (like "helped") for strong action verbs ("Coordinated", "Architected"), highlighted soft skills, added structured metrics ($2,500+ or 35%), and aligned vocabulary with the hackathon's Tracks!
                        </p>
                      </div>
                    </>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '260px', border: '2px dashed var(--border)', borderRadius: '16px', padding: '2rem', textAlign: 'center' }}>
                      <FileText size={32} style={{ color: 'var(--text-muted)', marginBottom: '0.75rem' }} />
                      <h4>Awaiting Input</h4>
                      <p className="muted" style={{ fontSize: '0.85rem', maxWidth: '280px' }}>
                        Fill out the details on the left or select a template to see how AI transforms student resumes.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Footer Branding and links */}
      <footer className="app-footer">
        <div>
          &copy; {new Date().getFullYear()} Horizon AI. Created by <a href="https://jayden.lumesystems.co.za/" target="_blank" rel="noopener noreferrer">Jayden Maans</a> for the <a href="https://youthcodexai.netlify.app" target="_blank" rel="noopener noreferrer">Youth Code x AI Hackathon</a>.
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href="https://www.youthcodefoundation.org" target="_blank" rel="noopener noreferrer">Youth Code Foundation</a>
          <span>&middot;</span>
          <a href="https://www.akhilautismfoundation.org" target="_blank" rel="noopener noreferrer">Akhil Autism Foundation</a>
        </div>
      </footer>
    </>
  );
}

export default App;
