import * as vscode from "vscode";
import * as vsls from "vsls/vscode";

import { registerLiveShareSessionProvider, treeDataProvider } from "./tree-provider";

import { COMMAND_IDS, State } from "./constants";
import { Pomodoro } from "./pomodoro";
import { config } from "./pomodoroConfig";

const setExtensionContext = async (state: State) => {
  await vscode.commands.executeCommand(
    "setContext",
    "liveshare.pomodoro.state",
    state
  );
};

export async function activate(context: vscode.ExtensionContext) {
  const vslsAPI = await vsls.getApi();
  registerLiveShareSessionProvider(vslsAPI!);

  const pomodoro = new Pomodoro(config);

  pomodoro.onRefresh(treeDataProvider.updateRemainingTime);

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
