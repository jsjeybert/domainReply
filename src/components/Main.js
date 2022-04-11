import React, { useState, useEffect } from "react";
import Subform from "./Subform";
import SingleLine from "./SingleLine";

const Main = () => {
  let departmentId = null;
  const [preference, preferenceController] = useState([]);
  console.log("PREFERENCE", preference);
  useEffect(() => {
    // Get Department
    ZOHODESK.get("department.id")
      .then(function(response) {
        if ("status" in response && response["status"] == "success") {
          if ("department.id" in response) {
            departmentId = response["department.id"];
            // Fetch Database based on department as Key
            ZOHODESK.get("database", {
              key: departmentId,
              queriableValue: "preference",
            })
              .then(function(response) {
                if (
                  "database.get" in response &&
                  Object.keys(response["database.get"]).length == 0
                ) {
                  console.log("Empty", departmentId);

                  // Load subform with empty row

                  //   ZOHODESK.set("database", {
                  //     key: departmentId,
                  //     value: {
                  //       data: [
                  //         {
                  //           domain: "gmail.com",
                  //           fromAddress: "sjeybert@gmail.com",
                  //         },
                  //         {
                  //           domain: "zohocorp.com",
                  //           fromAddress: "shanthaji.jeybert@.com",
                  //         },
                  //       ],
                  //     },
                  //     queriableValue: "preference",
                  //   })
                  //     .then(function(response) {
                  //       // response returns the value saved
                  //       console.log(response);
                  //     })
                  //     .catch(function(err) {
                  //       // Error handling
                  //       console.log(err);
                  //     });
                } else {
                  console.log("not empty");
                  if (
                    "database.get" in response &&
                    Object.keys(response["database.get"]).length > 0 &&
                    "data" in response["database.get"] &&
                    Object.keys(response["database.get"]["data"]).length > 0
                  ) {
                    let data = response["database.get"]["data"][0];
                    if (
                      "value" in data &&
                      Object.keys(data["value"].length > 0) &&
                      "data" in data["value"]
                    ) {
                      let allPreference = data["value"]["data"];
                      if (allPreference.length > 0) {
                        preferenceController(allPreference);
                      }
                    }
                    // Load subform with Data
                  }
                }
                //response returns the value, based on the key specified
              })
              .catch(function(err) {
                console.log(err);
                // Error handling
              });
          }
        }
        // response requested-detail
      })
      .catch(function(err) {
        console.log(err);
        // Error Handling
      });
  }, []);

  return (
    <div>
      <Subform
        title="Domain Mapping"
        row={[
          <SingleLine placeholder="Enter Domain" />,
          <SingleLine placeholder="From Address" />,
        ]}
        data={preference}
      />
    </div>
  );
};
export default Main;
