import "zd-styles/es/Button.css";
import React from "react";
import ReactDOM from "react-dom";
import SingleLine from "./components/SingleLine";
import Subform from "./components/Subform";
import Main from "./components/Main";

window.onload = function() {
  ZOHODESK.extension.onload().then(function(App) {
    const MainApp = () => {
      return (
        <div>
          {/* <Subform
            title="Domain Mapping"
            row={[
              <SingleLine placeholder="Domain" />,
              <SingleLine placeholder="From Address" />,
            ]}
          /> */}
          <Main />
        </div>
      );
    };

    ReactDOM.render(<MainApp />, document.getElementById("root"));
  });
};
