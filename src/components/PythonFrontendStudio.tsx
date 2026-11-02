import React, { useState } from 'react';
import {
  Code,
  Copy,
  Check,
  Download,
  Play,
  Terminal,
  FileCode,
  PackageCheck,
  ChevronRight,
} from 'lucide-react';
import {
  PYTHON_FRAMEWORKS,
  PYTHON_REQUIREMENTS,
  PYTHON_README,
  PythonFrameworkCode
} from '../data/pythonCodeGenerators';
import { runPythonCode } from '../utils/pyodideRunner';

interface PythonFrontendStudioProps {
  onBackToApp: () => void;
}

export const PythonFrontendStudio: React.FC<PythonFrontendStudioProps> = ({ onBackToApp }) => {
  const [selectedFramework, setSelectedFramework] = useState<PythonFrameworkCode>(PYTHON_FRAMEWORKS[0]);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'code' | 'interactive' | 'requirements'>('code');

  // Interactive Python REPL / Runner State
  const [pythonInput, setPythonInput] = useState<string>(PYTHON_FRAMEWORKS[4].code); // travel_engine.py
  const [pythonOutput, setPythonOutput] = useState<string>(
    '✈️ Click "Run Python Script" below to execute this code live in your browser using Python 3 WebAssembly!'
  );
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExecutePython = async () => {
    setIsRunning(true);
    setPythonOutput('⏳ Initializing in-browser Python 3 environment and running script...');
    try {
      const result = await runPythonCode(pythonInput);
      if (result.error) {
        setPythonOutput(`❌ Python Execution Error:\n${result.error}`);
      } else {
        setPythonOutput(result.stdout || '✅ Script executed with no output.');
      }
    } catch (err: any) {
      setPythonOutput(`❌ Error: ${err?.message || err}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleDownloadAllZip = () => {
    PYTHON_FRAMEWORKS.forEach((fw, idx) => {
      setTimeout(() => {
        handleDownload(fw.filename, fw.code);
      }, idx * 250);
    });
    setTimeout(() => {
      handleDownload('requirements.txt', PYTHON_REQUIREMENTS);
    }, PYTHON_FRAMEWORKS.length * 250);
    setTimeout(() => {
      handleDownload('README.md', PYTHON_README);
    }, (PYTHON_FRAMEWORKS.length + 1) * 250);
  };

  return (
    <div className="min-h-screen bg-[#0B192C] text-[#F0F9FF] pt-24 pb-20 px-4 sm:px-8 font-sans-body">
      <div className="max-w-7xl mx-auto">
        {/* Header Breadcrumb & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#0284C7]/25">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#38BDF8] mb-1">
              <span className="cursor-pointer hover:underline" onClick={onBackToApp}>
                Infinity Travels
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8]" />
              <span className="text-[#94A3B8]">Python Frontend Conversion Studio</span>
            </div>
            <h1 className="font-serif-title text-3xl sm:text-4xl font-black text-[#F0F9FF] flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0284C7] to-[#38BDF8] flex items-center justify-center text-xl shadow-md">
                🐍
              </span>
              Python Frontend Conversion
            </h1>
            <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 font-light">
              Converted implementation of Infinity Travels across the top 5 Python frontend frameworks.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onBackToApp}
              className="px-4 py-2 rounded-xl bg-[#0E243F] hover:bg-[#132E4F] text-[#F0F9FF] border border-[#0284C7]/30 text-xs font-semibold transition"
            >
              ← Back to Live Travel UI
            </button>
            <button
              onClick={handleDownloadAllZip}
              className="px-4 py-2 rounded-xl bg-[#0284C7] hover:bg-[#38BDF8] text-white text-xs font-bold transition shadow-md flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              Download All Python Files
            </button>
          </div>
        </div>

        {/* Framework Selection Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {PYTHON_FRAMEWORKS.map((fw) => {
            const isSelected = selectedFramework.id === fw.id && activeTab === 'code';
            return (
              <button
                key={fw.id}
                onClick={() => {
                  setSelectedFramework(fw);
                  setActiveTab('code');
                }}
                className={`p-3.5 rounded-2xl text-left border transition-all ${
                  isSelected
                    ? 'bg-[#132E4F] border-[#38BDF8] ring-2 ring-[#0284C7]/40 shadow-lg'
                    : 'bg-[#0E243F] border-[#0284C7]/20 hover:border-[#0284C7]/60 text-[#94A3B8]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#38BDF8]">
                    {fw.category}
                  </span>
                  <FileCode className={`w-3.5 h-3.5 ${isSelected ? 'text-[#38BDF8]' : 'text-slate-400'}`} />
                </div>
                <div className={`font-semibold text-xs sm:text-sm leading-tight ${isSelected ? 'text-[#F0F9FF]' : 'text-slate-300'}`}>
                  {fw.name.replace(' Frontend', '')}
                </div>
                <div className="text-[11px] text-slate-400 font-mono mt-1 truncate">
                  {fw.filename}
                </div>
              </button>
            );
          })}
        </div>

        {/* Studio View Navigation: Code Viewer | Live Browser Runner | Requirements */}
        <div className="flex items-center gap-2 mb-6 border-b border-[#0284C7]/20 pb-3">
          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'code'
                ? 'bg-[#0284C7] text-white'
                : 'text-[#94A3B8] hover:text-white bg-[#0E243F]'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            Framework Code: {selectedFramework.name}
          </button>

          <button
            onClick={() => setActiveTab('interactive')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'interactive'
                ? 'bg-[#0284C7] text-white'
                : 'text-[#94A3B8] hover:text-white bg-[#0E243F]'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            Live In-Browser Python Runner (Pyodide WASM)
          </button>

          <button
            onClick={() => setActiveTab('requirements')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'requirements'
                ? 'bg-[#0284C7] text-white'
                : 'text-[#94A3B8] hover:text-white bg-[#0E243F]'
            }`}
          >
            <PackageCheck className="w-3.5 h-3.5" />
            requirements.txt & Setup Guide
          </button>
        </div>

        {/* TAB 1: Selected Python Framework Code */}
        {activeTab === 'code' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Framework Info Banner */}
            <div className="bg-[#0E243F] border border-[#0284C7]/30 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-[#38BDF8]">
                    {selectedFramework.name}
                  </h3>
                  <span className="text-xs bg-[#0B192C] text-[#38BDF8] px-2.5 py-0.5 rounded-full font-semibold border border-[#0284C7]/30">
                    {selectedFramework.filename}
                  </span>
                </div>
                <p className="text-xs text-[#94A3B8] mt-1 max-w-2xl font-light">
                  {selectedFramework.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
                <button
                  onClick={() => handleCopy(selectedFramework.code)}
                  className="px-4 py-2 bg-[#0B192C] hover:bg-[#132E4F] text-[#38BDF8] border border-[#0284C7]/40 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied to Clipboard!' : 'Copy Python Code'}
                </button>

                <button
                  onClick={() => handleDownload(selectedFramework.filename, selectedFramework.code)}
                  className="px-4 py-2 bg-[#0284C7] hover:bg-[#38BDF8] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download {selectedFramework.filename}
                </button>
              </div>
            </div>

            {/* Quick Run Command Callout */}
            <div className="bg-[#0B192C] border border-[#0284C7]/20 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-code text-xs">
              <div className="flex items-center gap-2 text-[#94A3B8]">
                <Terminal className="w-4 h-4 text-[#38BDF8]" />
                <span>How to run on your local machine:</span>
              </div>
              <div className="flex items-center gap-2 bg-[#081321] px-3.5 py-2 rounded-xl border border-white/5 text-[#38BDF8]">
                <code>{selectedFramework.installCommand} && {selectedFramework.runCommand}</code>
                <button
                  onClick={() => handleCopy(`${selectedFramework.installCommand} && ${selectedFramework.runCommand}`)}
                  className="ml-2 text-[#94A3B8] hover:text-white"
                  title="Copy command"
                >
                  <Copy className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Code View with Syntax Display */}
            <div className="bg-[#081321] border border-[#0284C7]/30 rounded-3xl overflow-hidden shadow-2xl">
              <div className="bg-[#0E243F] px-6 py-3 border-b border-[#0284C7]/20 flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs text-[#94A3B8]">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-2 text-[#38BDF8] font-semibold">{selectedFramework.filename}</span>
                </div>
                <div className="text-[11px] text-[#94A3B8] font-mono">
                  Python 3.x • Complete Frontend Code
                </div>
              </div>

              <div className="p-6 overflow-x-auto max-h-[650px] font-code text-xs leading-relaxed text-[#F0F9FF]/90">
                <pre>
                  <code>{selectedFramework.code}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Live In-Browser Python Runner (Pyodide WebAssembly) */}
        {activeTab === 'interactive' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-[#0E243F] border border-[#0284C7]/30 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-[#38BDF8] flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-[#38BDF8]" />
                  Live In-Browser Python Execution Engine
                </h3>
                <p className="text-xs text-[#94A3B8] mt-1 font-light">
                  This Python engine executes client-side directly in your browser using Pyodide (Python 3 compiled to WebAssembly). Test booking quotes, query package catalogues, and verify business logic!
                </p>
              </div>

              <button
                onClick={handleExecutePython}
                disabled={isRunning}
                className={`px-6 py-2.5 rounded-xl font-bold text-xs shadow-lg flex items-center justify-center gap-2 transition ${
                  isRunning
                    ? 'bg-sky-700/50 text-white cursor-wait'
                    : 'bg-[#0284C7] hover:bg-[#38BDF8] text-white'
                }`}
              >
                <Play className="w-4 h-4 fill-current" />
                {isRunning ? 'Executing Python...' : 'Run Python Script'}
              </button>
            </div>

            {/* Quick Test Snippets */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[#94A3B8]">Quick Test Snippets:</span>
              <button
                onClick={() => {
                  setPythonInput(`from travel_engine import engine\n# Filter packages under ₹30,000\nprint("=== BUDGET PACKAGES UNDER ₹30,000 ===")\nfor p in engine.filter_packages(max_budget=30000):\n    print(f"• {p['name']}: ₹{p['price']:,} ({p['days']} days)")`);
                }}
                className="px-2.5 py-1 bg-[#132E4F] hover:bg-[#1A3B66] text-[#38BDF8] border border-[#0284C7]/30 rounded-lg"
              >
                Filter Budget Packages
              </button>
              <button
                onClick={() => {
                  setPythonInput(`from travel_engine import engine\n# Calculate quotation for 4 travelers to Dubai with discount\nquote = engine.calculate_quote("Dubai Desert Glamour", persons=4, promo_code="INFINITY10")\nprint("=== QUOTE CALCULATION ===")\nprint("Package:", quote["package"])\nprint("Subtotal:", f"₹{quote['subtotal']:,}")\nprint("Discount:", f"-₹{quote['discount']:,}")\nprint("Final Amount:", f"₹{quote['final_total']:,}")`);
                }}
                className="px-2.5 py-1 bg-[#132E4F] hover:bg-[#1A3B66] text-[#38BDF8] border border-[#0284C7]/30 rounded-lg"
              >
                Calculate Group Quote
              </button>
              <button
                onClick={() => {
                  setPythonInput(PYTHON_FRAMEWORKS[4].code);
                }}
                className="px-2.5 py-1 bg-[#132E4F] hover:bg-[#1A3B66] text-[#38BDF8] border border-[#0284C7]/30 rounded-lg"
              >
                Reset to Full Engine Code
              </button>
            </div>

            {/* Editor & Console Split */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Python Code Input */}
              <div className="bg-[#081321] border border-[#0284C7]/30 rounded-2xl overflow-hidden flex flex-col">
                <div className="bg-[#0E243F] px-4 py-2.5 border-b border-[#0284C7]/20 flex items-center justify-between text-xs font-mono text-[#94A3B8]">
                  <span>Editable Python Script</span>
                  <span className="text-[#38BDF8]">Python 3.10+</span>
                </div>
                <textarea
                  value={pythonInput}
                  onChange={(e) => setPythonInput(e.target.value)}
                  className="w-full h-[450px] p-4 bg-transparent text-[#F0F9FF] font-code text-xs leading-relaxed focus:outline-none resize-none"
                  spellCheck={false}
                />
              </div>

              {/* Terminal Output */}
              <div className="bg-[#050C16] border border-[#0284C7]/30 rounded-2xl overflow-hidden flex flex-col">
                <div className="bg-[#0B192C] px-4 py-2.5 border-b border-[#0284C7]/20 flex items-center justify-between text-xs font-mono text-[#94A3B8]">
                  <span className="flex items-center gap-1.5 text-sky-400">
                    <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                    Terminal Output (stdout)
                  </span>
                  <button
                    onClick={() => setPythonOutput('')}
                    className="text-[#94A3B8] hover:text-white text-[11px]"
                  >
                    Clear Console
                  </button>
                </div>
                <div className="w-full h-[450px] p-4 font-code text-xs text-sky-300 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                  {pythonOutput}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: requirements.txt & Setup Guide */}
        {activeTab === 'requirements' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* requirements.txt */}
              <div className="bg-[#081321] border border-[#0284C7]/30 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#0284C7]/20">
                  <div className="flex items-center gap-2">
                    <PackageCheck className="w-4 h-4 text-[#38BDF8]" />
                    <h4 className="font-mono text-sm font-bold text-[#38BDF8]">requirements.txt</h4>
                  </div>
                  <button
                    onClick={() => handleDownload('requirements.txt', PYTHON_REQUIREMENTS)}
                    className="px-3 py-1 bg-[#132E4F] hover:bg-[#1A3B66] text-[#38BDF8] border border-[#0284C7]/30 rounded-lg text-xs font-semibold flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </button>
                </div>
                <pre className="font-code text-xs text-[#F0F9FF]/90 leading-relaxed overflow-x-auto">
                  {PYTHON_REQUIREMENTS}
                </pre>
              </div>

              {/* README.md */}
              <div className="bg-[#081321] border border-[#0284C7]/30 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#0284C7]/20">
                  <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-[#38BDF8]" />
                    <h4 className="font-mono text-sm font-bold text-[#38BDF8]">README.md</h4>
                  </div>
                  <button
                    onClick={() => handleDownload('README.md', PYTHON_README)}
                    className="px-3 py-1 bg-[#132E4F] hover:bg-[#1A3B66] text-[#38BDF8] border border-[#0284C7]/30 rounded-lg text-xs font-semibold flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </button>
                </div>
                <pre className="font-code text-xs text-[#94A3B8] leading-relaxed overflow-x-auto whitespace-pre-wrap">
                  {PYTHON_README}
                </pre>
              </div>
            </div>

            {/* Architecture mapping card */}
            <div className="bg-[#0E243F] border border-[#0284C7]/30 rounded-3xl p-6">
              <h4 className="font-serif-title text-lg font-bold text-[#38BDF8] mb-3">
                How the Original HTML/JS was Converted to Python Frontend
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div className="bg-[#081321] p-4 rounded-xl border border-white/5">
                  <span className="text-[#38BDF8] font-bold block mb-1">1. State & Calculations</span>
                  <p className="text-[#94A3B8]">
                    Replaced client-side JS <code className="text-[#38BDF8]">calcTotal()</code> with reactive Python state in Streamlit (<code className="text-[#38BDF8]">st.session_state</code>) and NiceGUI reactive values.
                  </p>
                </div>

                <div className="bg-[#081321] p-4 rounded-xl border border-white/5">
                  <span className="text-[#38BDF8] font-bold block mb-1">2. Dynamic Form & Validation</span>
                  <p className="text-[#94A3B8]">
                    Converted DOM query selectors to native Python form handlers (<code className="text-[#38BDF8]">st.form</code>, <code className="text-[#38BDF8]">ui.input</code>) with typed validation.
                  </p>
                </div>

                <div className="bg-[#081321] p-4 rounded-xl border border-white/5">
                  <span className="text-[#38BDF8] font-bold block mb-1">3. Booking Receipts & IDs</span>
                  <p className="text-[#94A3B8]">
                    Built-in Python string formatting with <code className="text-[#38BDF8]">random.randint</code>, receipt generation, and download buttons.
                  </p>
                </div>

                <div className="bg-[#081321] p-4 rounded-xl border border-white/5">
                  <span className="text-[#38BDF8] font-bold block mb-1">4. Responsive Cards & Modals</span>
                  <p className="text-[#94A3B8]">
                    Custom layout cards in NiceGUI, Flet, Streamlit, and CustomTkinter for cross-platform desktop/web execution.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
