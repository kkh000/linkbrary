const convertDuration = (timestamp: string) => {
  const now = new Date();
  const targetDate = new Date(timestamp);
  const timeDiff = now.getTime() - targetDate.getTime();
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years >= 1) {
    return years === 1 ? '1 year ago' : `${years} years ago`;
  } else if (months >= 1) {
    return months === 1 ? '1 month ago' : `${months} months ago`;
  } else if (days >= 1) {
    return days === 1 ? '1 day ago' : `${days} days ago`;
  } else if (hours >= 1) {
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  } else if (minutes >= 1) {
    return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
  } else {
    return 'Just now';
  }
};

export default convertDuration;
