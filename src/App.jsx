import { useState, useEffect, useCallback } from "react";
import { Copy, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";

export default function App() {
  const [theme, setTheme] = useState(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const [length, setLength] = useState(8);
  const [lowercase, setLowercase] = useState(true);
  const [uppercase, setUppercase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [special, setSpecial] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback( () => {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const nums = "0123456789";
    const specials = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let chars = "";
    if (uppercase) chars += upper;
    if (lowercase) chars += lower;
    if (numbers) chars += nums;
    if (special) chars += specials;
    let pass = "";
    for (let i = 0; i < length; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(pass);
  }, [length, lowercase, uppercase, numbers, special, setPassword]);

  useEffect(() => {
    generatePassword();
  }, [length, lowercase, uppercase, numbers, special, generatePassword]);

  const copyPassword = useCallback( () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  }, [password]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center transition-colors duration-500"
      style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-8 shadow-xl w-[90%] max-w-md transition"
        style={{ backgroundColor: "var(--card-color)" }}
      >
        <h1 className="text-2xl font-bold text-center mb-4">
          SECRET GENERATOR
        </h1>

        <div className="flex items-center border rounded-lg overflow-hidden">
          <input
            readOnly
            value={password}
            className="flex-1 px-3 py-2 bg-transparent outline-none"
          />
          <button onClick={generatePassword} className="pr-2 hover:opacity-70">
            <RefreshCcw size={20} />
          </button>
          <button
            onClick={copyPassword}
            className={`px-3 p-[10px] rounded-r-lg text-white text-sm transition ${
              copied ? "bg-teal-700" : "bg-teal-500 hover:bg-teal-600"
            }`}
          >
            {copied ? "Copied!" : <Copy size={18} />}
          </button>
        </div>

        <div className="mt-4 text-sm">
          <p>Secret Length: {length}</p>
          <input
            type="range"
            min="4"
            max="50"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-teal-500"
          />
        </div>

        <div className="flex flex-col mt-4 space-y-2 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={uppercase} onChange={() => setUppercase(!uppercase)} /> Uppercase
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={lowercase} onChange={() => setLowercase(!lowercase)} /> Lowercase
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={numbers} onChange={() => setNumbers(!numbers)} /> Numbers
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={special} onChange={() => setSpecial(!special)} /> Special Characters
          </label>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-xs text-teal-500 hover:underline cursor-pointer"
          >
            Switch to {theme === "dark" ? "Light" : "Dark"} Mode
          </button>
        </div>
      </motion.div>
    </div>
  );
}
