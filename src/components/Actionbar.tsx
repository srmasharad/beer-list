import { ReactNode } from 'react';

import { ActionIcon, Group, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconLayoutGrid, IconLayoutList } from '@tabler/icons-react';

import { useColors } from '../hooks/useColors';
import Tooltip from './common/Tooltip';

interface ActionBarProps {
  title: string;
  children?: ReactNode;
  view?: string;
  onViewChange?: (value: string) => void;
  isView?: boolean;
}

const ActionBar = ({ title, view, onViewChange, isView = true, children }: ActionBarProps) => {
  const { isTextWhite } = useColors();
  const screen480 = useMediaQuery('(max-width: 480px');

  return (
    <Group position="apart" mb="xl">
      <Title order={4} weight={600} color={isTextWhite}>
        {title}
      </Title>
      <Group spacing="xs">
        {children}
        {isView && !screen480 && (
          <>
            <Tooltip label="List View">
              <ActionIcon radius="md" variant="light" color={view === 'list' ? 'indigo' : 'gray'} onClick={() => onViewChange?.('list')}>
                <IconLayoutList size={18} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Grid View">
              <ActionIcon radius="md" variant="light" color={view === 'grid' ? 'indigo' : 'gray'} onClick={() => onViewChange?.('grid')}>
                <IconLayoutGrid size={18} />
              </ActionIcon>
            </Tooltip>
          </>
        )}
      </Group>
    </Group>
  );
};

export default ActionBar;
