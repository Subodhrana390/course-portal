"use client";
import GlobalAPI from "@/app/_utils/GlobalAPI";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Script from "next/script";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "sonner";

function CodingIndiaPro() {
  const [subscriptionId, setSubscriptionId] = useState(null);
  const [loader, setLoader] = useState(false);
  const { user } = useUser();

  const createSubscription = async (planId) => {
    setLoader(true);
    axios
      .post(
        "/api/create-subscription",
        JSON.stringify({
          plan_id: planId,
        })
      )
      .then((resp) => {
        setLoader(false);
        setSubscriptionId(resp.data.id);
      });
  };

  useEffect(() => {
    subscriptionId && makePayment();
  }, [subscriptionId]);

  const makePayment = () => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_LIVE_KEY,
      subscription_id: subscriptionId,
      name: "Coding India",
      description: "Coding India Pro membership",
      image: "./Logo.png",
      handler: async (resp) => {
        if (resp) {
          addNewMember(resp?.razorpay_payment_id);
        }
      },
      theme: {
        color: "#7D41E1",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const addNewMember = (paymentId) => {
    GlobalAPI.addNewMember(
      user.primaryEmailAddress.emailAddress,
      paymentId
    ).then(
      (resp) => {
        if (resp) {
          toast("Payment Successfully");
        }
      },
      (error) => {
        toast("some error occured");
      }
    );
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
          createSubscription("plan_NaO7VuduZSv7sf");
        }}
      >
        Monthly
      </Button>
    </div>
  );
}

export default CodingIndiaPro;
