import React from 'react';
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@exotel-npm-dev/signal-design-system';

export interface StickyComposerBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  helperHint?: string;
  /** Optional row above field (e.g. Ask AI + privacy) */
  header?: React.ReactNode;
  submitLabel?: string;
  disabledSubmit?: boolean;
  /** Show attach / emoji icon row */
  showAccessoryIcons?: boolean;
  accessoryIcons?: React.ReactNode;
  multiline?: boolean;
  /** Shown as TextField label when `multiline` is true */
  multilineLabel?: string;
  /** Shown as TextField label for single-line layout */
  fieldLabel?: string;
  /** Accessible name when `fieldLabel` is omitted */
  ariaLabel?: string;
  minRows?: number;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  /** Icon before submit label (primary button) */
  submitStartIcon?: React.ReactNode;
}

/**
 * Sticky-style footer: optional header, TextField, primary Send, optional accessories.
 */
export function StickyComposerBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'Type a message…',
  helperHint,
  header,
  submitLabel = 'Send',
  disabledSubmit,
  showAccessoryIcons,
  accessoryIcons,
  multiline = false,
  multilineLabel,
  fieldLabel,
  ariaLabel,
  minRows = 3,
  onKeyDown,
  submitStartIcon,
}: StickyComposerBarProps) {
  return (
    <Box sx={{ flexShrink: 0, borderTop: 1, borderColor: 'divider', bgcolor: 'background.paper', p: 2 }}>
      <Stack spacing={1.5}>
        {header}
        {multiline ? (
          <TextField
            fullWidth
            multiline
            minRows={minRows}
            label={multilineLabel}
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            variant="outlined"
            size="small"
            onKeyDown={onKeyDown}
            inputProps={{ 'aria-label': ariaLabel ?? multilineLabel ?? placeholder }}
          />
        ) : (
          <Stack direction="row" spacing={1} alignItems="flex-start">
            <TextField
              fullWidth
              size="small"
              label={fieldLabel}
              value={value}
              onChange={e => onChange(e.target.value)}
              placeholder={placeholder}
              variant="outlined"
              onKeyDown={onKeyDown}
              inputProps={{ 'aria-label': ariaLabel ?? fieldLabel ?? placeholder }}
            />
            <Button variant="contained" onClick={onSubmit} disabled={disabledSubmit} startIcon={submitStartIcon} sx={{ flexShrink: 0, minWidth: 96 }}>
              {submitLabel}
            </Button>
          </Stack>
        )}

        {multiline && (
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            {showAccessoryIcons ? (
              <Stack direction="row" spacing={0.5}>
                {accessoryIcons}
              </Stack>
            ) : (
              <Box />
            )}
            <Button variant="contained" onClick={onSubmit} disabled={disabledSubmit} startIcon={submitStartIcon}>
              {submitLabel}
            </Button>
          </Stack>
        )}

        {helperHint ? (
          <Typography variant="caption" color="text.secondary" sx={{ textAlign: multiline ? 'right' : 'right', display: 'block' }}>
            {helperHint}
          </Typography>
        ) : null}
      </Stack>
    </Box>
  );
}
