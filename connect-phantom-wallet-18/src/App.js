import './App.css';

function App() {
  let isListen = false;
  const connectPhantom = () => {
    try {
      window.solana.connect();
      if (isListen) return;
      window.solana.on("connect", () => {
        const provider = getProvider();
        if (!provider) return;
        const pubKey = provider.publicKey.toString();
        const message = `Your connected with public key: ${pubKey}`;
        console.log(message);
        alert(message);
        isListen = true;
      });
    } catch { };
  }

  const getProvider = () => {
    if ("solana" in window) {
      const provider = window.solana;
      if (provider.isPhantom) return provider;
    }
    window.open("https://phantom.app", "_blank");
    return null;
  }

  return (
    <div className="App">
      <button
        onClick={() => connectPhantom()}
      >connect phantom</button>
    </div>
  );
}

export default App;
