import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import AuthenticationUtil from "../../../utils/AuthenticationUtil";

import ImageLight from "../../../assets/images/setup-account.jpeg";
import ImageDark from "../../../assets/images/create-account-office-dark.jpeg";
import { GithubIcon, TwitterIcon } from "../../../icons";
import { Alert, Input, Label, Button, Textarea } from "@windmill/react-ui";
import { getProxy } from "../../../utils/PathUtil";

const SetupProfile = () => {
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Setup Profile
              </h1>
              <Label >
                <span>Avatar</span>
                <input type="file" className="block w-full text-sm text-gray-500
                      file:hidden
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-500 file:text-white
                      hover:file:bg-blue-600
                    "/>
              </Label>
              <Label className="mt-4">
                <span>Full name</span>
                <Input crossOrigin="" css="" className="mt-1" type="text" placeholder="Your name" />
              </Label>
              <Label className="mt-4">
                <span>Birthday</span>
                <Input crossOrigin="" css="" className="mt-1" placeholder="Your birthday" type="date" />
              </Label>
              <Label className="mt-4">
                <span>Phone</span>
                <Input crossOrigin="" css="" className="mt-1" placeholder="Your phone" type="tel" />
              </Label>

              <Label className="mt-4">
                <span>Address</span>
                <Textarea className="mt-1" css="" rows={5} placeholder="Enter some long form content." style={{ resize: "none" }} />
              </Label>
              <hr className="mt-4" />
              <Button block className="mt-6">
                Confirm Setup
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SetupProfile;
