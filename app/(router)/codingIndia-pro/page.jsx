"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Script from "next/script";
import React from "react";
import { useState } from "react";

function CodingIndiaPro() {
  const [subscriptionId, setSubscriptionId] = useState(null);
  const createSubscription = async (planId) => {
    axios
      .post(
        "/api/create-subscription",
        JSON.stringify({
          plan_id: planId,
        })
      )
      .then((resp) => {
        console.log(resp.data);
        setSubscriptionId(resp.data.id);
        makePayment();
      });
  };

  const makePayment = () => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_LIVE_KEY,
      subsription_id: subscriptionId,
      name: "Coding India",
      description: "Coding India Pro membership",
      handler: async (resp) => {
        console.log(resp);
      },
      theme: {
        color: "#7D41E1",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  return (
    <div>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      ></Script>
      <Button
        className="text-white bg-primary"
        onClick={() => {
          createSubscription("plan_NaO7qwOF8mP1dI");
        }}
      >
        Monthly
      </Button>
    </div>
  );
}

export default CodingIndiaPro;
