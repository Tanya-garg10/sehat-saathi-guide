// Simple frontend analytics storage
interface AnalyticsData {
  pageViews: number;
  buttonClicks: Record<string, number>;
}

const STORAGE_KEY = "frontend_analytics";

const getData = (): AnalyticsData => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored);
  return { pageViews: 0, buttonClicks: {} };
};

const saveData = (data: AnalyticsData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// Increment page view
export const incrementPageView = () => {
  const data = getData();
  data.pageViews += 1;
  saveData(data);
};

// Track button click by ID
export const trackButtonClick = (id: string) => {
  const data = getData();
  if (!data.buttonClicks[id]) data.buttonClicks[id] = 0;
  data.buttonClicks[id] += 1;
  saveData(data);
};

// Get analytics snapshot
export const getAnalytics = () => {
  return getData();
};
