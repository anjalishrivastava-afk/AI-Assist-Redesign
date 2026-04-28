import React from 'react';
import { Stack, ToggleButton, ToggleButtonGroup, Typography } from '@exotel-npm-dev/signal-design-system';
import type { Mode } from '../../hooks/useMode';

interface ModeToggleProps {
  mode: Mode;
  onChange: (mode: Mode) => void;
}

export function ModeToggle({ mode, onChange }: ModeToggleProps) {
  return (
    <Stack direction="row" alignItems="center" spacing={1.5}>
      <Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'none', sm: 'inline' } }}>
        Sample
      </Typography>
      <ToggleButtonGroup
        exclusive
        size="small"
        value={mode}
        onChange={(_, v: Mode | null) => v && onChange(v)}
        aria-label="Interaction type"
      >
        <ToggleButton value="voice" sx={{ px: 1.5, py: 0.5, textTransform: 'none', typography: 'caption', fontWeight: 600 }}>
          Voice
        </ToggleButton>
        <ToggleButton value="chat" sx={{ px: 1.5, py: 0.5, textTransform: 'none', typography: 'caption', fontWeight: 600 }}>
          Chat
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
}
