import React, { useEffect, useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import './AttendanceCalendar.css';
import address from '../Address';

interface Attendance {
  date: string;
  present: boolean;
}

// 현재 날짜를 기준으로 1년 전 날짜를 반환하는 함수
const getOneYearAgo = (date: Date) => {
  return new Date(date.getFullYear() - 1, date.getMonth(), date.getDate());
};

// 날짜를 ISO 문자열로 변환하는 함수
const formatDate = (date: Date) => {
  return date.toISOString().split('T')[0];
};

// 1년 동안의 날짜 배열을 생성하는 함수
const generateDateArray = (startDate: Date, endDate: Date): Attendance[] => {
  const dates: Attendance[] = [];
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dates.push({
      date: formatDate(currentDate),
      present: false,
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};

const AttendanceCalendar = () => {
  const [attendance, setAttendance] = useState<Attendance[]>([]);

  useEffect(() => {
    const today = new Date();
    const startDate = getOneYearAgo(today);

    // 기본 날짜 배열 생성
    const initialDates = generateDateArray(startDate, today);
    setAttendance(initialDates);

    // 서버에서 출석 정보를 가져와 병합합니다
    const fetchAttendance = async () => {
      try {
        const response = await address.get('/api/attendance');
        const serverData = response.data;

        // 서버 데이터를 기본 날짜 배열에 병합
        const mergedData = initialDates.map(dateItem => {
          const matchingData = serverData.find(
            (item: { date: string; present: boolean }) => item.date === dateItem.date,
          );
          return matchingData ? { ...dateItem, present: matchingData.present } : dateItem;
        });

        // 디버깅 로그 추가
        console.log('Initial Dates:', initialDates);
        console.log('Server Data:', serverData);
        console.log('Merged Data:', mergedData);

        setAttendance(mergedData);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchAttendance();
  }, []);

  const today = new Date();
  const todayString = formatDate(today);
  const startDate = getOneYearAgo(today);

  const getRandomColorClass = () => {
    const colors = ['color-gitlab-1', 'color-gitlab-2', 'color-gitlab-3', 'color-gitlab-4'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="calendar-container">
      <CalendarHeatmap
        startDate={startDate}
        endDate={today}
        values={attendance.map(entry => ({
          date: entry.date,
          count: entry.present ? 1 : 0, // 출석 여부에 따라 1 또는 0 설정
        }))}
        classForValue={value => {
          if (!value || value.count === 0) {
            return 'color-empty';
          }
          if (value.date === todayString) {
            return 'color-today'; // 오늘 날짜를 강조
          }
          return getRandomColorClass();
        }}
        tooltipDataAttrs={value => {
          if (!value) {
            return { 'data-tooltip-content': '', 'data-date': '' };
          }
          const date = typeof value.date === 'string' ? value.date : formatDate(new Date(value.date));
          return {
            'data-tooltip-content': `${value.date}: ${value.count ? 'Present' : 'Absent'}`,
            'data-date': date, // 날짜 속성 추가
          };
        }}
        showWeekdayLabels
      />
      <ReactTooltip id="tooltip" />
    </div>
  );
};

export default AttendanceCalendar;
