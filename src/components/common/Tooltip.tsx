import { ReactNode } from 'react';

import { Tooltip as MantineTooltip, TooltipProps as MantineTooltipProps, useMantineTheme } from '@mantine/core';

interface TooltipProps {
  children: ReactNode;
  label: ReactNode;
  position?: string;
  arrowSize?: number;
}

const Tooltip = ({ label, position = 'bottom', arrowSize = 6, children, ...restProps }: TooltipProps & MantineTooltipProps) => {
  const theme = useMantineTheme();

  return (
    <MantineTooltip
      {...restProps}
      label={label}
      withArrow
      position={position}
      arrowSize={arrowSize}
      transition="pop"
      transitionDuration={200}
      styles={{ tooltip: { padding: '2px 8px', fontSize: theme.fontSizes.xs, fontWeight: 600 } }}>
      {children}
    </MantineTooltip>
  );
};

export default Tooltip;
