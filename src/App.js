import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { GoodsProvider } from "goods-core";
import ApolloInit from "./apollo-init";
import { AppProvider } from "./context/app.context";
import Pages from "./pages";

function App() {
  return (
    <ApolloInit>
      <GoodsProvider noGlobalStyle>
        <Router>
          <AppProvider>
            <Pages />
          </AppProvider>
        </Router>
      </GoodsProvider>
    </ApolloInit>
  );
}

export default App;
