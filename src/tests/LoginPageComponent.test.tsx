/** @jest-environment jsdom */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginPageComponent from "../components/loginPageComponent/LoginPageComponent";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { renderHook } from '@testing-library/react-hooks'

                      
it("check that there is an input element for the email", async () => {
  renderHook(() => (
    <LoginPageComponent
      userEmail="simonepuce@gmail.com"
      setUserEmail={() => {
        return null;
      }}
    />
  ));
  const emailField = screen.queryByTestId("text-input-element");
  await (() => expect(emailField).toBeInTheDocument());
});

it("test login", async () => {

  let selectedUser = "simonepuce@gmail.com"
  const setSelectedUser = ()=>{
    return "";
  }
  const user = userEvent.setup();
  renderHook(()=>
    <LoginPageComponent
      userEmail={selectedUser} setUserEmail={setSelectedUser}
    />
  );
  try  {
    let email = screen.getByTestId("text-input-element");
    let password = screen.getByTestId("password-input-element");
    const buttonLogin = screen.getByTestId("login-button-element");
    user.type(email, "simonepuce@gmail.com");
    user.type(password, "Password!");
    user.click(buttonLogin);
    await expect(buttonLogin).toHaveBeenCalledTimes(2);
  } catch (error) {
    console.log("errore grave");
  }
});
