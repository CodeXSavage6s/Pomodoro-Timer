function App() {
    return (
        <div>
            <h1 className="text-blue-700 text-3xl font-black text-center" size>Pomodoro Timer</h1>
            <CountDown />
        </div>
    )
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
    <div id="CountDown" className="text-center font-medium leading-[2]">
      <h1>
        {minutes}:{seconds.toString().padStart(2, "0")}:
        {millis.toString().padStart(2, "0")}
      </h1>

      <div id="btns" className="flex justify-center gap-8">
        <button onClick={() => !running && setRunning(true)}>Start</button>
        <button onClick={() => setRunning(false)}>Stop</button>
        <button onClick={() => { setTime(25 * 60 * 1000); setRunning(false); }}>
          Reset
        </button>
      </div>

      <br />
      <input
        className="rounded-xl px-1 py-1 bg-blue-500"
        type="number"
        placeholder="Set Seconds..."
        onFocus={() => setRunning(false)}
        onChange={e => setTime(e.target.value * 1000)}
        onKeyDown={e => e.key === "Enter" && setRunning(true)}
      />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)