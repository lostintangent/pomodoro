# Live Share Pomodoro

Live Share Pomodoro enhances the existing [Visual Studio Live Share](https://aka.ms/vsls) experience, by enabling you to use the [Pomodoro technique](https://francescocirillo.com/pages/pomodoro-technique) for time management within collaboration sessions. All participants within the session work against the same synchronized timer, and can stop and reset it collaboratively. For certain use cases (e.g. pair programming), this can provide a useful means of adding structure to the Live Share session (e.g. enforcing when to take breaks, providing a moment to switch roles), without needing to rely on a seperate tool or individual preference.

<img src="https://user-images.githubusercontent.com/116461/55851314-f5052100-5b0c-11e9-9cd2-61dbc5597522.gif" width="725px" />

## Getting Started

To begin using the collaborative pomodoro within your Visual Studio Live Share sessions, simply perform the following steps:

1. Install this extension, then reload VS Code

1. Click the `Live Share` button in your status bar to start a new collaboration session, and invite the developers you'd like to collaborate with.

   <img src="https://aka.ms/vsls/quickstart/share" width="140px" />

   > Make sure the developers you're collaborating with also have the Live Share Pomodoro extension installed.

1. Open the Live Share `Session Details` view, and click the `Ready to work!` item under the `Pomodoro` node, in order to start the pomodoro timer.

   <img width="324" src="https://user-images.githubusercontent.com/116461/55852132-8d50d500-5b10-11e9-9784-d1fdc882155c.png">

1. Start coding! When other developers join your session, their pomodoro will automatically synchronize with you, so that you share a single timer, and all know when to stop and take a break.

When an interval is completed, it will automatically roll into a break. However, once a break is completed, you need to explicitly start the timer again, in order to begin the next interval. As you complete intervals, the `Pomodoro` tree node will update to show the number of intervals you've completed, as well as display a checkmark for each completed interval. Once you complete all intervals, the pomodoro is done, and you can choose to start a new one.

<img width="322" src="https://user-images.githubusercontent.com/116461/55852148-9b065a80-5b10-11e9-8acc-ff825a84533d.png">

If at any time during an interval, you need to step away, you can simply click the timer node (or right-click it and select `Stop`), which will reset the current interval back to its original duration (e.g. 25 minutes). When you're ready to start working again, simply click the timer node again to re-start the interval (or right-click it and select `Start`). If you need to rest the entire pomodoro, you can right-click the `Pomodoro` node and select `Reset`.

## Configuration

By default, the pomodoro uses the following standard settings, which can be fully customized to meet your preferences:

| Setting | Description | Default Value |
| --------|-------------|-------------|
| Interval Count | The number of intervals per pomodoro | `4` |
| Interval Duration | The duration (in minutes) of each interval | `25` |
| Break Duration | The duration (in minutes) of each break between intervals | `5` |
| Long Break Duration | The duration (in minutes) of the long break at the end of the pomodoro | `15` |