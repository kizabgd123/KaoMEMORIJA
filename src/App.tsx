/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Bot, 
  BrainCircuit, 
  CheckCircle2, 
  CircleDashed, 
  Cpu, 
  Database,
  FileSearch,
  LayoutDashboard, 
  Loader2,
  MessageSquare,
  Play,
  RotateCw,
  Server,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Global Memory Types
interface GlobalMemory {
  taskId: string;
  goal: string;
  priority: 'High' | 'Medium' | 'Low' | 'N/A';
  currentState: string;
  completed: string[];
  pending: string[];
  openQuestions: string[];
  completionCriteria: string[];
  lastCheck: string;
  nextAction: string;
}

// Simulated Orchestrator states
export default function App() {
  const [taskInput, setTaskInput] = useState('');
  const [taskPriority, setTaskPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  
  const [memory, setMemory] = useState<GlobalMemory>({
    taskId: 'TASK-001',
    goal: 'N/A',
    priority: 'N/A',
    currentState: 'Idle',
    completed: [],
    pending: [],
    openQuestions: [],
    completionCriteria: [],
    lastCheck: 'Nikada',
    nextAction: 'Čekanje na unos',
  });

  const [output, setOutput] = useState<{ short: string; details: string; next: string } | null>(null);
  const [logs, setLogs] = useState<{ id: number; source: string; message: string; time: string }[]>([]);

  const addLog = (source: string, message: string) => {
    setLogs(prev => [...prev, {
      id: Date.now(),
      source,
      message,
      time: new Date().toLocaleTimeString()
    }]);
  };

  const handleStartWorkflow = () => {
    if (!taskInput) return;
    
    setIsRunning(true);
    setLogs([]);
    setOutput(null);
    setCurrentStep(1);

    const isContentReview = /proveri|kvalitet|konzist|review/i.test(taskInput);

    // Initialize Memory
    setMemory(prev => ({
      ...prev,
      goal: taskInput,
      priority: taskPriority,
      currentState: 'Analiza zadatka',
      pending: isContentReview 
        ? ['Razumevanje zadatka', 'Deep Review Dokumenta', 'Završna verifikacija dokumenta']
        : ['Razumevanje zadatka', 'Delegiranje', 'Mistral MCP provera', 'Završna verifikacija dokumenta'],
      completionCriteria: isContentReview
        ? ['Struktura proverena', 'Ton osiguran', 'Nema nelogičnosti u tekstu']
        : ['Svi podaci analizirani', 'Nema otvorenih pitanja', 'Dokument formatiran pravilno'],
      nextAction: 'Učitavanje zadatka',
      lastCheck: new Date().toLocaleTimeString()
    }));

    addLog('Orkestrator', `Inicijalizacija zadatka: ${taskInput}`);

    // Simulation of the orchestrator loop
    setTimeout(() => {
      setCurrentStep(2);
      setMemory(prev => ({
        ...prev,
        currentState: isContentReview ? 'Poziv subagenta: ContentReviewer' : 'Poziv subagenta',
        completed: [...prev.completed, 'Razumevanje zadatka'],
        pending: prev.pending.filter(p => p !== 'Razumevanje zadatka'),
        nextAction: isContentReview ? 'Sprovođenje review-a' : 'Generisanje nacrta (Gemini Subagent)'
      }));
      
      if (isContentReview) {
        addLog('ContentReviewer', 'Preuzimam sadržaj. Izvršavam Deep Review tona i konzistentnosti.');
      } else {
        addLog('Gemini Subagent', 'Analiza završena. Kreiran radni nacrt baziran na zadatku.');
      }
    }, 2000);

    setTimeout(() => {
      setCurrentStep(3);
      if (isContentReview) {
        setMemory(prev => ({
          ...prev,
          currentState: 'Izveštaj ContentReviewer-a',
          completed: [...prev.completed, 'Deep Review Dokumenta'],
          pending: prev.pending.filter(p => p !== 'Deep Review Dokumenta'),
          nextAction: 'Ažuriranje dokumenta na osnovu feedback-a'
        }));
        addLog('ContentReviewer', 'Pronađene 2 sitne stilske nedoslednosti. Struktura korigovana. Nema otvorenih pitanja.');
      } else {
        setMemory(prev => ({
          ...prev,
          currentState: 'MCP Mistral Integracija',
          completed: [...prev.completed, 'Delegiranje'],
          pending: prev.pending.filter(p => p !== 'Delegiranje'),
          nextAction: 'Slanje stanja na MCP Mistral'
        }));
        addLog('Mistral MCP', 'Pomoćni izvršni agent je obradio delegirani deo strukture. Nema logičkih rupa.');
      }
    }, 4500);

    setTimeout(() => {
      setCurrentStep(4);
      setMemory(prev => ({
        ...prev,
        currentState: 'Loop Provera',
        completed: isContentReview 
          ? [...prev.completed] 
          : [...prev.completed, 'Mistral MCP provera'],
        pending: prev.pending.filter(p => p !== 'Mistral MCP provera'),
        nextAction: 'Provera protiv kriterijuma gotovosti'
      }));
      addLog('Loop Provera', 'Završna verifikacija. Poređenje sa kriterijumima... Svi kriterijumi ispunjeni.');
    }, 6500);

    setTimeout(() => {
      setIsRunning(false);
      setCurrentStep(5);
      setMemory(prev => ({
        ...prev,
        currentState: 'Završeno',
        completed: [...prev.completed, 'Završna verifikacija dokumenta'],
        pending: [],
        nextAction: 'Prikaz rezultata',
        lastCheck: new Date().toLocaleTimeString()
      }));
      addLog('Orkestrator', 'Zadatak uspešno završen.');
      
      if (isContentReview) {
        setOutput({
          short: `Dokument je prošao Deep Review od strane ContentReviewer subagenta.`,
          details: 'U toku provere identifikovane su i otklonjene nezgrapne rečenice. Ton je usklađen sa zadatim stilom.',
          next: 'Dokument je spreman za isporuku.'
        });
      } else {
        setOutput({
          short: `Zadatak "${taskInput.slice(0, 30)}..." je uspešno obrađen i verifikovan.`,
          details: 'Orkestrator je inicializovao zadatak, Subagent je pripremio osnovni tekst, a Mistral ga je izvršio i proverio logiku pomoću MCP konekcije. Dokument je prošao 3 faze loop-a i zadovoljava sve kriterijume.',
          next: 'Spremno za preuzimanje dokumenta ili unos novog zadatka.'
        });
      }
    }, 8500);
  };

  const logSourceColor = (source: string) => {
    switch(source) {
      case 'Orkestrator': return 'text-purple-400';
      case 'Gemini Subagent': return 'text-blue-400';
      case 'ContentReviewer': return 'text-pink-400';
      case 'Mistral MCP': return 'text-orange-400';
      case 'Loop Provera': return 'text-green-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-slate-200 font-sans selection:bg-purple-500/30">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0F1012]">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <BrainCircuit className="text-white size-5" />
            </div>
            <div>
              <h1 className="font-semibold text-white tracking-tight leading-tight">AI Workflow Orchestrator</h1>
              <p className="text-xs text-slate-400">Mistral MCP & Gemini Subagents</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/50 border border-white/5">
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isRunning ? 'bg-purple-400' : 'bg-green-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isRunning ? 'bg-purple-500' : 'bg-green-500'}`}></span>
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {isRunning ? 'Izvršavanje petlje...' : 'Sistem u pripravnosti'}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start">
        
        {/* Left Column: Input && Logs */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Task Input */}
          <div className="bg-[#141517] border border-white/5 rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
              <Play className="size-5 text-purple-400" />
              Novi Zadatak
            </h2>
            <div className="flex gap-4">
              <input 
                type="text" 
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                placeholder="Unesite zadatak za orkestrator (npr. Analiziraj podatke i napiši tehnički dokument)..."
                className="flex-1 bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                disabled={isRunning}
              />
              <select
                value={taskPriority}
                onChange={(e) => setTaskPriority(e.target.value as any)}
                disabled={isRunning}
                className="bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all cursor-pointer"
              >
                <option value="High">Visok (High)</option>
                <option value="Medium">Srednji (Medium)</option>
                <option value="Low">Nizak (Low)</option>
              </select>
              <button 
                onClick={handleStartWorkflow}
                disabled={isRunning || !taskInput}
                className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:hover:bg-purple-600 text-white px-6 py-3 rounded-xl font-medium text-sm transition-colors flex items-center gap-2"
              >
                {isRunning ? (
                  <><Loader2 className="size-4 animate-spin" /> Izvršavanje</>
                ) : (
                  <><Cpu className="size-4" /> Pokreni Workflow</>
                )}
              </button>
            </div>
          </div>

          {/* Workflow View */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Action Log */}
            <div className="bg-[#141517] border border-white/5 rounded-2xl p-6 shadow-xl flex flex-col h-[400px]">
              <h2 className="text-sm font-medium text-slate-300 mb-4 flex items-center gap-2 border-b border-white/5 pb-3">
                <LayoutDashboard className="size-4 text-blue-400" />
                Live Execution Logs
              </h2>
              <div className="flex-1 overflow-y-auto pr-2 space-y-3 font-mono text-xs">
                <AnimatePresence>
                  {logs.length === 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-slate-600 flex flex-col items-center justify-center h-full gap-2">
                       <MessageSquare className="size-6 mb-2 opacity-50" />
                       <p>Nema aktivnih logova.</p>
                       <p>Unesite zadatak da započnete sekvencu.</p>
                    </motion.div>
                  )}
                  {logs.map((log) => (
                    <motion.div 
                      key={log.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-[#0A0A0B] border border-white/5 rounded-lg p-3"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className={`font-semibold ${logSourceColor(log.source)}`}>[{log.source}]</span>
                        <span className="text-slate-600">{log.time}</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed">{log.message}</p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Structured Output Box */}
            <div className="bg-[#141517] border border-white/5 rounded-2xl p-6 shadow-xl flex flex-col h-[400px]">
               <h2 className="text-sm font-medium text-slate-300 mb-4 flex items-center gap-2 border-b border-white/5 pb-3">
                <FileSearch className="size-4 text-green-400" />
                Finalni Dokument (Pravilo 1,2,3)
              </h2>
              <div className="flex-1 overflow-y-auto">
                {output ? (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-xs font-semibold text-purple-400 tracking-wider uppercase">1) Kratak odgovor</h3>
                      <p className="text-sm bg-[#0A0A0B] p-3 rounded-lg border border-white/5">{output.short}</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xs font-semibold text-blue-400 tracking-wider uppercase">2) Detalji izvršenja</h3>
                      <p className="text-sm bg-[#0A0A0B] p-3 rounded-lg border border-white/5 leading-relaxed text-slate-300">{output.details}</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xs font-semibold text-orange-400 tracking-wider uppercase">3) Sledeći koraci</h3>
                      <p className="text-sm bg-[#0A0A0B] p-3 rounded-lg border border-white/5">{output.next}</p>
                    </div>
                  </motion.div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-600 text-sm">
                    <Database className="size-10 mb-4 opacity-20" />
                    <p>Izlazni dokument će se pojaviti</p>
                    <p>tek nakon uspešne Loop verifikacije.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Global Memory */}
        <div className="lg:col-span-4 bg-[#141517] border border-purple-500/20 rounded-2xl shadow-xl overflow-hidden flex flex-col h-full max-h-[800px]">
          <div className="p-5 border-b border-white/5 bg-purple-500/5 flex items-center gap-2">
            <Server className="size-5 text-purple-400" />
            <h2 className="font-medium text-white">Globalna Memorija</h2>
            <div className="ml-auto flex items-center gap-1.5 px-2 py-1 bg-black/40 rounded border border-white/5">
              <RotateCw className={`size-3 text-slate-400 ${isRunning ? 'animate-spin' : ''}`} />
              <span className="text-[10px] text-slate-400 font-mono">{memory.lastCheck}</span>
            </div>
          </div>
          
          <div className="p-5 overflow-y-auto flex-1 space-y-6">
            
            {/* Status & Goal */}
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1 block">ID Zadatka</label>
                <div className="font-mono text-sm text-purple-400">{memory.taskId}</div>
              </div>
              <div>
                <label className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1 block">Cilj</label>
                <div className="text-sm bg-black/40 border border-white/5 rounded-lg p-3 text-slate-300">
                  {memory.goal}
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1 block">Prioritet</label>
                <div className={`text-sm py-1.5 px-3 inline-block rounded-lg font-medium border ${
                  memory.priority === 'High' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                  memory.priority === 'Medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 
                  memory.priority === 'Low' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                  'bg-slate-500/10 text-slate-400 border-slate-500/20'
                }`}>
                  {memory.priority}
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1 block">Trenutno Stanje</label>
                <div className="flex items-center gap-2 text-sm text-blue-400 font-medium bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                  {isRunning && <Loader2 className="size-4 animate-spin" />}
                  {memory.currentState}
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-3 block mt-2">Tok Izvršenja</label>
                <div className="relative mx-3">
                   {/* Background line */}
                   <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-800 rounded-full"></div>
                   {/* Active line */}
                   <div 
                     className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500 ease-in-out shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                     style={{ width: currentStep === 0 ? '0%' : `${((currentStep - 1) / 4) * 100}%` }}
                   ></div>
                   
                   {/* Steps */}
                   <div className="relative z-10 flex justify-between items-center">
                     {[
                       { step: 1, label: 'Init' },
                       { step: 2, label: 'Agent' },
                       { step: 3, label: 'Obrada' },
                       { step: 4, label: 'Loop' },
                       { step: 5, label: 'Kraj' }
                     ].map(({step, label}) => {
                       const isPast = currentStep >= step;
                       const isCurrent = currentStep === step;
                       return (
                         <div key={step} className="flex flex-col items-center focus:outline-none">
                           <div 
                             className={`flex items-center justify-center size-6 rounded-full border-2 transition-all duration-300 relative z-10 ${
                               isPast 
                                 ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]' 
                                 : 'bg-[#141517] border-slate-700'
                             } ${isCurrent ? 'ring-4 ring-blue-500/30 scale-110' : ''}`}
                           >
                             {isPast && currentStep > step ? (
                               <CheckCircle2 className="size-3.5 text-white" />
                             ) : (
                               <span className={`text-[10px] font-bold ${isPast ? 'text-white' : 'text-slate-500'}`}>{step}</span>
                             )}
                           </div>
                           <span className={`absolute -bottom-5 text-[9px] font-medium transition-colors whitespace-nowrap ${
                               isCurrent ? 'text-blue-400' : isPast ? 'text-slate-300' : 'text-slate-600'
                             }`}>
                             {label}
                           </span>
                         </div>
                       )
                     })}
                   </div>
                </div>
                <div className="h-5"></div> {/* Spacer for absolute labels */}
              </div>
            </div>

            <hr className="border-white/5" />

            {/* Arrays */}
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-2 flex items-center gap-1">
                  <CheckCircle2 className="size-3.5 text-green-500" /> Završeno
                </label>
                {memory.completed.length === 0 ? <p className="text-xs text-slate-600">- Prazno</p> : (
                  <ul className="space-y-1.5">
                    {memory.completed.map((item, idx) => (
                      <li key={idx} className="text-sm text-slate-300 flex items-center gap-2">
                        <span className="size-1 rounded-full bg-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              
              <div>
                <label className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-2 flex items-center gap-1">
                  <CircleDashed className="size-3.5 text-orange-500" /> Nije Završeno (Pending)
                </label>
                {memory.pending.length === 0 ? <p className="text-xs text-slate-600">- Prazno</p> : (
                  <ul className="space-y-1.5">
                    {memory.pending.map((item, idx) => (
                      <li key={idx} className="text-sm text-slate-400 flex items-center gap-2">
                        <span className="size-1 rounded-full bg-orange-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <label className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Settings className="size-3.5 text-blue-500" /> Kriterijumi Gotovosti
                </label>
                {memory.completionCriteria.length === 0 ? <p className="text-xs text-slate-600">- Nisu definisani</p> : (
                  <ul className="space-y-2">
                    {memory.completionCriteria.map((item, idx) => {
                      const isDone = !isRunning && output;
                      return (
                        <li key={idx} className={`text-xs p-2 rounded border flex items-start gap-2 ${isDone ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-slate-800/50 border-white/5 text-slate-400'}`}>
                          {isDone ? <CheckCircle2 className="size-3 shrink-0 mt-0.5" /> : <CircleDashed className="size-3 shrink-0 mt-0.5" />}
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>

            <hr className="border-white/5" />

            <div>
              <label className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1 block">Otvorena Pitanja</label>
              {memory.openQuestions.length === 0 ? (
                <div className="text-sm bg-black/40 border border-white/5 rounded-lg p-3 text-slate-500 italic">
                  Nema otvorenih pitanja.
                </div>
              ) : (
                <ul className="space-y-1 list-disc list-inside text-sm text-orange-300">
                  {memory.openQuestions.map((q, i) => <li key={i}>{q}</li>)}
                </ul>
              )}
            </div>

            <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
              <label className="text-[10px] text-purple-400 font-medium uppercase tracking-wider mb-1 block">Sledeća Akcija (Pravilo: Loop)</label>
              <div className="text-sm font-medium text-white">{memory.nextAction}</div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}
