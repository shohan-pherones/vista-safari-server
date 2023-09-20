import cron from 'node-cron';
import { deleteOutdatedBookings } from '../conf/delete-outdated-bookings.conf';

export const startCron = () => {
  cron.schedule(
    '* * * * * *',
    () => {
      deleteOutdatedBookings();
    },
    { timezone: 'Asia/Dhaka' }
  );
};
