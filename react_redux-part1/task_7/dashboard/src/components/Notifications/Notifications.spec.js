import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../../app/rootReducer";
import Notifications from "./Notifications";
import { getLatestNotification } from "../../utils/utils";

jest.mock("../../utils/utils", () => ({
  getLatestNotification: jest.fn(),
}));

const createStore = (notifications = [], displayDrawer = true) =>
  configureStore({
    reducer: rootReducer,
    preloadedState: {
      notifications: { notifications, displayDrawer },
    },
  });

const renderWithStore = (notifications, displayDrawer) => {
  const store = createStore(notifications, displayDrawer);
  const utils = render(
    <Provider store={store}>
      <Notifications />
    </Provider>
  );
  return { store, ...utils };
};

describe("Notifications component", () => {
  let consoleSpy;

  beforeEach(() => {
    getLatestNotification.mockReturnValue(
      "<strong>Urgent requirement</strong> - complete by EOD"
    );
    consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  const threeNotifications = () => [
    { id: 1, type: "default", value: "New course available" },
    { id: 2, type: "urgent", value: "New resume available" },
    { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
  ];

  test("renders the notifications title", () => {
    renderWithStore([{ id: 1, type: "default", value: "New course available" }], true);
    expect(screen.getByText(/Here is the list of notifications/i)).toBeInTheDocument();
  });

  test("renders the close button", () => {
    renderWithStore([{ id: 1, type: "default", value: "New course available" }], true);
    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
  });

  test("it should display 3 notification items from the store", () => {
    renderWithStore(threeNotifications(), true);
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  test('it should not display a title, button and list items whenever "displayDrawer" is false', () => {
    renderWithStore(threeNotifications(), false);

    expect(screen.queryByText(/here is the list of notifications/i)).toBeNull();
    expect(screen.queryByRole("button")).toBeNull();
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });

  test('it should display "No new notifications for now" whenever the notifications list is empty', () => {
    renderWithStore([], true);

    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    expect(screen.getByText(/no new notifications for now/i)).toBeInTheDocument();
  });

  test('it should display "Your notifications" in all cases', () => {
    const { unmount } = renderWithStore([], false);
    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
    unmount();

    renderWithStore([{ id: 1, type: "default", value: "New course available" }], true);
    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
  });

  test("it should display close button, p element, and notification items when displayDrawer is true", () => {
    renderWithStore(threeNotifications(), true);

    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
    expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  test("it should dispatch markNotificationAsRead with the correct id when a notification item is clicked", () => {
    const { store } = renderWithStore(threeNotifications(), true);

    fireEvent.click(screen.getByText("New resume available"));

    const ids = store.getState().notifications.notifications.map((n) => n.id);
    expect(ids).toEqual([1, 3]);
    expect(consoleSpy).toHaveBeenCalledWith("Notification 2 has been marked as read");
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  test('should dispatch showDrawer when "Your notifications" is clicked', () => {
    const { store } = renderWithStore([], false);

    fireEvent.click(screen.getByText("Your notifications"));

    expect(store.getState().notifications.displayDrawer).toBe(true);
  });

  test("should dispatch hideDrawer when the close button is clicked", () => {
    const { store } = renderWithStore(
      [{ id: 1, type: "default", value: "Test notification" }],
      true
    );

    fireEvent.click(screen.getByRole("button", { name: /close/i }));

    expect(store.getState().notifications.displayDrawer).toBe(false);
    expect(screen.queryByText(/here is the list of notifications/i)).toBeNull();
  });
});
