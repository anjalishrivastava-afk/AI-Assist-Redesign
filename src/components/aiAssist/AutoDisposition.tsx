import React, { useState } from 'react';
import { ClipboardList, ChevronDown, Sparkles, PhoneForwarded, CheckSquare } from 'lucide-react';
import { CollapsibleSection } from '../ui/CollapsibleSection';
import { Button } from '../ui/Button';
import { dispositionData, chatDispositionData } from '../../mocks/disposition';
import type { Mode } from '../../hooks/useMode';

interface AutoDispositionProps {
  mode: Mode;
  isActive: boolean;
  onSave: () => void;
}

function AIReasoningDropdown({
  label,
  value,
  options,
  onChange,
  confidenceText,
}: {
  label: string;
  value: string;
  options: Array<{ value: string; label: string; aiReasoning?: string }>;
  onChange: (v: string) => void;
  confidenceText: string;
}) {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find(o => o.value === value);

  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-gray-600">{label}</label>
      <div className="relative">
        <button
          onClick={() => setOpen(o => !o)}
          className="w-full flex items-center justify-between px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span>{selectedOption?.label ?? value}</span>
            <span className="text-xs px-1.5 py-0.5 rounded-full bg-purple-50 text-purple-600 font-medium border border-purple-100">
              {confidenceText}
            </span>
          </div>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>

        {open && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
            {options.map(opt => (
              <button
                key={opt.value}
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={`w-full text-left px-3 py-2.5 hover:bg-gray-50 transition-colors ${opt.value === value ? 'bg-purple-50' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{opt.label}</span>
                  {opt.aiReasoning && (
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-purple-400" />
                    </span>
                  )}
                </div>
                {opt.aiReasoning && (
                  <p className="text-xs text-gray-400 mt-0.5">{opt.aiReasoning}</p>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function AutoDisposition({ mode, isActive, onSave }: AutoDispositionProps) {
  const data = mode === 'voice' ? dispositionData : chatDispositionData;
  const [disposition, setDisposition] = useState(data.disposition);
  const [subDisposition, setSubDisposition] = useState(data.subDisposition);
  const [notes, setNotes] = useState(data.notes);

  const maxNotes = 1000;

  const statusLabel = isActive ? (
    <span className="flex items-center gap-1.5 text-xs text-purple-600 font-medium">
      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
      AI is drafting...
    </span>
  ) : (
    <span className="text-xs text-green-600 font-medium">Ready to review</span>
  );

  return (
    <CollapsibleSection
      title={<span className="flex items-center gap-1.5"><ClipboardList className="w-3.5 h-3.5 text-gray-500" /><span>Disposition</span></span>}
      headerRight={statusLabel}
      bodyClassName="px-3 pb-3 pt-2 space-y-3"
    >
      <AIReasoningDropdown
        label="Disposition"
        value={disposition}
        options={data.dispositionOptions}
        onChange={setDisposition}
        confidenceText="Med confidence"
      />

      <AIReasoningDropdown
        label="Sub-disposition"
        value={subDisposition}
        options={data.subDispositionOptions}
        onChange={setSubDisposition}
        confidenceText="High confidence"
      />

      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-gray-600">Call Notes</label>
          <div className="flex items-center gap-1 text-xs text-purple-600">
            <Sparkles className="w-3 h-3" />
            <span>AI-drafted — review before saving</span>
          </div>
        </div>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value.slice(0, maxNotes))}
          rows={4}
          className="w-full px-3 py-2 text-xs text-gray-700 border border-purple-200 rounded-lg bg-purple-50/30 focus:outline-none focus:ring-1 focus:ring-purple-300 resize-none leading-relaxed"
          placeholder="Add call summary..."
        />
        <p className="text-[10px] text-gray-400 text-right">{notes.length}/{maxNotes}</p>
      </div>

      <div className="flex gap-2 pt-1">
        {mode === 'voice' ? (
          <>
            <Button variant="primary" size="md" className="flex-1 justify-center" onClick={onSave}>
              <CheckSquare className="w-4 h-4" />
              Save & Dispose
            </Button>
            <Button variant="secondary" size="md" onClick={onSave}>
              <PhoneForwarded className="w-4 h-4" />
              Dispose & Dial
            </Button>
          </>
        ) : (
          <Button variant="primary" size="md" className="flex-1 justify-center" onClick={onSave}>
            <CheckSquare className="w-4 h-4" />
            Resolve & Tag
          </Button>
        )}
      </div>
    </CollapsibleSection>
  );
}
