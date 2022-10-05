import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export default function LabTabs(props) {
  const [value, setValue] = React.useState(props.testList[0].value);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {props.testList.map((listItem, index) => (
              <Tab label={listItem.label} value={listItem.value} key={index} />
            ))}
          </TabList>
        </Box>
        <TabPanel value={props.testList[0].value}>
          {props.testList[0].func}
        </TabPanel>
        <TabPanel value={props.testList[1].value}>
          {props.testList[1].func}
        </TabPanel>
      </TabContext>
    </Box>
  );
}
