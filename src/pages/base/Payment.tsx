import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import CheckoutForm from "./CheckoutForm"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { getProxy } from "../../utils/PathUtil"
import { useParams } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import { Job } from "../../global_variable/global_type"
import { fetchDataToJob } from "../../utils/FetchData"
import { ErrorContext } from "../../contexts/ErrorContext"
import { ToastContext } from "../../contexts/ToastContext"
import { HandleResponseError } from "../../utils/ErrorHandleUtil"

const stripePromise = loadStripe(
  "pk_test_51Ncgu3JD1fB4LR0qbOTp0PsHQTEg8Ut5aawu1SaxrRUcdT3HEN1FNc8175IF49X6nxymbktyk7bA2OsVB0gvOlqq00kowuH95h"
)

export default function Payment() {
  const { state: auth_state } = useContext(AuthContext)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [paymentId, setPaymetId] = useState<string | null>(null)
  const [data, setData] = useState<Job>({
    id: "",
    title: "",
    description: "",
    profile_id: "",
    price: 0,
    requirement: "",
    kol_id: "",
    image: "",
    benefits: "",
    time_work: "",
  })
  const params = useParams()
  const { setErrorCode } = useContext(ErrorContext)
  const { dispatch: toast_dispatch } = useContext(ToastContext)
  const price = 2000

  const config = {
    headers: {
      Authorization: auth_state.auth_token,
    },
  }
  useEffect(() => {
    axios
      .get(getProxy(`/api/v1/base/invoices/${params.id}`), config)
      .then((res) => {
        setPaymetId(res.data.data.attributes.stripe_id)
        setData(fetchDataToJob(res.data.data.attributes))
      })
      .catch((error) => {
        HandleResponseError(error, setErrorCode, toast_dispatch)
      })
  }, [])

  useEffect(() => {
    if (data.id !== "" && paymentId === null) {
      const param = {
        amount: price,
        currency: "usd",
        description: "Job invoice",
      }
      axios
        .post(getProxy("/api/v1/base/payment_intents"), param)
        .then((res) => {
          setClientSecret(res.data.client_secret)
          const body = {
            job_id: data.id,
            stripe_payment_id: res.data.id,
          }
          axios
            .put(getProxy("/api/v1/base/payment_intents/update_job"), body)
            .then((res) => {
              console.log(res)
            })
            .catch((error) => {
              HandleResponseError(error, setErrorCode, toast_dispatch)
            })
        })
        .catch((error) => {
          // console.log(error)
          HandleResponseError(error, setErrorCode, toast_dispatch)
        })
    } else if (data.id !== "" && paymentId !== null) {
      console.log(paymentId === null)
      axios
        .get(getProxy(`/api/v1/base/payment_intents/${paymentId}/retrieve`))
        .then((res) => {
          setClientSecret(res.data.client_secret)
        })
        .catch((error) => {
          console.log(error)
          HandleResponseError(error, setErrorCode, toast_dispatch)
        })
    }
  }, [data])

  const options = {
    clientSecret: clientSecret || "",
  }

  return (
    <>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm job={data} />
        </Elements>
      )}
    </>
  )
}
