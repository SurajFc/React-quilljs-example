import { Container, Stack } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import Basic from "./components/Basic";
// import CustomizedToolbar from "./components/CustomizedToolbar";
// import CustomToolbar from "./components/CustomToolbar";
// import MentionEditor from "./components/MentionEditor";

function App() {
  return (
    <div className="App">
        <Navbar />
      <Container>
        <Stack alignItems={"center"}>
          <Basic />
          {/* <CustomizedToolbar /> */}
          {/* <CustomToolbar /> */}
          {/* <MentionEditor /> */}
        </Stack>
      </Container>
    </div>
  );
}

export default App;
