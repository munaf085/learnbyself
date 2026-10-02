"use client";

import React, { useState } from 'react';
import { Card, Button, Badge } from '@learnbyself/ui';
import {
  Terminal,
  Copy,
  Check,
  Laptop,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  FolderCode,
  ShieldCheck,
  Download,
  ExternalLink
} from 'lucide-react';

export const OsSetupGuide: React.FC = () => {
  const [os, setOs] = useState<'windows' | 'mac'>('windows');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [openTroubleshoot, setOpenTroubleshoot] = useState<number | null>(null);
  const [testOutput, setTestOutput] = useState('');
  const [verifiedState, setVerifiedState] = useState<'idle' | 'success' | 'warning'>('idle');

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleVerify = () => {
    const lower = testOutput.toLowerCase();
    if (lower.includes('javac') && (lower.includes('21') || lower.includes('17') || lower.includes('version'))) {
      setVerifiedState('success');
    } else if (testOutput.trim().length > 0) {
      setVerifiedState('warning');
    } else {
      setVerifiedState('idle');
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. OS Switcher Tabs */}
      <div className="p-1.5 bg-slate-100 rounded-2xl flex items-center max-w-md mx-auto sm:mx-0 shadow-inner">
        <button
          onClick={() => setOs('windows')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            os === 'windows'
              ? 'bg-white text-slate-900 shadow-subtle'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>🪟</span>
          <span>Windows Setup</span>
        </button>

        <button
          onClick={() => setOs('mac')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            os === 'mac'
              ? 'bg-white text-slate-900 shadow-subtle'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>🍎</span>
          <span>macOS Setup</span>
        </button>
      </div>

      {/* 2. Platform Intro Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-brand-50 to-indigo-50 border border-brand-200/80 flex items-start space-x-3.5 shadow-subtle">
        <ShieldCheck className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900">
            Recommended Version: OpenJDK 21 LTS (Long Term Support)
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We recommend **Eclipse Temurin 21** (by Adoptium). It is 100% free, open-source, certified Java SE compliant, and used in production by major global enterprises.
          </p>
        </div>
      </div>

      {/* 3. WINDOWS WALKTHROUGH */}
      {os === 'windows' && (
        <div className="space-y-5 animate-fadeIn">
          {/* Step 1: Install OpenJDK */}
          <Card className="p-5 sm:p-6 space-y-4 border-slate-200 shadow-subtle">
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2.5">
                <span className="w-6 h-6 rounded-full bg-brand-600 text-white font-bold text-xs flex items-center justify-center">
                  1
                </span>
                <h4 className="font-bold text-sm sm:text-base text-slate-900">
                  Install OpenJDK 21 via Terminal or MSI Installer
                </h4>
              </div>
              <Badge variant="blue" size="sm">Recommended</Badge>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              **Option A (Fastest via PowerShell)**: Open PowerShell as Administrator and run the official Windows Package Manager command:
            </p>

            <div className="rounded-xl bg-slate-900 p-3 flex items-center justify-between text-xs font-mono text-emerald-400">
              <span className="truncate mr-2">winget install EclipseAdoptium.Temurin.21.JDK</span>
              <button
                onClick={() => handleCopy('winget install EclipseAdoptium.Temurin.21.JDK', 1)}
                className="text-slate-400 hover:text-white flex items-center space-x-1 cursor-pointer"
                title="Copy command"
              >
                {copiedIndex === 1 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
              **Option B (Manual Installer)**: Download the `.msi` Windows installer directly from the official website:
            </p>
            <a
              href="https://adoptium.net/temurin/releases/?version=21"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 underline"
            >
              <span>Download Eclipse Temurin 21 MSI from Adoptium.net</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </Card>

          {/* Step 2: Configure JAVA_HOME & PATH */}
          <Card className="p-5 sm:p-6 space-y-4 border-slate-200 shadow-subtle">
            <div className="flex items-center space-x-2.5 border-b border-slate-100 pb-3">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white font-bold text-xs flex items-center justify-center">
                2
              </span>
              <h4 className="font-bold text-sm sm:text-base text-slate-900">
                Set JAVA_HOME & System PATH
              </h4>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Setting `JAVA_HOME` ensures build tools (Maven, Gradle, IDEs) can locate your JDK.
            </p>

            <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <div className="flex items-start space-x-2">
                <span className="font-bold text-brand-700">A.</span>
                <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-xs">Win + R</kbd>, type <code className="font-mono text-brand-700 font-bold">sysdm.cpl</code> and press Enter.</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="font-bold text-brand-700">B.</span>
                <span>Go to the **Advanced** tab and click **Environment Variables**.</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="font-bold text-brand-700">C.</span>
                <span>Under **System variables**, click **New...**:</span>
              </div>
              <div className="ml-5 p-2 bg-white rounded border border-slate-200 font-mono text-xs space-y-1">
                <div>Variable name: <strong className="text-slate-900">JAVA_HOME</strong></div>
                <div>Variable value: <strong className="text-slate-900">C:\Program Files\Eclipse Adoptium\jdk-21.0.x-hotspot</strong></div>
              </div>
              <div className="flex items-start space-x-2">
                <span className="font-bold text-brand-700">D.</span>
                <span>Under System variables, select <code className="font-mono font-bold">Path</code>, click **Edit...**, then **New**, and add: <code className="font-mono font-bold text-slate-900">%JAVA_HOME%\bin</code>. Click OK on all windows.</span>
              </div>
            </div>
          </Card>

          {/* Step 3: Verify Installation */}
          <Card className="p-5 sm:p-6 space-y-4 border-slate-200 shadow-subtle">
            <div className="flex items-center space-x-2.5 border-b border-slate-100 pb-3">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                3
              </span>
              <h4 className="font-bold text-sm sm:text-base text-slate-900">
                Verify in Terminal (PowerShell / Command Prompt)
              </h4>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Open a **new** PowerShell window and run these two commands:
            </p>

            <div className="space-y-3">
              <div>
                <span className="text-xs text-slate-500 font-semibold block mb-1">Check the Java Compiler:</span>
                <div className="rounded-xl bg-slate-900 p-3 flex items-center justify-between text-xs font-mono text-emerald-400">
                  <span>javac -version</span>
                  <button
                    onClick={() => handleCopy('javac -version', 2)}
                    className="text-slate-400 hover:text-white"
                  >
                    {copiedIndex === 2 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <span className="text-[11px] text-slate-400 font-mono mt-1 block">Expected output: javac 21.0.x</span>
              </div>

              <div>
                <span className="text-xs text-slate-500 font-semibold block mb-1">Check the Java Runtime (JVM):</span>
                <div className="rounded-xl bg-slate-900 p-3 flex items-center justify-between text-xs font-mono text-emerald-400">
                  <span>java -version</span>
                  <button
                    onClick={() => handleCopy('java -version', 3)}
                    className="text-slate-400 hover:text-white"
                  >
                    {copiedIndex === 3 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <span className="text-[11px] text-slate-400 font-mono mt-1 block">Expected output: openjdk version &quot;21.0.x&quot;</span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* 4. MACOS WALKTHROUGH */}
      {os === 'mac' && (
        <div className="space-y-5 animate-fadeIn">
          {/* Step 1: Install via Homebrew */}
          <Card className="p-5 sm:p-6 space-y-4 border-slate-200 shadow-subtle">
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2.5">
                <span className="w-6 h-6 rounded-full bg-brand-600 text-white font-bold text-xs flex items-center justify-center">
                  1
                </span>
                <h4 className="font-bold text-sm sm:text-base text-slate-900">
                  Install OpenJDK 21 via Homebrew
                </h4>
              </div>
              <Badge variant="blue" size="sm">Recommended</Badge>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Open your macOS Terminal (<kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-xs">Cmd + Space</kbd> → type Terminal) and run:
            </p>

            <div className="rounded-xl bg-slate-900 p-3 flex items-center justify-between text-xs font-mono text-emerald-400">
              <span className="truncate mr-2">brew install openjdk@21</span>
              <button
                onClick={() => handleCopy('brew install openjdk@21', 4)}
                className="text-slate-400 hover:text-white flex items-center space-x-1"
              >
                {copiedIndex === 4 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            <p className="text-xs text-slate-500">
              *If you do not have Homebrew, you can also download the macOS `.pkg` installer from <a href="https://adoptium.net/temurin/releases/?version=21" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline">adoptium.net</a>.*
            </p>
          </Card>

          {/* Step 2: Add to PATH in ~/.zshrc */}
          <Card className="p-5 sm:p-6 space-y-4 border-slate-200 shadow-subtle">
            <div className="flex items-center space-x-2.5 border-b border-slate-100 pb-3">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white font-bold text-xs flex items-center justify-center">
                2
              </span>
              <h4 className="font-bold text-sm sm:text-base text-slate-900">
                Add OpenJDK to your macOS PATH
              </h4>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              macOS modern shells (zsh) require linking the Homebrew openjdk binary. Run these two commands in Terminal:
            </p>

            <div className="space-y-2">
              <div className="rounded-xl bg-slate-900 p-3 flex items-center justify-between text-xs font-mono text-emerald-400">
                <span className="truncate mr-2">echo &#39;export PATH=&quot;/opt/homebrew/opt/openjdk@21/bin:$PATH&quot;&#39; &gt;&gt; ~/.zshrc</span>
                <button
                  onClick={() => handleCopy('echo \'export PATH="/opt/homebrew/opt/openjdk@21/bin:$PATH"\' >> ~/.zshrc', 5)}
                  className="text-slate-400 hover:text-white"
                >
                  {copiedIndex === 5 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="rounded-xl bg-slate-900 p-3 flex items-center justify-between text-xs font-mono text-emerald-400">
                <span className="truncate mr-2">source ~/.zshrc</span>
                <button
                  onClick={() => handleCopy('source ~/.zshrc', 6)}
                  className="text-slate-400 hover:text-white"
                >
                  {copiedIndex === 6 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </Card>

          {/* Step 3: Verify in Terminal */}
          <Card className="p-5 sm:p-6 space-y-4 border-slate-200 shadow-subtle">
            <div className="flex items-center space-x-2.5 border-b border-slate-100 pb-3">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                3
              </span>
              <h4 className="font-bold text-sm sm:text-base text-slate-900">
                Verify Installation in Terminal
              </h4>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-xs text-slate-500 font-semibold block mb-1">Check javac:</span>
                <div className="rounded-xl bg-slate-900 p-3 flex items-center justify-between text-xs font-mono text-emerald-400">
                  <span>javac -version</span>
                  <button onClick={() => handleCopy('javac -version', 7)} className="text-slate-400 hover:text-white">
                    {copiedIndex === 7 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <span className="text-xs text-slate-500 font-semibold block mb-1">Check java:</span>
                <div className="rounded-xl bg-slate-900 p-3 flex items-center justify-between text-xs font-mono text-emerald-400">
                  <span>java -version</span>
                  <button onClick={() => handleCopy('java -version', 8)} className="text-slate-400 hover:text-white">
                    {copiedIndex === 8 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* 5. Recommended Code Editor Setup (VS Code) */}
      <Card className="p-5 sm:p-6 space-y-4 border-slate-200/90 shadow-subtle">
        <div className="flex items-center space-x-2.5 border-b border-slate-100 pb-3">
          <FolderCode className="w-5 h-5 text-indigo-600" />
          <h4 className="font-bold text-sm sm:text-base text-slate-900">
            Recommended Code Editor: VS Code for Beginners
          </h4>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          While college labs may use heavy tools like Eclipse or NetBeans, modern software engineers prefer lightweight editors like **Visual Studio Code** or **IntelliJ IDEA Community Edition**:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="font-bold text-slate-900">1. Install VS Code</span>
            <p className="text-slate-600 text-xs">Download free from <a href="https://code.visualstudio.com" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline">code.visualstudio.com</a>.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="font-bold text-slate-900">2. Extension Pack for Java</span>
            <p className="text-slate-600 text-xs">Search Extensions (<kbd className="font-mono text-[10px] bg-white border px-1 py-0.5 rounded">Ctrl+Shift+X</kbd>) for `Extension Pack for Java` by Microsoft.</p>
          </div>
        </div>
      </Card>

      {/* 6. Live Environment Verification Helper */}
      <Card className="p-5 sm:p-6 space-y-3.5 border-indigo-100 bg-indigo-50/30 shadow-subtle">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-indigo-600" />
          <h4 className="font-bold text-xs sm:text-sm text-indigo-950">
            Test Your Terminal Output Here
          </h4>
        </div>
        <p className="text-xs text-slate-600">
          Paste the output from your terminal when running <code className="font-mono font-bold text-indigo-700">javac -version</code> to verify:
        </p>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={testOutput}
            onChange={(e) => {
              setTestOutput(e.target.value);
              setVerifiedState('idle');
            }}
            placeholder="e.g. javac 21.0.2"
            className="flex-1 text-xs font-mono bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-500"
          />
          <Button variant="primary" size="sm" onClick={handleVerify} className="font-semibold text-xs min-h-[38px]">
            Verify Output
          </Button>
        </div>

        {verifiedState === 'success' && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Awesome! Your machine has a valid Java compiler installed and ready.</span>
          </div>
        )}

        {verifiedState === 'warning' && (
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 font-medium flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>Make sure the output includes `javac` and version number (e.g., `javac 21.0.2`). Check the troubleshooting steps below if you encountered an error.</span>
          </div>
        )}
      </Card>

      {/* 7. Expandable Troubleshooting Accordion */}
      <div className="space-y-3">
        <h4 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center space-x-1.5">
          <span>🛠️</span>
          <span>Common Installation Troubleshooting</span>
        </h4>

        {/* Issue 1 */}
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
          <button
            onClick={() => setOpenTroubleshoot(openTroubleshoot === 1 ? null : 1)}
            className="w-full text-left p-3.5 flex items-center justify-between text-xs sm:text-sm font-bold text-slate-800 hover:bg-slate-50 transition-colors"
          >
            <span>Issue 1: &apos;javac&apos; is not recognized as an internal or external command (Windows)</span>
            {openTroubleshoot === 1 ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>
          {openTroubleshoot === 1 && (
            <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-700 space-y-2 leading-relaxed">
              <p><strong>Cause:</strong> Your terminal cannot find `javac.exe` because the Java `bin` directory is not listed in your Windows `Path` variable.</p>
              <p><strong>Fix:</strong> Close all terminals. Re-open System Environment Variables, verify `%JAVA_HOME%\bin` is listed in your System Path, and then open a <em>fresh</em> Command Prompt or PowerShell window.</p>
            </div>
          )}
        </div>

        {/* Issue 2 */}
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
          <button
            onClick={() => setOpenTroubleshoot(openTroubleshoot === 2 ? null : 2)}
            className="w-full text-left p-3.5 flex items-center justify-between text-xs sm:text-sm font-bold text-slate-800 hover:bg-slate-50 transition-colors"
          >
            <span>Issue 2: zsh: command not found: javac (macOS)</span>
            {openTroubleshoot === 2 ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>
          {openTroubleshoot === 2 && (
            <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-700 space-y-2 leading-relaxed">
              <p><strong>Cause:</strong> Your shell configuration file (`~/.zshrc`) does not have the Homebrew OpenJDK path exported.</p>
              <p><strong>Fix:</strong> Run <code className="font-mono bg-white px-1.5 py-0.5 rounded border">echo &apos;export PATH=&quot;/opt/homebrew/opt/openjdk@21/bin:$PATH&quot;&apos; &gt;&gt; ~/.zshrc &amp;&amp; source ~/.zshrc</code> in your terminal.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
