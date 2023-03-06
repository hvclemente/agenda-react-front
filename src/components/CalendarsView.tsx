import { Box, Checkbox, FormControlLabel } from '@mui/material';
import { ICalendar } from '../helpers/backend';

interface ICalendarsViewProps {
  calendars: ICalendar[];
  toogleCalendar: (i: number) => void;
  calendarsSelected: boolean[];
}

export default function CalendarsView(props: ICalendarsViewProps) {
  const { calendars, calendarsSelected, toogleCalendar } = props;
  return (
    <Box marginTop='64px'>
      <h3>Agendas</h3>
      {calendars.map((calendar, i) => {
        return (
          <div key={calendar.id}>
            <FormControlLabel
              control={
                <Checkbox
                  style={{ color: calendar.color }}
                  checked={calendarsSelected[i]}
                  onChange={() => toogleCalendar(i)}
                />
              }
              label={calendar.name}
            />
          </div>
        );
      })}
    </Box>
  );
}
