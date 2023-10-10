import React, { useContext, useEffect, useState } from "react"
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer"
import {
  IPaymentJob,
  ITableJob,
} from "../../global_variable/global_table_admin"
import Logo from "../../assets/images/logoo.png"
import axios from "axios"
import { getProxy } from "../../utils/PathUtil"
import { AuthContext } from "../../contexts/AuthContext"

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
  },
  table: {
    flexDirection: "column",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
})

const InvoicePdf = ({ job }: { job: IPaymentJob }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "32pt",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text
              style={{
                fontSize: "12pt",
                fontWeight: "bold",
                color: "#5e17eb",
              }}
            >
              KolBooking
            </Text>
          </View>
          <Text
            style={{
              fontSize: "12pt",
              fontWeight: "light",
              color: "#EF273D",
            }}
          >
            VAT invoice
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: "16pt" }}>KOL booking payment invoice</Text>
        </View>
        <View style={{ marginTop: "5pt" }}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text
              style={{
                fontSize: "10pt",
                marginRight: "5pt",
              }}
            >
              Owner name:
            </Text>
            <Text style={{ fontSize: "10pt" }}>{job.fullname_owner}</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text
              style={{
                fontSize: "10pt",
                fontWeight: "bold",
                marginRight: "5pt",
              }}
            >
              Invoice status:
            </Text>
            <Text style={{ fontSize: "10pt" }}> {job.status}</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text
              style={{
                fontSize: "10pt",
                fontWeight: "bold",
                marginRight: "5pt",
              }}
            >
              Export time:
            </Text>
            <Text
              style={{ fontSize: "10pt" }}
            >{`${new Date().toDateString()}`}</Text>
          </View>
        </View>

        <View
          style={{
            paddingHorizontal: "5pt",
            width: "100%",
            borderBottom: "1pt solid #64B9E5",
            borderTop: "1pt solid #64B9E5",
            marginTop: "10pt",
            fontSize: "10pt",
          }}
        >
          <View
            style={{
              marginTop: "5pt",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text>Title Job</Text>
            <Text>Price</Text>
          </View>
          <View
            style={{
              marginTop: "5pt",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text>{job.job_title}</Text>
            <Text>{job.price}</Text>
          </View>
          <View
            style={{
              marginTop: "5pt",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text></Text>
            <Text>Total</Text>
          </View>
          <View
            style={{
              marginTop: "5pt",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text></Text>
            <Text>{job.price}</Text>
          </View>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "20pt",
          }}
        >
          <View>
            <Text
              style={{
                fontSize: "12pt",
                fontWeight: "bold",
              }}
            >
              Customer Signature
            </Text>
          </View>
          <Text
            style={{
              fontSize: "12pt",
              fontWeight: "light",
            }}
          >
            Kol Signature
          </Text>
        </View>
      </View>
    </Page>
  </Document>
)

export default InvoicePdf
