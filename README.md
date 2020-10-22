# Loop Out is is optimized for mobile experience
![LoopOut.gif](public/image/loopOut.gif)

## Live Link
- [LoopOut](https://loopout.herokuapp.com/)
- [backend](https://loopout-backend.herokuapp.com/1)

## Back end repo
- [backend repo](https://github.com/aromjhee/loopout-backend)

# Loop Out
- I want users to be able to schedule their activity down to even 10 seconds so that users can automate their schedule without having to worry about if they are on schedule or if they have forgotten a task
    - ex: a morning routine activity that lists how long I should take to head to the bathroom, brush my teeth, get ready, eat breakfast, put on shoes, walk to the train station, etc.
- I want users to share their activity schedule with others
    - ex: a whole day routine for working adults to lose weight

# Features
- Timer
    - displays duration of the first session on load
        - after each session, timer loads new duration
    - Alarm with sound after each session reaches 00:00:00
    - +1s, +5s, +10s, +15s, +1m, +3m, +5m, +10m buttons for easier input
    - clear seconds, minutes, and hours button
- Be able to save new session
    - table updates for each session added
- Pie Chart summarizing the session's time table
    - different color per segment
    - each segment can be clicked to show its session name
- Home page
- User Auth

# Database Model
- User
- Time
    - sessionName
    - duration

# Technologies & Packages
- Front end
    - React
    - Tailwind CSS
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
- Had to encode password to utf-8 then decode again after hashing because PostgreSQL automatically converts text encoding before saving to the database.
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
        - can save and load different activities
        - ex: "Get Kids Ready for School"
    - breakTime
        - can specify how long the alarm will ring before automatically turning off the alarm and load the next session
- be able to share and download other user's activity on via social media
- fun/interactive event when stopping alarm
    - ex: when alarm rings, you must push stop in 15seconds and when you do it takes a selfie. at the end of an activity it will compile all the selfies into one image or video or gif so user can upload that to social media of their choosing
- Repeat feature
    - Mon ~ Sun, Everyday, Every other day, Weekdays, Weekends
- Calendar