import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    // flexDirection: "column",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
const MyDocument = (props) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View>
        <Text style={{ fontSize: "30px", textAlign: "center" }}>
          Salva Vita
        </Text>
      </View>
      <View style={styles.section}>
        <Text>First name: {props.firstname}</Text>
        <Text>Last name: {props.lastname}</Text>
        <Text>Email Address: {props.email}</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);

export default MyDocument;
