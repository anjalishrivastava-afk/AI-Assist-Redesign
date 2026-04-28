import React, { useState, useId } from 'react';
import type { SelectChangeEvent } from '@mui/material/Select';
import { ClipboardText, ArrowsLeftRight, CheckSquare } from '@phosphor-icons/react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@exotel-npm-dev/signal-design-system';
import { CollapsibleSection } from '../ui/CollapsibleSection';
import { dispositionData, chatDispositionData } from '../../mocks/disposition';
import type { Mode } from '../../hooks/useMode';

interface AutoDispositionProps {
  mode: Mode;
  isActive: boolean;
  onSave: () => void;
}

function ReasonSelect({
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
  const id = useId();
  const labelId = `${id}-label`;

  return (
    <FormControl fullWidth size="small" margin="dense">
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        label={label}
        value={value}
        onChange={(e: SelectChangeEvent<string>) => onChange(e.target.value)}
      >
        {options.map(opt => (
          <MenuItem key={opt.value} value={opt.value}>
            <ListItemText primary={opt.label} secondary={opt.aiReasoning} primaryTypographyProps={{ variant: 'body2' }} secondaryTypographyProps={{ variant: 'caption' }} />
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{confidenceText}</FormHelperText>
    </FormControl>
  );
}

export function AutoDisposition({ mode, isActive, onSave }: AutoDispositionProps) {
  const data = mode === 'voice' ? dispositionData : chatDispositionData;
  const [disposition, setDisposition] = useState(data.disposition);
  const [subDisposition, setSubDisposition] = useState(data.subDisposition);
  const [notes, setNotes] = useState(data.notes);

  const maxNotes = 1000;

  const statusLabel = isActive ? (
    <Typography variant="caption" color="text.secondary" fontWeight={600}>
      Drafting…
    </Typography>
  ) : (
    <Typography variant="caption" color="success.main" fontWeight={600}>
      Ready
    </Typography>
  );

  return (
    <CollapsibleSection
      title={
        <Stack direction="row" spacing={1} alignItems="center">
          <ClipboardText size={16} aria-hidden />
          <Typography component="span" variant="subtitle2">
            Disposition
          </Typography>
        </Stack>
      }
      headerRight={statusLabel}
      detailsSx={{ px: 2, pb: 2, pt: 1 }}
    >
      <Stack spacing={2}>
        <ReasonSelect
          label="Disposition"
          value={disposition}
          options={data.dispositionOptions}
          onChange={setDisposition}
          confidenceText="Medium"
        />

        <ReasonSelect
          label="Sub-disposition"
          value={subDisposition}
          options={data.subDispositionOptions}
          onChange={setSubDisposition}
          confidenceText="High"
        />

        <TextField
          fullWidth
          multiline
          minRows={4}
          label="Notes"
          value={notes}
          onChange={e => setNotes(e.target.value.slice(0, maxNotes))}
          placeholder="Summary notes…"
          variant="outlined"
          size="small"
          helperText={
            <Box component="span" sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Typography component="span" variant="caption" color="text.secondary">
                Review before save
              </Typography>
              <Typography component="span" variant="caption" color="text.secondary" sx={{ fontVariantNumeric: 'tabular-nums' }}>
                {notes.length}/{maxNotes}
              </Typography>
            </Box>
          }
          FormHelperTextProps={{ component: 'div' }}
        />

        <Stack spacing={1} sx={{ pt: 1 }}>
          {mode === 'voice' ? (
            <>
              <Button variant="contained" fullWidth onClick={onSave}>
                <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="center" component="span">
                  <CheckSquare size={16} aria-hidden />
                  Save disposition
                </Stack>
              </Button>
              <Button variant="outlined" fullWidth onClick={onSave}>
                <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="center" component="span">
                  <ArrowsLeftRight size={16} aria-hidden />
                  Dispose and dial next
                </Stack>
              </Button>
            </>
          ) : (
            <Button variant="contained" fullWidth onClick={onSave}>
              <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="center" component="span">
                <CheckSquare size={16} aria-hidden />
                Resolve and tag
              </Stack>
            </Button>
          )}
        </Stack>
      </Stack>
    </CollapsibleSection>
  );
}
