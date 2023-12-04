/** @jest-environment jsdom */
import { fireEvent, getByTestId, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginPageComponent from "../components/loginPageComponent/LoginPageComponent";
import userEvent from "@testing-library/user-event";


const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

beforeEach(() => {
  mockedUsedNavigate.mockReset();
});

it("check that there is an input element for the email", async () => {
  render(
    <LoginPageComponent
      userEmail="simonepuce@gmail.com"
      setUserEmail={() => {
        return null;
      }}
    />
  );
  const emailField = screen.queryByTestId("text-input-element");
  await (() => expect(emailField).toBeInTheDocument());
});

it("test login", async () => {
  let selectedUser = "simonepuce@gmail.com";
  const setSelectedUser = () => {
    return "";
  };
  const user = userEvent.setup();
  render(
    <LoginPageComponent
      userEmail={selectedUser}
      setUserEmail={setSelectedUser}
    />
  );
  let email = screen.getByTestId("text-input-element");
  let password = screen.getByTestId("password-input-element");
  let buttonLogin = screen.getByTestId("login-button-element");
  fireEvent.input(email, "simonepuce@gmail.com");
  fireEvent.input(password, "Password!");
  const clicked = fireEvent.click(buttonLogin);
  const spy = jest.spyOn(buttonLogin, "click");
  buttonLogin.click();
  expect(clicked).toBe(true);
  expect(spy).toHaveBeenCalledTimes(1);

});

it("test after the login to land on the right page", async () => {
  const mockEmail = "simonepuce@gmail.com";
  let selectedUser = "simonepuce@gmail.com";
  const setSelectedUser = () => {
    return "";
  };
  const user = userEvent.setup();
  render(
    <LoginPageComponent
      userEmail={selectedUser}
      setUserEmail={setSelectedUser}
    />
  );
  console.log(window.location.pathname);
  await waitFor(() => expect(window.location.pathname).toBe("/"));

  let email = screen.getByTestId("text-input-element");
  let password = screen.getByTestId("password-input-element");
  fireEvent.input(email, mockEmail);
  fireEvent.input(password, "Password!");
  fireEvent.click(screen.getByTestId("login-button-element"))
  console.log(window.location.pathname);
  await waitFor(async () =>
    expect(window.location.pathname).toBe("/employees")
  );
});
