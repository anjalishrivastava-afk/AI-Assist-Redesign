import React, { useState } from 'react';
import { X } from 'lucide-react';
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from '@exotel-npm-dev/signal-design-system';
import type { FeedbackReason } from '../../../hooks/useFeedback';

const REASONS: Array<{ id: FeedbackReason; label: string; description: string }> = [
  { id: 'inaccurate', label: 'Inaccurate', description: 'Wrong information or facts' },
  { id: 'off-topic', label: 'Off-topic', description: "Doesn't match the customer's request" },
  { id: 'language-mismatch', label: 'Language mismatch', description: 'Wrong language or tone' },
  { id: 'other', label: 'Other', description: 'Specify below' },
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
    onSubmit(id);
  };

  const handleOtherSubmit = () => {
    if (comment.trim()) {
      onSubmit('other', comment.trim());
    }
  };

  return (
    <Box sx={{ borderTop: 1, borderColor: 'divider', bgcolor: 'grey.50' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 2, pt: 1.5, pb: 1 }}>
        <Typography variant="caption" fontWeight={600} color="text.secondary">
          Why wasn&apos;t this helpful?
        </Typography>
        <Button size="small" onClick={onCancel} sx={{ minWidth: 0, textTransform: 'none' }} color="inherit">
          <Stack direction="row" spacing={0.5} alignItems="center" component="span">
            <X size={14} /> Cancel
          </Stack>
        </Button>
      </Stack>

      <Stack spacing={1} sx={{ px: 2, pb: 2 }}>
        {REASONS.map(reason => {
          const isSelected = selected === reason.id;
          return (
            <Button
              key={reason.id}
              fullWidth
              variant={isSelected ? 'contained' : 'outlined'}
              onClick={() => handleChipClick(reason.id)}
              sx={{ alignItems: 'stretch', textAlign: 'left', py: 1.25, textTransform: 'none' }}
            >
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" fontWeight={600} display="block">
                  {reason.label}
                </Typography>
                <Typography variant="caption" color={isSelected ? 'inherit' : 'text.secondary'} sx={{ opacity: isSelected ? 0.9 : 1, display: 'block', mt: 0.25 }}>
                  {reason.description}
                </Typography>
              </Box>
            </Button>
          );
        })}

        <Box
          sx={{
            maxHeight: selected === 'other' ? 200 : 0,
            overflow: 'hidden',
            transition: 'max-height 0.2s ease-out',
          }}
        >
          <Stack spacing={1.5} sx={{ pt: 1 }}>
            <TextField
              fullWidth
              multiline
              minRows={3}
              value={comment}
              onChange={e => setComment(e.target.value.slice(0, MAX_COMMENT))}
              placeholder="Add details (required)"
              size="small"
            />
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="caption" color="text.secondary">
                {comment.length}/{MAX_COMMENT}
              </Typography>
              <Button variant="contained" size="small" onClick={handleOtherSubmit} disabled={!comment.trim()}>
                Submit
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
