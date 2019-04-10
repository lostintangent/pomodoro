# Live Share Pomodoro

[![Build Status](https://dev.azure.com/vsls-contrib/vsls-contrib/_apis/build/status/vsls-contrib.pomodoro?branchName=master)](https://dev.azure.com/vsls-contrib/vsls-contrib/_build/latest?definitionId=3&branchName=master)

Live Share Pomodoro enhances the existing [Visual Studio Live Share](https://aka.ms/vsls) experience, by enabling you to use the [Pomodoro technique](https://francescocirillo.com/pages/pomodoro-technique) for time management within collaboration sessions. All participants within the session work against the same synchronized timer, and can pause, start and reset it collaboratively. For certain use cases (e.g. pair programming), this can provide a useful means of adding structure to the Live Share session, without needing to rely on a seperate tool (e.g. enforcing when to take breaks, providing a moment to switch roles).

## Getting Started

To begin using the collaborative pomodoro within your Visual Studio Live Share sessions, simply perform the following steps:

1. Install this extension, then reload VS Code

1. Click the `Live Share` button in your status bar to start a new collaboration session, and invite the developers you'd like to collaborate with.

   <img src="https://aka.ms/vsls/quickstart/share" width="140px" />

   > Make sure the developers you're collaborating with also have the VS Live Share Pomodoro extension installed.

1. Open the Live Share `Session Details` view, and click `Ready to work!` item under the `Pomodoro` node in the tree, in order to start the pomodoro timer.

1. Start coding! When other developers join your session, their pomodoro will automatically synchronize with you, so that you share a single timer.

## Configuration

By default, the pomodoro uses the following settings, which can be fully customized to meet your preferences:

| Setting | Description | Default Value |
| --------|-------------|-------------|
| Interval Count | The number of intervals per pomodoro | `4` |
| Interval Duration | The duration (in minutes) of each interval | `25` |
| Break Duration | The duration (in minutes) of each break between intervals | `5` |
| Long Break Duration | The duration (in minutes) of the long break at the end of the pomodoro | `15` |