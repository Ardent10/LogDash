import { Route, Routes } from "react-router-dom";
import { Home } from "@modules/home/pages/home";
import { BrowserRouter } from "react-router-dom";
import { SearchLogs } from "@modules/home/pages/searchLogs";
import { IngestLogs } from "@modules/home/pages/ingestLogs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search-logs" element={<SearchLogs />} />
        <Route path="/ingest-logs" element={<IngestLogs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
