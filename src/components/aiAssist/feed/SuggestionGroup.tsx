import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  Box,
  Button,
  Card,
  Stack,
  Typography,
} from '@exotel-npm-dev/signal-design-system';
import { SuggestionCard } from '../SuggestionCard';
import { suggestionsById } from '../../../mocks/suggestions';
import type { Mode } from '../../../hooks/useMode';

interface SuggestionGroupProps {
  suggestionIds: string[];
  mode: Mode;
  onInsert?: (text: string) => void;
}

export function SuggestionGroup({ suggestionIds, mode, onInsert }: SuggestionGroupProps) {
  const [collapsed, setCollapsed] = useState(false);
  const validSuggestions = suggestionIds
    .map(id => suggestionsById[id])
    .filter(Boolean);

  if (!validSuggestions.length) return null;

  return (
    <Box sx={{ ml: 2, pl: 2, borderLeft: 2, borderColor: 'divider' }}>
      <Card variant="outlined" sx={{ overflow: 'hidden' }}>
        <Button
          fullWidth
          onClick={() => setCollapsed(c => !c)}
          color="inherit"
          sx={{
            justifyContent: 'space-between',
            px: 2,
            py: 1.5,
            borderRadius: 0,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.75rem',
            color: 'text.secondary',
          }}
        >
          <Typography variant="caption" fontWeight={600} color="text.secondary">
            Suggested replies ({validSuggestions.length})
          </Typography>
          {collapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </Button>

        {!collapsed && (
          <Stack spacing={1.5} sx={{ px: 2, pb: 2, borderTop: 1, borderColor: 'divider' }}>
            {validSuggestions.map(s => (
              <SuggestionCard key={s.id} suggestion={s} mode={mode} onInsert={onInsert} />
            ))}
          </Stack>
        )}
      </Card>
    </Box>
  );
}
