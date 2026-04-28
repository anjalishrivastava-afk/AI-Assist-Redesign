import React from 'react';
import { Phone, MessageSquare, Mail, Globe, Clock } from 'lucide-react';
import {
  Avatar,
  Badge,
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@exotel-npm-dev/signal-design-system';
import { inboxItems } from '../../mocks/inbox';
import type { InboxItem } from '../../mocks/inbox';

const channelIcon = {
  WhatsApp: MessageSquare,
  Email: Mail,
  Web: Globe,
};

function SectionHeader({
  icon: Icon,
  label,
  count,
  live,
}: {
  icon: React.ElementType;
  label: string;
  count: number;
  live?: boolean;
}) {
  return (
    <Stack direction="row" alignItems="center" spacing={1} sx={{ px: 2, py: 1 }}>
      <Icon size={16} aria-hidden />
      <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ letterSpacing: 0.06, textTransform: 'uppercase' }}>
        {label}
      </Typography>
      <Typography variant="caption" fontWeight={600} color={live ? 'error.main' : 'text.secondary'} sx={{ ml: 'auto', fontVariantNumeric: 'tabular-nums' }}>
        {count}
      </Typography>
    </Stack>
  );
}

function InboxRow({ item, active }: { item: InboxItem; active: boolean }) {
  const secondary =
    item.type === 'voice' ? (
      <Stack direction="row" alignItems="center" spacing={1} sx={{ minWidth: 0 }}>
        <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'error.main', flexShrink: 0 }} aria-hidden />
        <Typography variant="caption" color="text.secondary" noWrap>
          {item.queue}
        </Typography>
      </Stack>
    ) : (
      <Typography variant="caption" color="text.secondary" noWrap>
        {item.lastMessage}
      </Typography>
    );

  const meta =
    item.type === 'voice' && item.callDuration ? (
      <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace', fontVariantNumeric: 'tabular-nums' }}>
        {item.callDuration}
      </Typography>
    ) : item.type === 'chat' && item.timestamp ? (
      <Typography variant="caption" color="text.secondary">
        {item.timestamp}
      </Typography>
    ) : null;

  const ChannelIcon = item.type === 'chat' && item.channel ? channelIcon[item.channel] : null;

  const badge =
    item.type === 'voice' ? (
      <Box sx={{ width: 18, height: 18, borderRadius: 0.5, border: 1, borderColor: 'background.paper', bgcolor: 'background.paper', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'error.main' }}>
        <Phone size={10} aria-hidden />
      </Box>
    ) : ChannelIcon ? (
      <Box sx={{ width: 18, height: 18, borderRadius: 0.5, border: 1, borderColor: 'background.paper', bgcolor: 'background.paper', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.secondary' }}>
        <ChannelIcon size={10} aria-hidden />
      </Box>
    ) : null;

  const coreAvatar = (
    <Avatar sx={{ width: 36, height: 36, fontSize: '0.75rem', fontWeight: 600, bgcolor: item.avatarColor }}>
      {item.avatarInitials}
    </Avatar>
  );

  const avatar = badge ? (
    <Badge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} badgeContent={badge} sx={{ '& .MuiBadge-badge': { p: 0, minWidth: 18, minHeight: 18 } }}>
      {coreAvatar}
    </Badge>
  ) : (
    coreAvatar
  );

  return (
    <ListItemButton
      selected={active}
      sx={{
        mx: 1,
        mb: 1,
        borderRadius: 1,
        border: 1,
        borderColor: 'divider',
        alignItems: 'flex-start',
        py: 1.5,
        '&.Mui-selected': { bgcolor: 'action.selected', borderColor: 'primary.main' },
      }}
    >
      <Box sx={{ mr: 1.5, flexShrink: 0 }}>{avatar}</Box>
      <ListItemText
        primary={
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} sx={{ minWidth: 0 }}>
            <Typography variant="caption" fontWeight={600} color={active ? 'text.primary' : 'text.secondary'} noWrap>
              {item.customerName}
            </Typography>
            {meta}
          </Stack>
        }
        secondary={
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} sx={{ mt: 0.5 }}>
            <Box sx={{ flex: 1, minWidth: 0 }}>{secondary}</Box>
            {item.unreadCount && item.unreadCount > 0 ? (
              <Typography variant="caption" component="span" fontWeight={700} sx={{ px: 0.75, py: 0.25, borderRadius: 1, border: 1, borderColor: 'divider', bgcolor: 'action.hover', flexShrink: 0 }}>
                {item.unreadCount}
              </Typography>
            ) : null}
          </Stack>
        }
        primaryTypographyProps={{ component: 'div' }}
        secondaryTypographyProps={{ component: 'div' }}
      />
    </ListItemButton>
  );
}

export function InboxSidebar() {
  const voice = inboxItems.filter(i => i.type === 'voice');
  const chat = inboxItems.filter(i => i.type === 'chat');

  return (
    <Stack sx={{ height: '100%', minHeight: 0 }}>
      <Box sx={{ px: 2, py: 2, borderBottom: 1, borderColor: 'divider', flexShrink: 0 }}>
        <Typography variant="subtitle2" fontWeight={600}>
          Interactions
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
          {inboxItems.length} active
        </Typography>
      </Box>

      <List dense disablePadding sx={{ flex: 1, overflow: 'auto', py: 1 }}>
        <SectionHeader icon={Phone} label="Live calls" count={voice.length} live />
        {voice.map(item => (
          <InboxRow key={item.id} item={item} active={!!item.isActive} />
        ))}

        <Box sx={{ mt: 1 }}>
          <SectionHeader icon={MessageSquare} label="Chats" count={chat.length} />
        </Box>
        {chat.map(item => (
          <InboxRow key={item.id} item={item} active={false} />
        ))}
      </List>

      <Divider />
      <Stack direction="row" alignItems="center" spacing={1} sx={{ px: 2, py: 1.5, flexShrink: 0 }}>
        <Clock size={16} aria-hidden />
        <Typography variant="caption" color="text.secondary">
          Updated just now
        </Typography>
      </Stack>
    </Stack>
  );
}
