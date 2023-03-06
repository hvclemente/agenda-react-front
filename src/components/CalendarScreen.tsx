import { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import {
  getEventsEndpoint,
  IEvent,
  ICalendar,
  getCalendarsEndpoint,
} from '../helpers/backend';
import { useParams } from 'react-router-dom';
import CalendarsView from './CalendarsView';
import CalendarHeader from './CalendarHeader';
import Calendar from './Calendar';
import EventFormDialog, { IEditingEvent } from './EventFormDialog';
import { getToday } from '../helpers/dateFunctions';

type IEventWithCalendar = IEvent & { calendar: ICalendar };

export interface ICalendarCell {
  date: string;
  dayOfMonth: number;
  events: IEventWithCalendar[];
}

function generateCalendar(
  date: string,
  allEvents: IEvent[],
  calendars: ICalendar[],
  calendarsSelected: boolean[]
): ICalendarCell[][] {
  const weeks: ICalendarCell[][] = [];
  const jsDate = new Date(date + 'T12:00:00');
  const currentMonth = jsDate.getMonth();

  const currentDay = new Date(jsDate.valueOf());
  currentDay.setDate(1);
  const dayOfWeek = currentDay.getDay();
  currentDay.setDate(1 - dayOfWeek);

  do {
    const week: ICalendarCell[] = [];
    for (let i = 0; i < 7; i++) {
      const monthStr = (currentDay.getMonth() + 1).toString().padStart(2, '0');
      const dayStr = currentDay.getDate().toString().padStart(2, '0');
      const isoDate = `${currentDay.getFullYear()}-${monthStr}-${dayStr}`;

      const events: IEventWithCalendar[] = [];
      for (const event of allEvents) {
        if (event.date === isoDate) {
          const calIndex = calendars.findIndex(
            (cal) => cal.id === event.calendarId
          );
          if (calendarsSelected[calIndex]) {
            events.push({ ...event, calendar: calendars[calIndex] });
          }
        }
      }

      week.push({
        date: isoDate,
        dayOfMonth: currentDay.getDate(),
        events,
      });
      currentDay.setDate(currentDay.getDate() + 1);
    }
    weeks.push(week);
  } while (currentDay.getMonth() === currentMonth);

  return weeks;
}

export default function CalendarScreen() {
  const { month } = useParams<{ month: string }>();

  const [calendars, setCalendars] = useState<ICalendar[]>([]);
  const [calendarsSelected, setCalendarsSelected] = useState<boolean[]>([]);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [editingEvent, setEditingEvent] = useState<IEditingEvent | null>(null);

  const weeks: ICalendarCell[][] = generateCalendar(
    month + '-01',
    events,
    calendars,
    calendarsSelected
  );
  const firstDate = weeks[0][0].date;
  const lastDate = weeks[weeks.length - 1][6].date;

  useEffect(() => {
    Promise.all([
      getCalendarsEndpoint(),
      getEventsEndpoint(firstDate, lastDate),
    ]).then(([calendars, events]) => {
      setCalendarsSelected(calendars.map(() => true));
      setCalendars(calendars);
      setEvents(events);
    });
  }, [firstDate, lastDate]);

  function refreshEvents() {
    getEventsEndpoint(firstDate, lastDate).then(setEvents);
  }

  function toogleCalendar(i: number) {
    const newValue = [...calendarsSelected];
    newValue[i] = !newValue[i];
    setCalendarsSelected(newValue);
  }

  function openNewEvent(date: string) {
    setEditingEvent({
      date,
      desc: '',
      calendarId: calendars[0].id,
    });
  }

  return (
    <Box display='flex' height='100%' alignItems='stretch'>
      <Box
        borderRight='1px solid rgb(224, 224, 224)'
        width='16em'
        padding='8px 16px'
      >
        <h2>Agenda React</h2>
        <Button
          variant='contained'
          color='primary'
          onClick={() => openNewEvent(getToday())}
        >
          Novo evento
        </Button>
        <CalendarsView
          calendars={calendars}
          toogleCalendar={toogleCalendar}
          calendarsSelected={calendarsSelected}
        />
      </Box>

      <Box display='flex' flex='1' flexDirection='column'>
        {month && <CalendarHeader month={month} />}

        <Calendar
          weeks={weeks}
          onClickDay={openNewEvent}
          onClickEvent={setEditingEvent}
        />

        <EventFormDialog
          event={editingEvent}
          calendars={calendars}
          onCancel={() => setEditingEvent(null)}
          onSave={() => {
            setEditingEvent(null);
            refreshEvents();
          }}
        />
      </Box>
    </Box>
  );
}
