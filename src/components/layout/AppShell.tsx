import React, { useState, useCallback } from 'react';
import { Alert, Box, ExotelThemeProvider, Snackbar } from '@exotel-npm-dev/signal-design-system';
import { InboxSidebar } from './InboxSidebar';
import { ModeToggle } from './ModeToggle';
import { VoiceInteraction } from '../interaction/VoiceInteraction';
import { ChatInteraction } from '../interaction/ChatInteraction';
import { AIAssistContainer } from '../aiAssist/AIAssistContainer';
import { useMode } from '../../hooks/useMode';
import { useCallTimer } from '../../hooks/useCallTimer';
import { useInteractionState } from '../../hooks/useInteractionState';

export function AppShell() {
  const { mode, setMode } = useMode('voice');
  const callDuration = useCallTimer();
  const { interactionState, endInteraction, resumeInteraction } = useInteractionState();
  const [insertText, setInsertText] = useState<string | undefined>();
  const [toast, setToast] = useState<string | null>(null);

  const handleInsert = useCallback((text: string) => {
    if (mode === 'chat') {
      setInsertText(text);
    } else {
      navigator.clipboard.writeText(text).catch(() => {});
      setToast('Copied to clipboard');
    }
  }, [mode]);

  const handleSave = useCallback(() => {
    setToast('Disposition saved successfully');
  }, []);

  const handleModeChange = useCallback((newMode: typeof mode) => {
    setMode(newMode);
    resumeInteraction();
  }, [setMode, resumeInteraction]);

  return (
    <ExotelThemeProvider defaultMode="light">
      <Box sx={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', overflow: 'hidden', bgcolor: 'grey.100', color: 'text.primary' }}>
        <Box
          component="header"
          sx={{
            height: 56,
            flexShrink: 0,
            px: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 0 }}>
            <Box component="span" sx={{ fontWeight: 600, fontSize: '0.875rem', typography: 'body2' }}>
              Exotel Assist
            </Box>
            <Box
              component="span"
              sx={{
                display: { xs: 'none', sm: 'inline' },
                fontSize: '0.75rem',
                color: 'text.secondary',
                borderLeft: 1,
                borderColor: 'divider',
                pl: 2,
              }}
            >
              Agent workspace
            </Box>
          </Box>
          <ModeToggle mode={mode} onChange={handleModeChange} />
        </Box>

        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            display: 'grid',
            gridTemplateColumns: { xs: '200px minmax(0, 1fr) min(360px, 32vw)', lg: '220px minmax(0, 1fr) 400px' },
            gap: 2,
            p: 2,
          }}
        >
          <Box component="aside" sx={{ minWidth: 0, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            <Box
              sx={{
                flex: 1,
                minHeight: 0,
                borderRadius: 1,
                border: 1,
                borderColor: 'divider',
                bgcolor: 'grey.50',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              <InboxSidebar />
            </Box>
          </Box>

          <Box component="main" sx={{ minWidth: 0, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            <Box
              sx={{
                flex: 1,
                minHeight: 0,
                borderRadius: 1,
                border: 1,
                borderColor: 'divider',
                bgcolor: 'background.paper',
                boxShadow: 1,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  px: 2,
                  py: 1.5,
                  borderBottom: 1,
                  borderColor: 'divider',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 2,
                  flexShrink: 0,
                }}
              >
                <Box sx={{ minWidth: 0 }}>
                  <Box component="h1" sx={{ m: 0, fontSize: '0.875rem', fontWeight: 600, typography: 'subtitle2' }}>
                    {mode === 'voice' ? 'Rajesh Kumar — Live call' : 'Ananya Sharma — WhatsApp'}
                  </Box>
                  <Box sx={{ fontSize: '0.75rem', color: 'text.secondary', mt: 0.5 }}>
                    {mode === 'voice' ? 'Cards & Payments queue' : 'Refund inquiry · Order #ORD-29341'}
                  </Box>
                </Box>
                {mode === 'voice' && interactionState === 'active' && (
                  <Box
                    component="span"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 1,
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      color: 'text.secondary',
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      border: 1,
                      borderColor: 'divider',
                      bgcolor: 'grey.50',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    <Box component="span" sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'error.main' }} />
                    {callDuration}
                  </Box>
                )}
              </Box>

              <Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', bgcolor: 'grey.50' }}>
                {mode === 'voice' ? (
                  <VoiceInteraction
                    callDuration={callDuration}
                    onEndCall={endInteraction}
                    interactionState={interactionState}
                    onStartInteraction={resumeInteraction}
                  />
                ) : (
                  <ChatInteraction
                    insertText={insertText}
                    onClearInsert={() => setInsertText(undefined)}
                    onResolve={endInteraction}
                    interactionState={interactionState}
                    onStartInteraction={resumeInteraction}
                  />
                )}
              </Box>
            </Box>
          </Box>

          <Box component="aside" sx={{ minWidth: 0, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            <Box
              sx={{
                flex: 1,
                minHeight: 0,
                borderRadius: 1,
                border: 1,
                borderColor: 'divider',
                bgcolor: 'background.paper',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              <AIAssistContainer
                mode={mode}
                callDuration={callDuration}
                interactionState={interactionState}
                onInsert={handleInsert}
                onSaveDisposition={handleSave}
              />
            </Box>
          </Box>
        </Box>

        <Snackbar
          open={!!toast}
          autoHideDuration={3000}
          onClose={() => setToast(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={() => setToast(null)} severity="success" variant="filled" sx={{ width: '100%' }}>
            {toast}
          </Alert>
        </Snackbar>
      </Box>
    </ExotelThemeProvider>
  );
}
