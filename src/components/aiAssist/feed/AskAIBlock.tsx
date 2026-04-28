import React from 'react';
import { Box, Card, CardContent, CircularProgress, Stack, Typography } from '@exotel-npm-dev/signal-design-system';
import { Skeleton } from '../../ui/Skeleton';

interface AskAIBlockProps {
  question: string;
  answer?: string;
  source?: string;
  loading: boolean;
}

export function AskAIBlock({ question, answer, source, loading }: AskAIBlockProps) {
  return (
    <Stack spacing={1.5}>
      <Typography variant="caption" color="text.secondary" textAlign="center" fontWeight={600} letterSpacing={0.8}>
        Private
      </Typography>

      <Card variant="outlined" sx={{ ml: 4, alignSelf: 'flex-end', maxWidth: '90%' }}>
        <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
            Your question
          </Typography>
          <Typography variant="body2">{question}</Typography>
        </CardContent>
      </Card>

      {loading ? (
        <Card variant="outlined" sx={{ mr: 4, alignSelf: 'flex-start', maxWidth: '90%' }}>
          <CardContent>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack spacing={1} sx={{ flex: 1 }}>
                <Skeleton width={160} height={12} />
                <Skeleton width={112} height={12} />
              </Stack>
              <CircularProgress size={18} aria-label="Loading" />
            </Stack>
          </CardContent>
        </Card>
      ) : answer ? (
        <Card variant="outlined" sx={{ mr: 4, alignSelf: 'flex-start', maxWidth: '90%', bgcolor: 'grey.50' }}>
          <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
              Answer
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
              {answer}
            </Typography>
            {source ? (
              <Box sx={{ mt: 1.5, pt: 1.5, borderTop: 1, borderColor: 'divider' }}>
                <Typography variant="caption" color="text.secondary">
                  <Box component="span" fontWeight={600}>
                    Source:{' '}
                  </Box>
                  {source}
                </Typography>
              </Box>
            ) : null}
          </CardContent>
        </Card>
      ) : null}
    </Stack>
  );
}
