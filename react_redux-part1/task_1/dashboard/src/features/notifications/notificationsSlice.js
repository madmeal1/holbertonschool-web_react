import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { getLatestNotification } from '../../utils/utils'

export const initialState = {
  notifications: [],
  displayDrawer: true,
}

const API_BASE_URL = 'http://localhost:5173'

const ENDPOINTS = {
  notifications: `${API_BASE_URL}/notifications.json`,
}

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async () => {
    const response = await axios.get(ENDPOINTS.notifications)

    return response.data.map((notification) =>
      notification.id === 3
        ? { ...notification, html: { __html: getLatestNotification() } }
        : notification
    )
  }
)

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markNotificationAsRead: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      )
      console.log(`Notification ${action.payload} has been marked as read`)
    },
    showDrawer: (state) => {
      state.displayDrawer = true
    },
    hideDrawer: (state) => {
      state.displayDrawer = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.notifications = action.payload
    })
  },
})

export const { markNotificationAsRead, showDrawer, hideDrawer } = notificationsSlice.actions

export default notificationsSlice.reducer
