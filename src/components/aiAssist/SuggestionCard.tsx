import React, { useState, useRef } from 'react';
import {
  Copy, Volume2, CheckCircle, Edit3, ThumbsUp, ThumbsDown,
  AlertTriangle, ChevronDown, ChevronUp,
} from 'lucide-react';
import { ConfidenceBadge } from '../ui/ConfidenceBadge';
import { SourceChip } from '../ui/SourceChip';
import { Button } from '../ui/Button';
import { FeedbackReasonPicker } from './feedback/FeedbackReasonPicker';
import { useFeedback } from '../../hooks/useFeedback';
import type { FeedbackReason } from '../../hooks/useFeedback';
import type { Suggestion } from '../../mocks/suggestions';
import type { Mode } from '../../hooks/useMode';

const REASON_LABELS: Record<FeedbackReason, string> = {
  'inaccurate': 'Inaccurate',
  'off-topic': 'Off-topic',
  'language-mismatch': 'Language mismatch',
  'other': 'Other',
};

interface SuggestionCardProps {
  suggestion: Suggestion;
  mode: Mode;
  onInsert?: (text: string) => void;
}

export function SuggestionCard({ suggestion, mode, onInsert }: SuggestionCardProps) {
  const { feedback, setFeedback } = useFeedback();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [textExpanded, setTextExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const confirmTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isLong = suggestion.text.length > 120;
  const displayText = textExpanded || !isLong ? suggestion.text : suggestion.text.slice(0, 120) + '…';

  // ── Feedback button handlers ──────────────────────────────────────────────

  const handleThumbsUp = () => {
    // Clear any pending confirm timer
    if (confirmTimerRef.current) clearTimeout(confirmTimerRef.current);
    // 👍 always clears reason and closes picker
    setFeedback({ vote: feedback.vote === 'up' ? null : 'up' });
    setPickerOpen(false);
    setConfirmVisible(false);
  };

  const handleThumbsDown = () => {
    if (feedback.vote === 'down') {
      if (feedback.reason) {
        // Already has a committed reason — 👎 is a no-op; use Edit link
        return;
      }
      // Picker open, no reason committed yet → toggle off
      setFeedback({ vote: null });
      setPickerOpen(false);
      return;
    }
    // Switch to down, open picker
    setFeedback({ ...feedback, vote: 'down' });
    setPickerOpen(true);
  };

  // ── Picker callbacks ──────────────────────────────────────────────────────

  const handlePickerSubmit = (reason: FeedbackReason, comment?: string) => {
    setFeedback({ vote: 'down', reason, comment, submittedAt: Date.now() });
    setPickerOpen(false);
    setConfirmVisible(true);
    if (confirmTimerRef.current) clearTimeout(confirmTimerRef.current);
    confirmTimerRef.current = setTimeout(() => setConfirmVisible(false), 2000);
  };

  const handlePickerCancel = () => {
    setPickerOpen(false);
    // Only revert vote if no reason was ever committed
    if (!feedback.reason) {
      setFeedback({ vote: null });
    }
  };

  const handleEdit = () => setPickerOpen(true);

  // ── Utility handlers ──────────────────────────────────────────────────────

  const handleCopy = () => {
    navigator.clipboard.writeText(suggestion.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleInsert = () => onInsert?.(suggestion.text);
  const handleEditInsert = () => onInsert?.('[Edit] ' + suggestion.text);

  // ── Derived display states ────────────────────────────────────────────────
  const hasCommittedReason = feedback.vote === 'down' && !!feedback.reason;
  const showReasonLabel = hasCommittedReason && !pickerOpen && !confirmVisible;

  return (
    <div
      className={`rounded-lg border bg-white transition-shadow hover:shadow-sm overflow-hidden ${
        suggestion.confidence === 'Low' ? 'border-amber-200' : 'border-gray-200'
      }`}
    >
      {/* Low confidence warning */}
      {suggestion.confidence === 'Low' && (
        <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border-b border-amber-200">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span className="text-xs text-amber-700 font-medium">Low confidence — verify before using</span>
        </div>
      )}

      <div className="p-3">
        {/* Top row: confidence + source */}
        <div className="flex items-center gap-2 flex-wrap mb-2">
          <ConfidenceBadge confidence={suggestion.confidence} />
          <SourceChip source={suggestion.source} />
        </div>

        {/* Suggestion text */}
        <p className="text-xs text-gray-700 leading-relaxed mb-1">{displayText}</p>
        {isLong && (
          <button
            onClick={() => setTextExpanded(e => !e)}
            className="text-xs text-purple-600 hover:text-purple-700 flex items-center gap-0.5 mb-2"
          >
            {textExpanded
              ? <><ChevronUp className="w-3 h-3" />Show less</>
              : <><ChevronDown className="w-3 h-3" />Show more</>}
          </button>
        )}

        {/* Action row */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {mode === 'chat' && (
            <>
              <Button size="xs" variant="primary" onClick={handleInsert}>
                <CheckCircle className="w-3 h-3" /> Use
              </Button>
              <Button size="xs" variant="secondary" onClick={handleEditInsert}>
                <Edit3 className="w-3 h-3" /> Edit & Use
              </Button>
            </>
          )}
          <Button size="xs" variant="ghost" onClick={handleCopy}>
            {copied ? <CheckCircle className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
            {copied ? 'Copied' : 'Copy'}
          </Button>
          {mode === 'voice' && (
            <Button size="xs" variant="ghost">
              <Volume2 className="w-3 h-3" /> Read
            </Button>
          )}

          {/* Thumbs */}
          <div className="ml-auto flex items-center gap-1">
            {/* ✓ Confirmation badge */}
            {confirmVisible && (
              <span className="text-[10px] text-green-600 font-medium flex items-center gap-1 mr-1 animate-fadeIn">
                <CheckCircle className="w-3 h-3" />
                Thanks — feedback sent
              </span>
            )}

            {/* Committed reason label + Edit link */}
            {showReasonLabel && (
              <span className="text-[10px] text-gray-500 flex items-center gap-1 mr-1">
                <CheckCircle className="w-3 h-3 text-green-500" />
                {REASON_LABELS[feedback.reason!]}
                <button
                  onClick={handleEdit}
                  className="text-purple-600 hover:text-purple-700 underline ml-0.5"
                >
                  Edit
                </button>
              </span>
            )}

            <button
              onClick={handleThumbsUp}
              className={`p-1 rounded transition-colors ${
                feedback.vote === 'up'
                  ? 'text-green-600 bg-green-50'
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              }`}
              title="Good suggestion"
            >
              <ThumbsUp className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleThumbsDown}
              className={`p-1 rounded transition-colors ${
                feedback.vote === 'down'
                  ? 'text-red-500 bg-red-50'
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              }`}
              title={feedback.vote === 'down' && feedback.reason ? 'Feedback committed' : 'Not helpful'}
            >
              <ThumbsDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Reason picker — smooth max-height expand below the card body */}
      <div
        style={{
          maxHeight: pickerOpen ? '500px' : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.22s ease-out',
        }}
      >
        {/* Keep mounted so the textarea persists during close animation */}
        <FeedbackReasonPicker
          initialReason={feedback.reason}
          initialComment={feedback.comment}
          onSubmit={handlePickerSubmit}
          onCancel={handlePickerCancel}
        />
      </div>
    </div>
  );
}
