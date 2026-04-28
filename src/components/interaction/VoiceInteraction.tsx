import React, { useState } from 'react';
import { Mic, MicOff, Pause, Play, PhoneForwarded, Users, PhoneOff, Phone } from 'lucide-react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from '@exotel-npm-dev/signal-design-system';
import { inboxItems } from '../../mocks/inbox';
import type { InteractionState } from '../../hooks/useInteractionState';

interface VoiceInteractionProps {
  callDuration: string;
  onEndCall: () => void;
  interactionState: InteractionState;
  onStartInteraction: () => void;
}

export function VoiceInteraction({
  callDuration,
  onEndCall,
  interactionState,
  onStartInteraction,
}: VoiceInteractionProps) {
  const [muted, setMuted] = useState(false);
  const [onHold, setOnHold] = useState(false);

  const caller = inboxItems.find(i => i.type === 'voice' && i.isActive)!;
  const isEnded = interactionState === 'ended';

  return (
    <Stack spacing={2} sx={{ flex: 1, minHeight: 0, overflow: 'auto', p: 2 }}>
      <Card variant="outlined" sx={{ maxWidth: 480, width: '100%', mx: 'auto' }}>
        <CardContent>
          <Stack spacing={2} alignItems="center" textAlign="center">
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'common.white',
                fontSize: '1.125rem',
                fontWeight: 600,
                bgcolor: caller.avatarColor,
              }}
            >
              {caller.avatarInitials}
            </Box>
            <Box>
              <Typography variant="subtitle1" fontWeight={600}>
                {caller.customerName}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {caller.phone}
              </Typography>
              <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" sx={{ mt: 1.5 }}>
                <Typography variant="caption" sx={{ px: 1, py: 0.5, borderRadius: 1, border: 1, borderColor: 'divider', bgcolor: 'grey.50' }}>
                  {caller.queue}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontVariantNumeric: 'tabular-nums', fontWeight: 500 }}>
                  {callDuration}
                </Typography>
              </Stack>
            </Box>
            {onHold && (
              <Box sx={{ width: '100%', py: 1.5, px: 2, borderRadius: 1, border: 1, borderColor: 'divider', bgcolor: 'grey.50' }}>
                <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                  <Pause size={18} />
                  <Typography variant="body2" color="text.secondary">
                    Customer on hold
                  </Typography>
                </Stack>
              </Box>
            )}
          </Stack>
        </CardContent>
      </Card>

      {!isEnded && (
        <Card variant="outlined" sx={{ maxWidth: 640, width: '100%', mx: 'auto' }}>
          <CardContent>
            <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ display: 'block', mb: 2, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Call controls
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' }, gap: 1 }}>
              <Button
                variant={muted ? 'contained' : 'outlined'}
                color={muted ? 'error' : 'inherit'}
                onClick={() => setMuted(m => !m)}
                sx={{ py: 1.5, flexDirection: 'column', gap: 0.5 }}
              >
                {muted ? <MicOff size={20} /> : <Mic size={20} />}
                <Typography variant="caption" component="span">
                  {muted ? 'Unmute' : 'Mute'}
                </Typography>
              </Button>
              <Button
                variant={onHold ? 'contained' : 'outlined'}
                onClick={() => setOnHold(h => !h)}
                sx={{ py: 1.5, flexDirection: 'column', gap: 0.5 }}
              >
                {onHold ? <Play size={20} /> : <Pause size={20} />}
                <Typography variant="caption" component="span">
                  {onHold ? 'Resume' : 'Hold'}
                </Typography>
              </Button>
              <Button variant="outlined" disabled sx={{ py: 1.5, flexDirection: 'column', gap: 0.5 }} title="Unavailable in preview">
                <PhoneForwarded size={20} />
                <Typography variant="caption" component="span">
                  Transfer
                </Typography>
              </Button>
              <Button variant="outlined" disabled sx={{ py: 1.5, flexDirection: 'column', gap: 0.5 }} title="Unavailable in preview">
                <Users size={20} />
                <Typography variant="caption" component="span">
                  Conference
                </Typography>
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}

      <Stack spacing={1.5} sx={{ maxWidth: 480, width: '100%', mx: 'auto', alignItems: 'stretch' }}>
        {isEnded ? (
          <>
            <Typography variant="body2" color="text.secondary" textAlign="center">
              Interaction ended
            </Typography>
            <Button variant="contained" fullWidth onClick={onStartInteraction}>
              Start Interaction
            </Button>
            <Button variant="outlined" size="small" onClick={() => { /* demo */ }}>
              Test
            </Button>
          </>
        ) : (
          <>
            <Button variant="contained" color="error" size="large" fullWidth onClick={onEndCall} startIcon={<PhoneOff size={20} />}>
              End Call
            </Button>
            <Button variant="outlined" size="small" onClick={() => { /* demo */ }}>
              Test
            </Button>
          </>
        )}
        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ pt: 0.5 }}>
          <Stack direction="row" spacing={0.75} alignItems="center">
            <Phone size={14} />
            <Typography variant="caption" color="text.secondary">
              Recording on
            </Typography>
          </Stack>
          <Typography variant="caption" color="divider">
            ·
          </Typography>
          <Stack direction="row" spacing={0.75} alignItems="center">
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'success.main' }} />
            <Typography variant="caption" color="text.secondary">
              Connected
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
