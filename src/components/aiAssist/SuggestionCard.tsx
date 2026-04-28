import React, { useState, useRef } from 'react';
import {
  Copy, Volume2, CheckCircle, Edit3, ThumbsUp, ThumbsDown,
  AlertTriangle, ChevronDown, ChevronUp,
} from 'lucide-react';
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from '@exotel-npm-dev/signal-design-system';
import { ConfidenceBadge } from '../ui/ConfidenceBadge';
import { SourceChip } from '../ui/SourceChip';
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

  const handleThumbsUp = () => {
    if (confirmTimerRef.current) clearTimeout(confirmTimerRef.current);
    setFeedback({ vote: feedback.vote === 'up' ? null : 'up' });
    setPickerOpen(false);
    setConfirmVisible(false);
  };

  const handleThumbsDown = () => {
    if (feedback.vote === 'down') {
      if (feedback.reason) return;
      setFeedback({ vote: null });
      setPickerOpen(false);
      return;
    }
    setFeedback({ ...feedback, vote: 'down' });
    setPickerOpen(true);
  };

  const handlePickerSubmit = (reason: FeedbackReason, comment?: string) => {
    setFeedback({ vote: 'down', reason, comment, submittedAt: Date.now() });
    setPickerOpen(false);
    setConfirmVisible(true);
    if (confirmTimerRef.current) clearTimeout(confirmTimerRef.current);
    confirmTimerRef.current = setTimeout(() => setConfirmVisible(false), 2000);
  };

  const handlePickerCancel = () => {
    setPickerOpen(false);
    if (!feedback.reason) {
      setFeedback({ vote: null });
    }
  };

  const handleEdit = () => setPickerOpen(true);

  const handleCopy = () => {
    navigator.clipboard.writeText(suggestion.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleInsert = () => onInsert?.(suggestion.text);
  const handleEditInsert = () => onInsert?.('[Edit] ' + suggestion.text);

  const hasCommittedReason = feedback.vote === 'down' && !!feedback.reason;
  const showReasonLabel = hasCommittedReason && !pickerOpen && !confirmVisible;

  return (
    <Card
      variant="outlined"
      sx={{
        overflow: 'hidden',
        ...(suggestion.confidence === 'Low' ? { borderLeft: 4, borderLeftColor: 'warning.main' } : {}),
      }}
    >
      {suggestion.confidence === 'Low' && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1.5, borderBottom: 1, borderColor: 'divider', bgcolor: 'warning.light', opacity: 0.95 }}>
          <AlertTriangle size={16} />
          <Typography variant="caption" fontWeight={600} color="warning.main">
            Low confidence — verify before sending
          </Typography>
        </Box>
      )}

      <CardContent sx={{ py: 2, '&:last-child': { pb: 2 } }}>
        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 1.5 }}>
          <ConfidenceBadge confidence={suggestion.confidence} />
          <SourceChip source={suggestion.source} />
        </Stack>

        <Typography variant="body2" color="text.primary" sx={{ lineHeight: 1.5 }}>
          {displayText}
        </Typography>
        {isLong && (
          <Button size="small" onClick={() => setTextExpanded(e => !e)} sx={{ mt: 1, p: 0, minWidth: 0, textTransform: 'none' }}>
            {textExpanded ? (
              <Stack direction="row" spacing={0.25} alignItems="center" component="span">
                <ChevronUp size={14} /> Show less
              </Stack>
            ) : (
              <Stack direction="row" spacing={0.25} alignItems="center" component="span">
                <ChevronDown size={14} /> Show more
              </Stack>
            )}
          </Button>
        )}

        <Stack direction="row" flexWrap="wrap" spacing={1} alignItems="center" sx={{ mt: 2 }}>
          {mode === 'chat' && (
            <>
              <Button variant="contained" size="small" onClick={handleInsert}>
                <Stack direction="row" spacing={0.5} alignItems="center" component="span">
                  <CheckCircle size={14} /> Use reply
                </Stack>
              </Button>
              <Button variant="outlined" size="small" onClick={handleEditInsert}>
                <Stack direction="row" spacing={0.5} alignItems="center" component="span">
                  <Edit3 size={14} /> Edit & use
                </Stack>
              </Button>
            </>
          )}
          <Button variant="outlined" size="small" onClick={handleCopy}>
            <Stack direction="row" spacing={0.5} alignItems="center" component="span" sx={{ color: copied ? 'success.main' : 'text.primary' }}>
              {copied ? <CheckCircle size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
              {copied ? 'Copied' : 'Copy'}
            </Stack>
          </Button>
          {mode === 'voice' && (
            <Button variant="outlined" size="small" type="button">
              <Stack direction="row" spacing={0.5} alignItems="center" component="span">
                <Volume2 size={14} /> Read aloud
              </Stack>
            </Button>
          )}

          <Box sx={{ flex: 1 }} />

          {confirmVisible && (
            <Typography variant="caption" color="success.main" fontWeight={600} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <CheckCircle size={14} /> Feedback sent
            </Typography>
          )}

          {showReasonLabel && (
            <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {REASON_LABELS[feedback.reason!]}
              <Button size="small" onClick={handleEdit} sx={{ minWidth: 0, p: 0, ml: 0.5, textTransform: 'none' }}>
                Edit
              </Button>
            </Typography>
          )}

          <IconButton size="small" onClick={handleThumbsUp} color={feedback.vote === 'up' ? 'success' : 'default'} aria-label="Helpful">
            <ThumbsUp size={16} />
          </IconButton>
          <IconButton size="small" onClick={handleThumbsDown} color={feedback.vote === 'down' ? 'error' : 'default'} aria-label="Not helpful">
            <ThumbsDown size={16} />
          </IconButton>
        </Stack>
      </CardContent>

      <Box
        sx={{
          maxHeight: pickerOpen ? 500 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.2s ease-out',
        }}
      >
        <FeedbackReasonPicker
          initialReason={feedback.reason}
          initialComment={feedback.comment}
          onSubmit={handlePickerSubmit}
          onCancel={handlePickerCancel}
        />
      </Box>
    </Card>
  );
}
