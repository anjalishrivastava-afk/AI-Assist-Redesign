import React from 'react';
import { ChatText, Envelope, Globe, CheckCircle } from '@phosphor-icons/react';
import {
  Box,
  Button,
  Stack,
  Typography,
} from '@exotel-npm-dev/signal-design-system';
import { MessageCard } from '../ds/MessageCard';
import { chatTranscript } from '../../mocks/chatTranscript';
import { inboxItems } from '../../mocks/inbox';
import { Composer } from './Composer';
import type { ChatChannel } from '../../mocks/chatTranscript';
import type { InteractionState } from '../../hooks/useInteractionState';

const channelIcon = {
  WhatsApp: ChatText,
  Email: Envelope,
  Web: Globe,
};

const channelLabel: Record<ChatChannel, string> = {
  WhatsApp: 'WhatsApp',
  Email: 'Email',
  Web: 'Web',
};

interface ChatInteractionProps {
  insertText?: string;
  onClearInsert?: () => void;
  onResolve: () => void;
  interactionState: InteractionState;
  onStartInteraction: () => void;
}

export function ChatInteraction({
  insertText,
  onClearInsert,
  onResolve,
  interactionState,
  onStartInteraction,
}: ChatInteractionProps) {
  const customer = inboxItems.find(i => i.type === 'chat' && i.channel === 'WhatsApp')!;
  const channel: ChatChannel = 'WhatsApp';
  const ChannelIcon = channelIcon[channel];
  const isEnded = interactionState === 'ended';

  return (
    <Stack sx={{ flex: 1, minHeight: 0, bgcolor: 'grey.50' }}>
      <Box
        sx={{
          px: 2,
          py: 1.5,
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          flexShrink: 0,
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ minWidth: 0 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'common.white',
              fontSize: '0.875rem',
              fontWeight: 600,
              flexShrink: 0,
              bgcolor: customer.avatarColor,
            }}
          >
            {customer.avatarInitials}
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="subtitle2" fontWeight={600} noWrap>
              {customer.customerName}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {customer.lastMessage}
            </Typography>
          </Box>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center" flexShrink={0}>
          <Box
            component="span"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              fontSize: '0.75rem',
              fontWeight: 500,
              color: 'text.secondary',
              px: 1,
              py: 0.5,
              borderRadius: 1,
              border: 1,
              borderColor: 'divider',
              bgcolor: 'grey.50',
            }}
          >
            <ChannelIcon size={14} />
            {channelLabel[channel]}
          </Box>
          {isEnded ? (
            <Button variant="contained" size="small" onClick={onStartInteraction}>
              Start Interaction
            </Button>
          ) : (
            <Button variant="contained" color="success" size="small" onClick={onResolve}>
              <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
                <CheckCircle size={16} weight="fill" />
                Resolve
              </Box>
            </Button>
          )}
          <Button variant="outlined" size="small" onClick={() => { /* demo */ }}>
            Test
          </Button>
        </Stack>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
        <Stack spacing={1.5}>
          {chatTranscript.map(msg => {
            const isAgent = msg.sender === 'agent';
            return (
              <MessageCard
                key={msg.id}
                caption={isAgent ? `You · ${msg.timestamp}` : `${customer.customerName} · ${msg.timestamp}`}
                align={isAgent ? 'end' : 'start'}
                accentStart={!isAgent}
              >
                {msg.text}
              </MessageCard>
            );
          })}
        </Stack>
      </Box>

      {!isEnded && <Composer insertText={insertText} onClearInsert={onClearInsert} />}
    </Stack>
  );
}
