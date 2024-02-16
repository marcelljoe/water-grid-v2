// @ts-ignore
import React, { useEffect, useState } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import IDN from 'dayjs/locale/id';
import { Box } from '@mui/material';
import { http } from '@/utils/httpClient';
dayjs.locale(IDN);

const localizer = dayjsLocalizer(dayjs);

interface IBigCalenderData {
  id: number;
  title: string;
  start: string;
  end: string;
}

const IsCalendar = () => {
  const [eventsData, setEventsData] = useState<IBigCalenderData[]>([]);

  useEffect(() => {
    const initFetch = async () => {
      await fetchData({ start: dayjs().toISOString() });
    };

    initFetch();
  }, []);

  const fetchData = async ({ start, end }: { start: string; end?: string }) => {
    if (!end) {
      end = '';
    }
    const query = `start=${start}&end=${end}`;
    const data = await http.get(`/api/mail/dashboard_calender?${query}`);
    setEventsData(data.data);
  };

  const handleSelect = ({ start, end }: { start: Date; end: Date }) => {
    const startOfMonth = dayjs(start).startOf('month').toISOString();
    const endOfMonth = dayjs(end).endOf('month').toISOString();
    fetchData({ start: startOfMonth, end: endOfMonth });
  };

  return (
    <Box>
      <Calendar
        className="calendar"
        views={['agenda', 'month']}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        style={{ height: '55vh' }}
        onSelectEvent={event => alert(event.title)}
        onSelectSlot={handleSelect}
      />
    </Box>
  );
};

export default React.memo(IsCalendar);
