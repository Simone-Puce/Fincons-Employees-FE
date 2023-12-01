import React, { useState } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import LoginPageComponent from "../components/loginPageComponent/LoginPageComponent";


beforeAll(()=>{
    render(<LoginPageComponent userEmail="simonepuce@gmail.com" setUserEmail={()=>{return null}}/>)
})

describe("login page component", () => {

  it("test login", async () => {
    const email = screen.getByTestId("text-input-element");
    const password = screen.getByTestId("password-input-element");
    const buttonLogin = screen.getByTestId("login-button-element");
    fireEvent.change(email, { target: { value: "simonepuce@gmail.com" } });
    fireEvent.change(password, { target: { value: "Password!" } });

    fireEvent.click(screen.getByTestId("login-button-element"));
    await waitFor(() => {
      expect(buttonLogin).toBeCalledTimes(1);
    });
  });
});
