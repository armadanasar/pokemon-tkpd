import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { GlobalStyle, GoodsProvider, theme } from "goods-core";
import ApolloInit from "./apollo-init";
import { AppProvider } from "./context/app.context";
import Pages from "./pages";

export function CoreApp() {
  return (
    <GoodsProvider noGlobalStyle theme={theme}>
      <GlobalStyle />
      <Router>
        <AppProvider>
          <Pages />
        </AppProvider>
      </Router>
    </GoodsProvider>
  );
}

function App() {
  return (
    <ApolloInit>
      <CoreApp />
    </ApolloInit>
  );
}

export default App;
