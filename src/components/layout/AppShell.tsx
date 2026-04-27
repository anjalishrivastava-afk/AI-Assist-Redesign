import React, { useState, useCallback } from 'react';
import { Sparkles, RotateCcw } from 'lucide-react';
import { InboxSidebar } from './InboxSidebar';
import { ModeToggle } from './ModeToggle';
import { VoiceInteraction } from '../interaction/VoiceInteraction';
import { ChatInteraction } from '../interaction/ChatInteraction';
import { AIAssistContainer } from '../aiAssist/AIAssistContainer';
import { useMode } from '../../hooks/useMode';
import { useCallTimer } from '../../hooks/useCallTimer';
import { useInteractionState } from '../../hooks/useInteractionState';

interface ToastProps {
  message: string;
  onDone: () => void;
}

function Toast({ message, onDone }: ToastProps) {
  React.useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white text-sm px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 animate-slideUp">
      <span className="text-green-400">✓</span>
      {message}
    </div>
  );
}

export function AppShell() {
  const { mode, setMode } = useMode('voice');
  const callDuration = useCallTimer();
  const { interactionState, endInteraction, resumeInteraction } = useInteractionState();
  const [insertText, setInsertText] = useState<string | undefined>();
  const [toast, setToast] = useState<string | null>(null);

  const handleInsert = useCallback((text: string) => {
    if (mode === 'chat') {
      setInsertText(text);
    } else {
      navigator.clipboard.writeText(text).catch(() => {});
      setToast('Copied to clipboard');
    }
  }, [mode]);

  const handleSave = useCallback(() => {
    setToast('Disposition saved successfully');
  }, []);

  const handleModeChange = useCallback((newMode: typeof mode) => {
    setMode(newMode);
    resumeInteraction();
  }, [setMode, resumeInteraction]);

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-100 overflow-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Top bar */}
      <header className="h-12 bg-white border-b border-gray-200 flex items-center justify-between px-5 shrink-0 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-bold text-gray-900 tracking-tight">ExoAssist</span>
          <span className="text-xs text-gray-400 ml-2">Unified Support Widget</span>
        </div>
        <ModeToggle mode={mode} onChange={handleModeChange} />
      </header>

      {/* Main 3-column layout */}
      <div className="flex-1 flex min-h-0">
        {/* Left rail */}
        <div className="w-60 shrink-0">
          <InboxSidebar />
        </div>

        {/* Center column */}
        <div className="flex-1 flex flex-col min-w-0 border-x border-gray-200 bg-white">
          <div className="px-5 py-3 border-b border-gray-200 bg-white flex items-center justify-between shrink-0">
            <div>
              <h2 className="text-sm font-semibold text-gray-800">
                {mode === 'voice' ? 'Rajesh Kumar — Live Call' : 'Ananya Sharma — WhatsApp'}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {mode === 'voice' ? 'Cards & Payments queue' : 'Refund inquiry · Order #ORD-29341'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {interactionState === 'ended' && (
                <button
                  onClick={resumeInteraction}
                  className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 font-medium border border-gray-200 px-2.5 py-1 rounded-lg hover:bg-gray-50 transition-colors"
                  title="Demo only — resumes conversation for re-testing"
                >
                  <RotateCcw className="w-3 h-3" />
                  Resume <span className="text-gray-400">(Demo only)</span>
                </button>
              )}
              {mode === 'voice' && interactionState === 'active' && (
                <span className="flex items-center gap-1.5 text-xs font-semibold text-red-600 bg-red-50 px-2.5 py-1 rounded-full border border-red-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  {callDuration}
                </span>
              )}
            </div>
          </div>

          {mode === 'voice'
            ? <VoiceInteraction callDuration={callDuration} onEndCall={endInteraction} />
            : <ChatInteraction
                insertText={insertText}
                onClearInsert={() => setInsertText(undefined)}
                onResolve={endInteraction}
              />
          }
        </div>

        {/* Right rail — AI Assist */}
        <div className="w-[420px] shrink-0">
          <AIAssistContainer
            mode={mode}
            callDuration={callDuration}
            interactionState={interactionState}
            onInsert={handleInsert}
            onSaveDisposition={handleSave}
          />
        </div>
      </div>

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  );
}
