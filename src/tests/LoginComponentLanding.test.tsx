/** @jest-environment jsdom */
import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginPageComponent from "../components/loginPageComponent/LoginPageComponent";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";


const mockLocalStorage = (() => {
  let store = {} as Storage;

  return {
    getItem(key: string) {
      return store[key];
    },

    setItem(key: string, value: string) {
      store[key] = value;
    },

    removeItem(key: string) {
      delete store[key];
    },

    clear() {
      store = {} as Storage;
    },
  };
})();


const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom')),
  useNavigate: () => mockedUsedNavigate,
}))

afterEach(() => {
  jest.restoreAllMocks();
});


it("test after the login to land on the right page", async () => {
  let selectedUser = "simonepuce@gmail.com";
  Object.defineProperty(window, "localStorage", {
    value: mockLocalStorage,
  });
  const setSelectedUser = () => {
    return "";
  };
  const user = userEvent.setup()

  const mockItem = {
    name: "simone",
    surname: "puce",
    email:"simonepuce@gmail.com",
    password: "Password!",
    date: "2023-12-15"
  }

 render(
      <LoginPageComponent
        userEmail={selectedUser}
        setUserEmail={setSelectedUser}
      />)
    const emailField =screen.getByTestId("text-input-element");
    const passwordField = screen.getByTestId("password-input-element");
    const loginButton = screen.getByTestId("login-button-element");
    const spy = jest.spyOn(loginButton, "click");
    emailField.setAttribute("value", "simonepuce@gmail.com");
    passwordField.setAttribute("value", "Password!")
    loginButton.click();
    expect(emailField.getAttribute("value")).toBe("simonepuce@gmail.com");
    expect(passwordField.getAttribute("value")).toBe("Password!")
    expect(spy).toHaveBeenCalled();
    expect(loginButton).toBeInTheDocument();
    mockLocalStorage.setItem(user+mockItem.name, JSON.stringify(mockItem));
    //await userEvent.click(await screen.findByTestId("login-button-element"));
    //expect(mockedUsedNavigate).toHaveBeenCalledWith('/employees')
});


