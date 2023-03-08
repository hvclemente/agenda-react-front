import { Icon } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ICalendarCell } from './CalendarScreen';
import { IEvent } from '../helpers/backend';
import { getToday } from '../helpers/dateFunctions';

const DAYS_OF_WEEK = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];

const tableStyles = {
  table: {
    borderTop: '1px solid rgb(224, 224, 224)',
    minHeight: '100%',
    tableLayout: 'fixed',
    '& td ~ td, & th ~ th': { borderLeft: '1px solid rgb(224, 224, 224)' },
    '& td': {
      verticalAlign: 'top',
      overflow: 'hidden',
      padding: '8px 4px',
    },
  },
  dayOfMonth: {
    fontWeight: '500',
    marginBottom: '4px',
  },
  today: {
    backgroundColor: '#3f51b5',
    color: 'white',
    borderRadius: '50%',
    display: 'inline-block',
    width: '24px',
    lineHeight: '24px',
    fontWeight: '500',
    marginBottom: '4px',
  },
  eventStyle: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left' as 'left',
    whiteSpace: 'nowrap' as 'nowrap',
    margin: '4px 0',
  },
};

interface ICalendarProps {
  weeks: ICalendarCell[][];
  onClickDay: (date: string) => void;
  onClickEvent: (event: IEvent) => void;
}

export default function Calendar(props: ICalendarProps) {
  const { weeks, onClickDay, onClickEvent } = props;

  function handleClick(evt: React.MouseEvent, date: string) {
    if (evt.target === evt.currentTarget) {
      onClickDay(date);
    }
  }

  return (
    <TableContainer style={{ flex: '1' }} component='div'>
      <Table sx={tableStyles.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            {DAYS_OF_WEEK.map((day) => (
              <TableCell align='center' key={day}>
                {day}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {weeks.map((week, i) => (
            <TableRow key={i}>
              {week.map((cell) => (
                <TableCell
                  align='center'
                  key={cell.date}
                  onClick={(mouseevt) => handleClick(mouseevt, cell.date)}
                >
                  <div
                    style={
                      cell.date === getToday()
                        ? tableStyles.today
                        : tableStyles.dayOfMonth
                    }
                  >
                    {cell.dayOfMonth}
                  </div>

                  {cell.events.map((event) => {
                    const color = event.calendar.color;
                    return (
                      <button
                        key={event.id}
                        style={tableStyles.eventStyle}
                        onClick={() => onClickEvent(event)}
                      >
                        {event.time && (
                          <>
                            <Icon fontSize='inherit' style={{ color }}>
                              watch_later
                            </Icon>
                            <span>{event.time}</span>
                          </>
                        )}
                        {event.time ? (
                          <span>{event.desc}</span>
                        ) : (
                          <div
                            style={{
                              backgroundColor: color,
                              color: 'white',
                              padding: '2px 4px',
                              borderRadius: '4px',
                            }}
                          >
                            {event.desc}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
