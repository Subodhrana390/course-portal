"use client";
import { UserMemberContext } from "@/app/_context/UserMemberContext";
import GlobalAPI from "@/app/_utils/GlobalAPI";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Script from "next/script";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { toast } from "sonner";

function CodingIndiaPro() {
  const [subscriptionId, setSubscriptionId] = useState(null);
  const [loader, setLoader] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    user && checkUserMembership();
  }, [user]);

  const { isMember, setIsMember } = useContext(UserMemberContext);
  const checkUserMembership = () => {
    GlobalAPI.checkForMembership(user.primaryEmailAddress.emailAddress).then(
      (resp) => {
        if (resp?.memberships?.length > 0) {
          setIsMember(true);
        }
      }
    );
  };

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
      <section class="text-gray-600 body-font overflow-hidden">
        {!isMember ? (
          <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-col text-center w-full mb-20">
              <h1 class="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
                Pricing
              </h1>
              <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">
                Buy a membership to exlpore the other courses
              </p>
            </div>
            <div class="flex flex-wrap items-center justify-center -m-4">
              <div class="p-4 xl:w-1/4 md:w-1/2 w-full">
                <div class="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
                  <h2 class="text-sm tracking-widest title-font mb-1 font-medium">
                    Monthly
                  </h2>
                  <h1 class="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">
                    Starter
                  </h1>
                  <p class="flex items-center text-gray-600 mb-2">
                    <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2.5"
                        class="w-3 h-3"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>
                    Vexillologist pitchfork
                  </p>
                  <p class="flex items-center text-gray-600 mb-2">
                    <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2.5"
                        class="w-3 h-3"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>
                    Tumeric plaid portland
                  </p>
                  <p class="flex items-center text-gray-600 mb-6">
                    <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2.5"
                        class="w-3 h-3"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>
                    Mixtape chillwave tumeric
                  </p>
                  <button
                    class="flex items-center mt-auto text-white bg-primary border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded"
                    onClick={() => {
                      createSubscription("plan_NaO7VuduZSv7sf");
                    }}
                  >
                    buy $3.90
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-4 h-4 ml-auto"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </button>
                  <p class="text-xs text-gray-500 mt-3">
                    Literally you probably haven't heard of them jean shorts.
                  </p>
                </div>
              </div>
              <div class="p-4 xl:w-1/4 md:w-1/2 w-full">
                <div class="h-full p-6 rounded-lg border-2 border-indigo-500 flex flex-col relative overflow-hidden">
                  <span class="bg-indigo-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">
                    Yearly
                  </span>
                  <h2 class="text-sm tracking-widest title-font mb-1 font-medium">
                    PRO
                  </h2>
                  <h1 class="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                    <span>$38</span>
                    <span class="text-lg ml-1 font-normal text-gray-500">
                      /mo
                    </span>
                  </h1>
                  <p class="flex items-center text-gray-600 mb-2">
                    <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2.5"
                        class="w-3 h-3"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>
                    Vexillologist pitchfork
                  </p>
                  <p class="flex items-center text-gray-600 mb-2">
                    <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2.5"
                        class="w-3 h-3"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>
                    Tumeric plaid portland
                  </p>
                  <p class="flex items-center text-gray-600 mb-2">
                    <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2.5"
                        class="w-3 h-3"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>
                    Hexagon neutra unicorn
                  </p>
                  <p class="flex items-center text-gray-600 mb-6">
                    <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2.5"
                        class="w-3 h-3"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>
                    Mixtape chillwave tumeric
                  </p>
                  <button
                    class="flex items-center mt-auto text-white bg-primary border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded"
                    onClick={() => {
                      createSubscription("plan_NaO8FvAK1zif6X");
                    }}
                  >
                    Buy $31.99
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-4 h-4 ml-auto"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </button>
                  <p class="text-xs text-gray-500 mt-3">
                    Literally you probably haven't heard of them jean shorts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="container h-screen flex items-center justify-center">
            <h1>Already have Membership</h1>
          </div>
        )}
      </section>
    </div>
  );
}


export default CodingIndiaPro;
