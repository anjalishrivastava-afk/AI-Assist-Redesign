import React from 'react';
import { ChevronDown } from 'lucide-react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
} from '@exotel-npm-dev/signal-design-system';
import type { SxProps, Theme } from '@mui/material/styles';

interface CollapsibleSectionProps {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  headerRight?: React.ReactNode;
  /** Applied to Accordion root (MUI `sx`). */
  sx?: SxProps<Theme>;
  /** Applied to AccordionDetails content wrapper. */
  detailsSx?: SxProps<Theme>;
  sticky?: boolean;
}

export function CollapsibleSection({
  title,
  children,
  defaultOpen = true,
  headerRight,
  sx,
  detailsSx,
  sticky = false,
}: CollapsibleSectionProps) {
  return (
    <Accordion
      defaultExpanded={defaultOpen}
      disableGutters
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        '&:before': { display: 'none' },
        ...sx,
      }}
    >
      <AccordionSummary
        expandIcon={<ChevronDown size={18} aria-hidden />}
        sx={{
          px: 2,
          minHeight: 48,
          '& .MuiAccordionSummary-content': { alignItems: 'center', my: 1 },
          ...(sticky
            ? {
                position: 'sticky',
                top: 0,
                zIndex: 2,
                bgcolor: 'background.paper',
                borderBottom: 1,
                borderColor: 'divider',
              }
            : {}),
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} sx={{ width: '100%', pr: 0.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0, typography: 'subtitle2', fontWeight: 600 }}>
            {title}
          </Box>
          {headerRight ? (
            <Box onClick={(e: React.MouseEvent) => e.stopPropagation()} sx={{ flexShrink: 0 }}>
              {headerRight}
            </Box>
          ) : null}
        </Stack>
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 0, px: 0, pb: 0, ...detailsSx }}>{children}</AccordionDetails>
    </Accordion>
  );
}
