

const PageContext = React.createContext();
const ALARM_SRC =
  "https://res.cloudinary.com/dukt0xrnt/video/upload/v1769338311/mixkit-sport-start-bleeps-918_fc1qhs.wav";


function PageProvider({ children }) {
  const [page, setPage] = React.useState();

  return (
    <PageContext.Provider value={{ page, setPage }}>
      {children}
    </PageContext.Provider>
  );
}

function SideBar() {
  const [seen, setSeen] = React.useState(false);
  const { setPage } = React.useContext(PageContext);

  return (
    <div className="absolute block left-5 top-5">
      <i
        className="fa-solid fa-bars text-blue-900 text-2xl sm:hidden"
        hidden={seen}
        onClick={() => setSeen(n => !n)}
      />

      <div
        className="sid leading-[3] p-2 shadow-xl rounded-md sm:block"
        hidden={!seen}
      >
        <i
          className="absolute fa-solid fa-xmark right-4 top-4 text-xl sm:hidden"
          onClick={() => setSeen(n => !n)}
        />
        <br />

        <div className="flex flex-col gap-1">

          <label className="cursor-pointer px-3 rounded-md has-[:checked]:bg-blue-950">
            <input
              type="radio"
              name="nav"
              className="hidden"
              defaultChecked
              onChange={() => setPage("account")}
            />
            Account
          </label>

          <label className="cursor-pointer px-3 rounded-md has-[:checked]:bg-blue-950">
            <input
              type="radio"
              name="nav"
              className="hidden"
              onChange={() => {
                setPage("time");
                setSeen(false);
              }}
            />
            Current Time
          </label>

          <label className="cursor-pointer px-3 rounded-md has-[:checked]:bg-blue-950">
            <input
              type="radio"
              name="nav"
              className="hidden"
              onChange={() => {
                setPage("pomodoro");
                setSeen(false);
              }}
            />
            Pomodoro Time
          </label>

          <label className="cursor-pointer px-3 rounded-md has-[:checked]:bg-blue-950">
            <input
              type="radio"
              name="nav"
              className="hidden"
              onChange={() => {setPage("stopwatch"); setSeen(n => !n)}}
            />
            Stop Watch
          </label>

          <label className="cursor-pointer px-3 rounded-md has-[:checked]:bg-blue-950">
            <input
              type="radio"
              name="nav"
              className="hidden"
              onChange={() => {setPage("alarm"); setSeen(n => !n)}}
            />
            Alarm
          </label>

        </div>
      </div>
    </div>
  );
}

function App() {
  const { page } = React.useContext(PageContext);

  if (page === "time") return <Time />;
  if (page === "pomodoro") return <CountDown />;
  if (page === "stopwatch") return <StopWatch />
  if (page === "alarm") return <Alarm />

  return <h1 className="text-5xl py-[30vh] text-red-500 justify-self-center max-w-[400px]">This features is not yet available till official version</h1>;
}

function CountDown() {
  const audioRef = React.useRef(null);
  const [time, setTime] = React.useState(25 * 60 * 1000);
  const [running, setRunning] = React.useState(false);
  const [play, setPlay] = React.useState(false);

  React.useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setTime(t => {
        if (t <= 10) {
          clearInterval(interval);
          setRunning(false);
          setPlay(true)
          return 0;
        }
        return t - 10;
      });
    }, 10);

    return () => clearInterval(interval);
  }, [running]);

  React.useEffect(() => {
    if (!audioRef.current) return;

    if  (play) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [play]);


  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const millis = Math.floor((time % 1000) / 10);

  return (
    <div id="CountDown" className="text-center justify-self-center font-black leading-[2] mt-[20vh]">
      <h1 className="text-blue-700 text-5xl font-black text-center" size>Pomodoro Timer</h1>
      <div className="inline-flex gap-4">
  <label className="cursor-pointer has-[:checked]:border-b-[1vh] border-b-blue-900">
    <input
      type="radio"
      name="mode"
      className="hidden"
      defaultChecked
      onChange={() => setTime(25 * 60 * 1000)}
    />
    Focus
  </label>

  <label className="cursor-pointer has-[:checked]:border-b-[1vh] border-b-blue-900">
    <input
      type="radio"
      name="mode"
      className="hidden"
      onChange={() => setTime(5 * 60 * 1000)}
    />
    Short Break
  </label>

  <label className="cursor-pointer has-[:checked]:border-b-[1vh] border-b-blue-900">
    <input
      type="radio"
      name="mode"
      className="hidden"
      onChange={() => setTime(30 * 60 * 1000)}
    />
    Long Break
  </label>
</div>
<h1 className="text-6xl font-black py-5">
        {minutes}:{seconds.toString().padStart(2, "0")}:
        {millis.toString().padStart(2, "0")}
      </h1>
      <div className="inline-flex text-center gap-2 text-[small] text-gray-400">
      <span className="span" onClick={() => setTime(n => n + (15 * 60 * 1000))}>+15Min</span><span className="span" onClick={() => setTime(n => n + (5 * 60 * 1000))}>+5Min</span><span className="span" onClick={() => setTime(n => n + (30 * 1000))}>+30Secs</span><span className="span" onClick={() => setTime(n => n * 0)}>0:0</span><span className="span" onClick={() => setTime(n => n - (30 * 1000))}>-30Secs</span><span className="span" onClick={() => setTime(n => n - (5 * 60 * 1000))}>-5Min</span><span className="span" onClick={() => setTime(n => n - (15 * 60 * 1000))}>-15Min</span>  
      </div> 
      <div id="btns" className="flex justify-center gap-8">
        <button 
          onClick={() => {
                if (!running) {
                setPlay(false);
                setRunning(true);
              }
            }}
          className="btn">
          Start
        </button>
        <button 
          onClick={() => {setRunning(false); setPlay(false)}} 
          className="btn">
          Stop
        </button>
        <button  
          onClick={() => { setTime(25 * 60 * 1000); setRunning(false); setPlay(false)}} 
          className="btn">
          Reset
        </button>
      </div>

      <br />
      <input
        className="rounded-xl px-[9px] bg-blue-500 placeholder:italic"
        type="number"
        placeholder="Set Seconds..."
        onFocus={() => setRunning(false)}
        onChange={e => setTime(e.target.value * 1000)}
        onKeyDown={e => e.key === "Enter" && setRunning(true)}
      />
      <audio
        ref={audioRef}
        src={ALARM_SRC}
        preload="auto"
      />

    </div>
  );
}

function Time() {
  function getTime() {
    const d = new Date();
    let hours = d.getHours();
    const minutes = d.getMinutes().toString().padStart(2, "0");
    const sec = d.getSeconds().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    return `${hours}:${minutes}:${sec} ${ampm}`;
  }

  const [time, setTime] = React.useState(getTime());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
    <h1 className="text-6xl font-black py-5 text-center py-[30vh]">{time}</h1>
    </div>
  )
}

function StopWatch() {
  const [time, setTime] = React.useState(0); // ms
  const [running, setRunning] = React.useState(false);
  const [limit, setLimit] = React.useState(25 * 60 * 1000); 
  const audioRef = React.useRef(null);
  const [play, setPlay] = React.useState(false);

  React.useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setTime(t => {
        if (t >= limit) {
          clearInterval(interval);
          setRunning(false);
          setPlay(true)
          return t;
        }
        return t + 10;
      });
    }, 10);

    return () => clearInterval(interval);
  }, [running, limit]);

  React.useEffect(() => {
  if (!audioRef.current) return;

  if (play) {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  } else {
    audioRef.current.pause();
  }
}, [play]);

  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const millis = Math.floor((time % 1000) / 10);

  return (
    <div
      id="CountDown"
      className="justify-self-center align-self-center py-[20vh] box-border"
    >
      <h1 className="text-blue-700 text-5xl font-black text-center " size>Stop Watch</h1>
      <h1 className="text-6xl font-black py-5 text-center">
        {minutes}:{seconds.toString().padStart(2, "0")}:
        {millis.toString().padStart(2, "0")}
      </h1>

      <div className="flex justify-between font-bold">
        <button onClick={() => !running && setRunning(true)} className="btn">
          Start
        </button>
        <button onClick={() => setRunning(false)} className="btn">
          Stop
        </button>
        <button
          onClick={() => {
            setTime(0);
            setRunning(false);
            setPlay(false)
          }}
          className="btn"
        >
          Reset
        </button>
      </div>

      <br />
      <input
        type="number"
        placeholder="Set Seconds..."
        onFocus={() => setRunning(false)}
        onChange={e => setLimit(e.target.value * 1000)}
        onKeyDown={e => e.key === "Enter" && setRunning(true)}
        className="bg-blue-950 rounded-2xl p-1"
      />
      <audio ref={audioRef} src={ALARM_SRC} preload="auto" />

    </div>
  );
}

function Alarm() {
  const [alarm, setAlarm] = React.useState(null);
  const [timeLeft, setTimeLeft] = React.useState("Set an alarm");

  const [targetDate, setTargetDate] = React.useState(null);
  const [dateLeft, setDateLeft] = React.useState("Pick a date");

  const [length, setLength] = React.useState("short");

  const audioRef = React.useRef(null);
  const [play, setPlay] = React.useState(false);


  /* ---------- SHORT (TIME) ---------- */
  function calculateTimeLeft() {
    if (!alarm) return "Set an alarm";

    const now = new Date();
    let diff = alarm - now;

    /*if (diff < 0) {
      setPlay(true)
      const tomorrow = new Date(alarm);
      tomorrow.setDate(tomorrow.getDate() + 1);
      diff = tomorrow - now;
    }*/

      if (diff <= 0) {
        setPlay(true);
        return "00:00:00";
      }


    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  React.useEffect(() => {
    if (length !== "short") return;

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [alarm, length]);

  function handleAlarmChange(e) {
    const [h, m] = e.target.value.split(":");

    const alarmDate = new Date();
    alarmDate.setHours(h, m, 0, 0);

    setAlarm(alarmDate);
  }

  /* ---------- LONG (DATE) ---------- */
  function calculateDateLeft() {
    if (!targetDate) return "Pick a date";

    const now = new Date();
    let diff = targetDate - now;

    if (diff <= 0) {
      setPlay(true);
      return "Date reached 🎉";
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return `${days}d ${hours}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  React.useEffect(() => {
    if (length !== "long") return;

    const interval = setInterval(() => {
      setDateLeft(calculateDateLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, length]);

  React.useEffect(() => {
  if (!audioRef.current) return;

  if (play) {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  } else {
    audioRef.current.pause();
  }
}, [play]);

  function handleDateChange(e) {
    const date = new Date(e.target.value);
    date.setHours(0, 0, 0, 0);
    setTargetDate(date);
  }

  /* ---------- UI ---------- */
  return (
    <div className="text-center justify-self-center mt-[20vh]">
      <h1 className="text-blue-700 text-5xl font-black text-center">
        Alarm
      </h1>

      <div className="flex justify-between mb-[5vh] g-[2vh]">
        <label className="cursor-pointer has-[:checked]:border-b-[1vh] border-b-blue-900">
          <input
            type="radio"
            name="modeA"
            className="hidden"
            defaultChecked
            onChange={() => {setLength("short"); setPlay(false)}}
          />
          Short Alarm
        </label>

        <label className="cursor-pointer has-[:checked]:border-b-[1vh] border-b-blue-900">
          <input
            type="radio"
            name="modeA"
            className="hidden"
            onChange={() => {setLength("long"); setPlay(false)}}
          />
          Long Alarm
        </label>
      </div>

      {length === "short" && (
        <input
          type="time"
          className="bg-blue-950 text-white p-2 rounded-[5vh] w-[100%]"
          onChange={handleAlarmChange}
        />
      )}

      {length === "long" && (
        <input
          type="date"
          className="bg-blue-950 text-white p-2 rounded-[5vh] w-[100%]"
          onChange={handleDateChange}
        />
      )}

      <div className="text-4xl font-black mt-5 text-center">
        {length === "short" ? timeLeft   : dateLeft} 
      </div>
      <audio ref={audioRef} src={ALARM_SRC} preload="auto" />
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(
  <PageProvider>
    <App />
    <SideBar />
  </PageProvider>
);
