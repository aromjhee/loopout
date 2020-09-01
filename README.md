# Loop Out is is optimized for mobile experience

# Loop Out
- I want users to be able to schedule their day out even down to 10seconds so that they can automate their schedule and not worrying about if they are on schedule or not
- for example: can create schedule for brushing teeth
    - 30sec top right inside
    - 30sec top left inside
    ...
- for example: schedule from when to wake up to how long I should take brushing my teeth, when and how long to get ready, etc
- then be able to share this with other users to try out for themselves

# Feature
- Timer
    - displays duration of the first session on load
        - after each session, timer loads new duration
    - Alarm with sound after each session reaches 00:00:00
    - +1s, +5s, +10s, +15s, +1m, +3m, +5m, +10m buttons for easier input
- Be able to save new session
    - table updates for each session added
- Pie Chart summarizing the session's time table
    - different color per segment
    - each segment can be clicked to show its session name
- Home page
- User Auth
- Calendar

# Database Model
- Time
    - sessionName
    - duration

# Component
- BreakLength??
- Timer

# Technologies & Packages
- Front end
    - React
    - Tailwind
    - react-countup
    - Howler
    - FontAwesome Icons
    - postcss-cli
    - SCSS
- Back end
    - Python
    - Flask
    - SQLAlchemy
    - Alembic
    - PostgreSQL
    - Flask-Migrate
    - Psycopg
    - Flask-JWT-Extended
    - Bcrypt

# Technical Challenge
- Had to encode password to utf-8 then decode again after hashing because PostgreSQL automatically converts text encoding before saving.
    - in the register route:
        ```python
        hashed_password = bcrypt.hashpw(
            password.encode('utf-8'), bcrypt.gensalt()
        ).decode('utf-8')
        ```

# Future Implementation
- drag-n-drop to re-order sessions
- add to database modal
    - activityName
        - can save and load individual activity
        - ex: "Get Kids Ready for School"
        - ex: "Chill Weekend"
    - breakTime
        - can specify how long the alarm will ring before automatically turning off the alarm and load the next session
- be able to share and download other user's activity on via social media
- fun/interactive event when stopping the individual alarms
    - when alarm rings, you must push stop in 15seconds and when you do it takes a selfie. at the end of the "day" it will compile all the selfies into one image or video or gif or what not so you can upload that as well
- Repeat feature
    - Mon ~ Sun, Everyday, Every other day, Weekdays, Weekends

# Live Link
- [LoopOut](https://loopout.herokuapp.com/)
- [backend](https://loopout-backend.herokuapp.com/)

# Back end repo
- [backend repo](https://github.com/aromjhee/loopout-backend)