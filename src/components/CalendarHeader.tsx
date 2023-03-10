import { Box, Icon, IconButton } from '@mui/material';
import { formatMonth, addMonths } from '../helpers/dateFunctions';
import { Link } from 'react-router-dom';
import UserMenu from './UserMenu';

export default function CalendarHeader(props: {month: string}) {
  const { month } = props;
  return (
    <Box display='flex' alignItems='center' padding='8px 16px'>
      <Box>
        {month && (
          <>
            <IconButton
              aria-label='Mês anterior'
              component={Link}
              to={'/calendar/' + addMonths(month, -1)}
            >
              <Icon>chevron_left</Icon>
            </IconButton>
            <IconButton
              aria-label='Próximo mês'
              component={Link}
              to={'/calendar/' + addMonths(month, 1)}
            >
              <Icon>chevron_right</Icon>
            </IconButton>
          </>
        )}
      </Box>
      <Box flex='1' component='h3' marginLeft='16px'>
        {month && formatMonth(month)}
      </Box>
      <UserMenu />
    </Box>
  );
}
