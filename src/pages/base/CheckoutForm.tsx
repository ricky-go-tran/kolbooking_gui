import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js"
import { useEffect, useState } from "react"
import { getFEHost } from "../../utils/PathUtil"
import ImageOffice from "../../assets/images/create-account-office.jpeg"
import { Job } from "../../global_variable/global_type"

const CheckoutForm = ({ job }: { job: Job }) => {
  const [message, setMessage] = useState<string | undefined | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    if (!stripe) {
      return
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    )

    if (!clientSecret) {
      return
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (paymentIntent === undefined) {
        setMessage("Something went wrong.")
        return
      }
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!")
          break
        case "processing":
          setMessage("Your payment is processing.")
          break
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.")
          break
        default:
          setMessage("Something went wrong.")
          break
      }
    })
  }, [stripe])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: getFEHost("/paymentComplete"),
      },
    })
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message)
    } else {
      setMessage("An unexpected error occured.")
    }

    setIsLoading(false)
  }

  return (
    <div className="relative mx-auto w-full bg-white">
      <div className="grid min-h-screen grid-cols-10">
        <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
          <div className="mx-auto w-full max-w-lg">
            <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">
              Checkout
              <span className="mt-2 block h-1 w-10 bg-teal-600 sm:w-20"></span>
            </h1>
            <form
              id="payment-form"
              className="mt-10 flex flex-col space-y-4"
              onSubmit={(e) => {
                handleSubmit(e)
              }}
            >
              <PaymentElement id="payment-element" />
              <button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className="mt-4 inline-flex w-full items-center justify-center rounded bg-teal-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg"
              >
                <span id="button-text">
                  {isLoading ? (
                    <div className="spinner" id="spinner"></div>
                  ) : (
                    "Pay now"
                  )}
                </span>
              </button>
              {message && <div id="payment-message">{message}</div>}
            </form>
          </div>
        </div>
        <div className="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
          <h2 className="sr-only">Order summary</h2>
          <div>
            <img
              src={ImageOffice}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-teal-800 to-teal-400 opacity-95"></div>
          </div>
          <div className="relative">
            <ul className="space-y-5">
              <li className="flex justify-between">
                <div className="inline-flex">
                  <img
                    src="https://images.unsplash.com/photo-1620331311520-246422fd82f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGhhaXIlMjBkcnllcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                    alt=""
                    className="max-h-16"
                  />
                  <div className="ml-3">
                    <p className="text-base font-semibold text-white">
                      {job.title}
                    </p>
                    <p className="text-sm font-medium text-white text-opacity-80">
                      {job.description}
                    </p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-white">
                  $ {job.price}
                </p>
              </li>
            </ul>
            <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
            <div className="space-y-2">
              <p className="flex justify-between text-lg font-bold text-white">
                <span>Total price:</span>
                <span>$ {job.price}</span>
              </p>
            </div>
          </div>
          <div className="relative mt-10 text-white">
            <h3 className="mb-5 text-lg font-bold">Support</h3>
            <p className="text-sm font-semibold">
              +84 867385787
              <span className="font-light">(Phone)</span>
            </p>
            <p className="mt-1 text-sm font-semibold">
              developer@opensource.com{" "}
              <span className="font-light">(Email)</span>
            </p>
            <p className="mt-2 text-xs font-medium">
              Call us now for payment related issues
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutForm
