import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@exotel-npm-dev/signal-design-system';
import { AutoDisposition } from './AutoDisposition';
import { LiveWorkspace } from './LiveWorkspace';
import type { Mode } from '../../hooks/useMode';
import type { TranscriptTurn } from '../../mocks/voiceTranscript';

interface AssistTabbedPanelProps {
  mode: Mode;
  voiceTurns: TranscriptTurn[];
  latestVoiceId?: string;
  onInsert?: (text: string) => void;
  onSaveDisposition: () => void;
}

export function AssistTabbedPanel({
  mode,
  voiceTurns,
  latestVoiceId,
  onInsert,
  onSaveDisposition,
}: AssistTabbedPanelProps) {
  const [tab, setTab] = useState(0);

  const handleTabsChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Stack sx={{ height: '100%', minHeight: 0, bgcolor: 'background.default' }}>
      {tab === 0 && (
        <Box sx={{ px: 2, pt: 2, pb: 1, flexShrink: 0 }}>
          <Card variant="outlined">
            <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
              <Typography variant="subtitle2" component="div" gutterBottom>
                AI Suggestion
              </Typography>
              <Typography variant="body2" color="text.secondary">
                It seems you&apos;re referring to the refund timeline for order #ORD-29341. Acknowledge the delay and
                share the next SLA step.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      )}

      <Tabs
        value={tab}
        onChange={handleTabsChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          px: 1,
          minHeight: 44,
          borderBottom: 1,
          borderColor: 'divider',
          flexShrink: 0,
          '& .MuiTab-root': { minHeight: 44, textTransform: 'none', fontWeight: 500 },
        }}
      >
        <Tab label="Suggestions" />
        <Tab label="Transcript" />
        <Tab label="Disposition" />
      </Tabs>

      <Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        {(tab === 0 || tab === 1) && (
          <LiveWorkspace
            mode={mode}
            voiceTurns={voiceTurns}
            latestVoiceId={latestVoiceId}
            onInsert={onInsert}
            feedFilter={tab === 1 ? 'transcript' : 'full'}
            hideAskAI={tab === 1}
          />
        )}
        {tab === 2 && (
          <Box sx={{ flex: 1, minHeight: 0, overflow: 'auto', bgcolor: 'grey.50' }}>
            <AutoDisposition mode={mode} isActive onSave={onSaveDisposition} />
          </Box>
        )}
      </Box>
    </Stack>
  );
}
