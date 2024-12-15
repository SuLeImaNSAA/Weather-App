import "./App.css";
import SearchBarComponent from "./components/search/SearchBarComponent";
import Container from "@mui/material/Container";
function App() {
  return (
    <div className="App" style={{ marginTop: "80px" }}>
      <Container
        maxWidth="md"
        style={{
          background: "#00bee7",
          maxHeight: "60%",
          borderRadius: "20px",
        }}
      >
        {" "}
        <SearchBarComponent />
      </Container>
    </div>
  );
}

export default App;
