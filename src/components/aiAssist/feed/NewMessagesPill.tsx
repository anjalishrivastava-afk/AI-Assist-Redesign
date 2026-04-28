import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Box, Button, Stack } from '@exotel-npm-dev/signal-design-system';

interface NewMessagesPillProps {
  onClick: () => void;
}

export function NewMessagesPill({ onClick }: NewMessagesPillProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', px: 2, py: 1, borderTop: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
      <Button variant="contained" size="small" onClick={onClick} sx={{ borderRadius: 999 }}>
        <Stack direction="row" spacing={0.75} alignItems="center">
          <ArrowDown size={16} />
          New messages below
        </Stack>
      </Button>
    </Box>
  );
}
