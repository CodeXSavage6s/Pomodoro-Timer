const PageContext = React.createContext();

function PageProvider({ children }) {
  const [page, setPage] = React.useState("pomodoro");

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
    <div className="absolute block left-0 top-0">
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

          <label className="cursor-pointer px-3 rounded-md has-[:checked]:bg-blue-950"
          onClick={() => {
                setPage("time");
                setSeen(false)}}>
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
              onChange={() => setPage("stopwatch")}
            />
            Stop Watch
          </label>

          <label className="cursor-pointer px-3 rounded-md has-[:checked]:bg-blue-950">
            <input
              type="radio"
              name="nav"
              className="hidden"
              onChange={() => setPage("alarm")}
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
  if (page === "stopwatch") return <h1 className="text-6xl py-[30vh]">Stop Watch</h1>;
  if (page === "alarm") return <h1 className="text-6xl py-[30vh]">Alarm</h1>;

  return <h1 className="text-6xl py-[30vh]">Account</h1>;
}

function CountDown() {
  const [time, setTime] = React.useState(25 * 60 * 1000);
  const [running, setRunning] = React.useState(false);

  React.useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setTime(t => {
        if (t <= 10) {
          clearInterval(interval);
          setRunning(false);
          return 0;
        }
        return t - 10;
      });
    }, 10);

    return () => clearInterval(interval);
  }, [running]);

  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const millis = Math.floor((time % 1000) / 10);

  return (
    <div id="CountDown" className="text-center justify-self-center font-black leading-[2]">
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
        <button onClick={() => !running && setRunning(true)} className="btn">Start</button>
        <button onClick={() => setRunning(false)} className="btn">Stop</button>
        <button onClick={() => { setTime(25 * 60 * 1000); setRunning(false); }} className="btn">
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
    <h1 className="text-6xl font-black py-5 align-self-center justify-center py-[30vh]">{time}</h1>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <PageProvider>
    <App />
    <SideBar />
  </PageProvider>
);

