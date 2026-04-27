import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { FeedbackReason } from '../../../hooks/useFeedback';

const REASONS: Array<{ id: FeedbackReason; label: string; description: string }> = [
  { id: 'inaccurate', label: 'Inaccurate', description: 'Wrong information or facts' },
  { id: 'off-topic', label: 'Off-topic', description: "Doesn't fit what the customer is asking" },
  { id: 'language-mismatch', label: 'Language mismatch', description: 'Wrong language or tone for this customer' },
  { id: 'other', label: 'Other', description: 'Something else (please specify)' },
];

interface FeedbackReasonPickerProps {
  initialReason?: FeedbackReason;
  initialComment?: string;
  onSubmit: (reason: FeedbackReason, comment?: string) => void;
  onCancel: () => void;
}

export function FeedbackReasonPicker({
  initialReason,
  initialComment = '',
  onSubmit,
  onCancel,
}: FeedbackReasonPickerProps) {
  const [selected, setSelected] = useState<FeedbackReason | null>(initialReason ?? null);
  const [comment, setComment] = useState(initialComment);
  const MAX_COMMENT = 200;

  const handleChipClick = (id: FeedbackReason) => {
    if (id === 'other') {
      setSelected('other');
      return;
    }
    // Immediate submit for non-Other reasons
    onSubmit(id);
  };

  const handleOtherSubmit = () => {
    if (comment.trim()) {
      onSubmit('other', comment.trim());
    }
  };

  return (
    <div className="bg-red-50 border-t border-red-100 rounded-b-lg">
      <div className="px-3 pt-2.5 pb-1 flex items-center justify-between">
        <span className="text-xs font-semibold text-red-700">Why wasn't this helpful?</span>
        <button
          onClick={onCancel}
          className="text-[10px] text-gray-400 hover:text-gray-600 flex items-center gap-0.5 transition-colors"
          title="Close without saving"
        >
          <X className="w-3 h-3" />
          Cancel
        </button>
      </div>

      <div className="px-3 pb-3 space-y-1.5">
        {REASONS.map(reason => {
          const isSelected = selected === reason.id;
          return (
            <button
              key={reason.id}
              onClick={() => handleChipClick(reason.id)}
              className={`w-full text-left px-3 py-2 rounded-lg border transition-colors ${
                isSelected
                  ? 'bg-red-600 border-red-600 text-white'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-red-300 hover:bg-red-50'
              }`}
            >
              <div className="text-xs font-semibold leading-tight">{reason.label}</div>
              <div className={`text-[10px] mt-0.5 leading-tight ${isSelected ? 'text-red-100' : 'text-gray-400'}`}>
                {reason.description}
              </div>
            </button>
          );
        })}

        {/* "Other" textarea — smooth height reveal */}
        <div
          style={{
            maxHeight: selected === 'other' ? '200px' : '0',
            overflow: 'hidden',
            transition: 'max-height 0.2s ease-out',
          }}
        >
          <div className="pt-1 space-y-2">
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value.slice(0, MAX_COMMENT))}
              placeholder="Please tell us more (required)"
              rows={3}
              className="w-full px-3 py-2 text-xs border border-red-200 rounded-lg bg-white resize-none focus:outline-none focus:ring-1 focus:ring-red-300 placeholder:text-gray-400"
            />
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-gray-400">{comment.length}/{MAX_COMMENT}</span>
              <button
                onClick={handleOtherSubmit}
                disabled={!comment.trim()}
                className="px-3 py-1.5 text-xs font-semibold bg-purple-600 hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
