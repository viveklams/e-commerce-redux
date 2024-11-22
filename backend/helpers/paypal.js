import paypal from "paypal-rest-sdk";

paypal.configure({
  mode: "sandbox",
  client_id:
    "AS3JWGhcI0yh7sJOcRtVP_Hc-uSjQijUDnMpk5RDcsN3WEfcfo8kMjcHFPLhsotf82YljRVbT6gpnqy2",
  client_secret:
    "EPWVK59iw9zTV-gDTMIFJxabZVwOQhU2aJ2QGW_jTQsG_20wRvHWGBq--zpk4IZoIxxT0X-vRbbkWW64",
});

export default paypal;
