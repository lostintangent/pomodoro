import * as vscode from "vscode";
import * as vsls from "vsls/vscode";

import { registerLiveShareSessionProvider, treeDataProvider } from "./tree-provider";

import { COMMAND_IDS, State } from "./constants";
import { Pomodoro } from "./pomodoro";
import { config } from "./pomodoroConfig";
import { GuestService } from "./service/guestService";
import { HostService } from "./service/hostService";

const setExtensionContext = async (state: State) => {
  await vscode.commands.executeCommand(
    "setContext",
    "liveshare.pomodoro.state",
    state
  );
};

export async function activate(context: vscode.ExtensionContext) {
  const pomodoro = new Pomodoro(config);

  const vslsAPI = await vsls.getApi();
  if (vslsAPI) {
    registerLiveShareSessionProvider(vslsAPI!);
    vslsAPI.onDidChangeSession((e: vsls.SessionChangeEvent) => {
      switch (e.session.role) {
        case vsls.Role.Guest:
          new GuestService(undefined, pomodoro, vslsAPI);
          break;
        case vsls.Role.Host:
          new HostService(undefined, pomodoro, vslsAPI);
          break;
        default:
          return;
      }
    });
  }

  pomodoro.onRefresh(treeDataProvider.updateRemainingTime);
  pomodoro.onPause(treeDataProvider.onPause);

  const startCommand = vscode.commands.registerCommand(
    COMMAND_IDS.start,
    async () => {
      await setExtensionContext(State.running);
      pomodoro.start();
    }
  );

  const pauseCommand = vscode.commands.registerCommand(
    COMMAND_IDS.pause,
    async () => {
      await setExtensionContext(State.paused);
      pomodoro.pause();
    }
  );

  const resetCommand = vscode.commands.registerCommand(
    COMMAND_IDS.reset,
    async () => {
      await setExtensionContext(State.stopped);
      pomodoro.reset();
    }
  );

  context.subscriptions.push(startCommand, pauseCommand, resetCommand);
}

export function deactivate() {}
