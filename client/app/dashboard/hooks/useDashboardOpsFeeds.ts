import { useState } from 'react';
import {
  getNotifications,
  getPeople,
  getPipeline,
  getTasks,
  getToDo,
  sendReminder,
} from '@/lib/api';

export function useDashboardOpsFeeds() {
  const [pipeline, setPipeline] = useState<Array<Record<string, unknown>>>([]);
  const [toDoItems, setToDoItems] = useState<Array<Record<string, unknown>>>([]);
  const [tasks, setTasks] = useState<Array<Record<string, unknown>>>([]);
  const [people, setPeople] = useState<Array<Record<string, unknown>>>([]);
  const [notifications, setNotifications] = useState<Array<Record<string, unknown>>>([]);

  async function refreshCaseNotifications(caseId: number) {
    const noteResponse = await getNotifications(caseId);
    setNotifications(noteResponse.data);
  }

  async function refreshToDoItems() {
    const response = await getToDo();
    setToDoItems(response.data);
  }

  async function loadPipeline() {
    const response = await getPipeline();
    setPipeline(response.data);
  }

  async function loadTasks() {
    const response = await getTasks();
    setTasks(response.data);
  }

  async function loadPeople() {
    const response = await getPeople();
    setPeople(response.data);
  }

  async function loadNotifications(caseId?: number | null) {
    const response = await getNotifications(caseId ?? undefined);
    setNotifications(response.data);
  }

  async function triggerReminder(caseId: number | null, setInfo: (message: string | null) => void) {
    if (!caseId) return;
    const response = await sendReminder(caseId);
    if (response.sent) {
      await refreshCaseNotifications(caseId);
      setInfo('Reminder queued to Faculty FHD rep and Dept FHD rep.');
      return;
    }
    setInfo(response.reason ?? 'No reminder sent.');
  }

  return {
    pipeline,
    toDoItems,
    tasks,
    people,
    notifications,
    refreshCaseNotifications,
    refreshToDoItems,
    loadPipeline,
    loadTasks,
    loadPeople,
    loadNotifications,
    triggerReminder,
  };
}
