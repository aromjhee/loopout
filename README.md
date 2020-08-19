# Loop Out
- I want users to be able to schedule their day out even down to 10seconds so that they can automate their schedule and not worrying about if they are on schedule or not
- for example: can create schedule for brushing teeth
    - 30sec top right inside
    - 30sec top left inside
    ...
- for example: schedule from when to wake up to how long I should take brushing my teeth, when and how long to get ready, etc
- then be able to share this with other users to try out for themselves

# Feature
- Timer / "Schedule" / "Time Segment" / "Session"
    - 00:00:00 ~ 24:00:00
        - input
        - slider
    - Label: title/name
    - Sound
    - button for +1s, +5s, +10s, +15s, +1m, +3m, +5m, +10m
- Be able to save
    - table to store beginTime, endTime, label
- Pie Chart summarizing the day's time table
    - color code by 15sec, 30sec, 1min, 3min, etc
       OR
      just different color codes per segment
- Home page
- Calendar

# Model
- Time Table
    - activityName
        - future implementation
    - sessionName
    - startTime
    - endTime
    - breakTime
        - future implementation

# Component
- BreakLength??
- Timer

# Technologies & Packages
- Tailwind
- React Countup
- React Mobile Picker
- Howler
- FontAwesome Icons

# Future Implementation
- fun/interactive event when stopping the individual alarms
    - when alarm rings, you must push stop in 15seconds and when you do it takes a selfie. at the end of the "day" it will compile all the selfies into one image or video or gif or what not so you can upload that as well
- drag-n-drop to re-order sessions
- Repeat: Mon ~ Sun, Everyday, Every other day, Weekdays, Weekends

# Live Link
[LoopOut](https://loopout.herokuapp.com/)
[backend](https://loopout-backend.herokuapp.com/)

# Back end repo
[backend repo](https://github.com/aromjhee/loopout-backend)