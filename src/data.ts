export interface HeadphoneData {
  manufacturer: string;
  model: string;
  type: string;
  skinRating: 'green' | 'yellow' | 'red';
  nonSkinRating: 'green' | 'yellow' | 'red' | 'none';
  totalRating: 'green' | 'yellow' | 'red';
  supportLink?: string;
  actionAdvice?: string;
}

export const headphones: HeadphoneData[] = [
  { 
    manufacturer: "LifeBee", 
    model: "Digital Pro 40", 
    type: "in-ear wireless", 
    skinRating: "green", 
    nonSkinRating: "yellow", 
    totalRating: "green",
    actionAdvice: "Contact the retailer for information on their chemical safety standards."
  },
  { 
    manufacturer: "Picun", 
    model: "B8 Wireless Over ear", 
    type: "over ear adult", 
    skinRating: "green", 
    nonSkinRating: "green", 
    totalRating: "green",
    supportLink: "https://www.picun.com/support",
    actionAdvice: "This model meets high safety standards. Contact Picun support for detailed material specifications."
  },
  { 
    manufacturer: "Enjoy Music", 
    model: "M6pop cat ear", 
    type: "over ear child", 
    skinRating: "yellow", 
    nonSkinRating: "red", 
    totalRating: "red",
    actionAdvice: "High concern detected in internal parts. Contact the reseller or manufacturer regarding their return policy for hazardous materials."
  },
  { 
    manufacturer: "JMMO", 
    model: "Kabellose Ohrhörer Premium-Klang", 
    type: "in-ear wireless", 
    skinRating: "green", 
    nonSkinRating: "none", 
    totalRating: "green",
    actionAdvice: "Contact the retailer for more information on the internal components of this model."
  },
  { 
    manufacturer: "DONG QUAN SHUNXIN", 
    model: "Kinder Kabel Kopfhörer Einhorn", 
    type: "over ear child", 
    skinRating: "green", 
    nonSkinRating: "yellow", 
    totalRating: "green",
    actionAdvice: "Moderate concern in non-contact parts. Contact the retailer for safety certifications."
  },
  { 
    manufacturer: "Niceboy", 
    model: "Hive Prodigy 4", 
    type: "over ear adult", 
    skinRating: "green", 
    nonSkinRating: "red", 
    totalRating: "red",
    supportLink: "https://niceboy.eu/en/support",
    actionAdvice: "High risk in internal parts. Contact Niceboy support or your reseller to inquire about returns or safer alternatives."
  },
  { 
    manufacturer: "Marshall", 
    model: "Major V", 
    type: "over ear adult", 
    skinRating: "green", 
    nonSkinRating: "green", 
    totalRating: "green",
    supportLink: "https://support.marshallheadphones.com/",
    actionAdvice: "This model meets high safety standards. Contact Marshall support for their full Restricted Substances List (RSL)."
  },
  { 
    manufacturer: "Apple", 
    model: "AirPods Max -2024", 
    type: "over ear adult", 
    skinRating: "green", 
    nonSkinRating: "yellow", 
    totalRating: "green",
    supportLink: "https://support.apple.com/contact",
    actionAdvice: "Apple has strict internal limits. Contact Apple support to learn more about their environmental and material safety reports."
  },
  { 
    manufacturer: "Sony", 
    model: "WH-1000XM5", 
    type: "over ear adult", 
    skinRating: "green", 
    nonSkinRating: "green", 
    totalRating: "green",
    supportLink: "https://www.sony.com/electronics/support",
    actionAdvice: "This model performed well. Contact Sony support for information on their 'Green Management' program."
  },
  { 
    manufacturer: "JBL", 
    model: "Tune 720BT", 
    type: "over ear adult", 
    skinRating: "green", 
    nonSkinRating: "green", 
    totalRating: "green",
    supportLink: "https://support.jbl.com/",
    actionAdvice: "Safe performance. Contact JBL support for their sustainability and chemical compliance documentation."
  },
  { 
    manufacturer: "Sony", 
    model: "Ult Wear", 
    type: "over ear adult", 
    skinRating: "yellow", 
    nonSkinRating: "yellow", 
    totalRating: "yellow",
    supportLink: "https://www.sony.com/electronics/support",
    actionAdvice: "Moderate concern detected. Contact Sony support to ask about the specific flame retardants used in this model."
  },
  { 
    manufacturer: "Beats", 
    model: "Solo 4", 
    type: "over ear adult", 
    skinRating: "green", 
    nonSkinRating: "red", 
    totalRating: "red",
    supportLink: "https://support.apple.com/beats",
    actionAdvice: "High risk in non-contact parts. Contact Apple/Beats support regarding their policy on hazardous additives in internal components."
  },
  { 
    manufacturer: "Sony", 
    model: "WH-CH720N", 
    type: "over ear adult", 
    skinRating: "green", 
    nonSkinRating: "green", 
    totalRating: "green",
    supportLink: "https://www.sony.com/electronics/support",
    actionAdvice: "Good safety profile. Contact Sony for their latest environmental reports."
  },
  { 
    manufacturer: "Jlab", 
    model: "Jbuds Lux ANC WIRELESS", 
    type: "over ear adult", 
    skinRating: "green", 
    nonSkinRating: "red", 
    totalRating: "red",
    supportLink: "https://www.jlab.com/pages/contact",
    actionAdvice: "High risk detected in internal parts. Contact JLab support to inquire about their chemical safety standards and return options."
  },
  { 
    manufacturer: "Sennheiser", 
    model: "Momentum Wireless 4", 
    type: "over ear adult", 
    skinRating: "red", 
    nonSkinRating: "green", 
    totalRating: "red",
    supportLink: "https://en-us.sennheiser.com/service-support",
    actionAdvice: "High risk in skin-contact parts. Contact Sennheiser support immediately to discuss safety concerns and potential returns."
  },
  { 
    manufacturer: "Apple", 
    model: "AirPods Pro 2. Gen. USB-C", 
    type: "in-ear wireless", 
    skinRating: "green", 
    nonSkinRating: "green", 
    totalRating: "green",
    supportLink: "https://support.apple.com/contact",
    actionAdvice: "Excellent safety profile. Contact Apple support for their detailed material safety data sheets (MSDS)."
  },
  { 
    manufacturer: "Samsung", 
    model: "Galaxy Buds3 Pro", 
    type: "in-ear wireless", 
    skinRating: "yellow", 
    nonSkinRating: "red", 
    totalRating: "red",
    supportLink: "https://www.samsung.com/us/support/contact/",
    actionAdvice: "High risk in internal parts. Contact Samsung support to ask about the bisphenol content in this specific model."
  },
  { 
    manufacturer: "JBL", 
    model: "Tour Pro 3", 
    type: "in-ear wireless", 
    skinRating: "green", 
    nonSkinRating: "yellow", 
    totalRating: "green",
    supportLink: "https://support.jbl.com/",
    actionAdvice: "Safe for skin contact. Contact JBL support for information on the additives used in the internal casing."
  },
  { 
    manufacturer: "Sony", 
    model: "Noise Cancelling WF-1000XM5", 
    type: "in-ear wireless", 
    skinRating: "yellow", 
    nonSkinRating: "red", 
    totalRating: "red",
    supportLink: "https://www.sony.com/electronics/support",
    actionAdvice: "High risk in internal parts. Contact Sony support regarding their use of regulated flame retardants in this model."
  },
  { 
    manufacturer: "Sennheiser", 
    model: "Accentum True Wireless", 
    type: "in-ear wireless", 
    skinRating: "green", 
    nonSkinRating: "red", 
    totalRating: "red",
    supportLink: "https://en-us.sennheiser.com/service-support",
    actionAdvice: "High risk in internal parts. Contact Sennheiser support to inquire about their chemical compliance for the internal components."
  },
  { 
    manufacturer: "Sony", 
    model: "LinkBuds Fit", 
    type: "in-ear wireless", 
    skinRating: "green", 
    nonSkinRating: "yellow", 
    totalRating: "green",
    supportLink: "https://www.sony.com/electronics/support",
    actionAdvice: "Generally safe. Contact Sony support for more details on their material sourcing."
  },
  { 
    manufacturer: "JBL", 
    model: "Wave Beam", 
    type: "in-ear wireless", 
    skinRating: "green", 
    nonSkinRating: "red", 
    totalRating: "red",
    supportLink: "https://support.jbl.com/",
    actionAdvice: "High risk in internal parts. Contact JBL support or your reseller to discuss the findings of the 2026 report."
  },
  { 
    manufacturer: "Silvercrest", 
    model: "True Wireless Bluetooth In-Ear", 
    type: "in-ear wireless", 
    skinRating: "yellow", 
    nonSkinRating: "red", 
    totalRating: "red",
    supportLink: "https://www.lidl.com/contact-us",
    actionAdvice: "High risk detected. Contact Lidl customer service regarding the chemical safety of their Silvercrest electronics."
  },
  { 
    manufacturer: "Xiaomi", 
    model: "Redmi Buds 5 Pro", 
    type: "in-ear wireless", 
    skinRating: "green", 
    nonSkinRating: "red", 
    totalRating: "red",
    supportLink: "https://www.mi.com/global/support/contact/",
    actionAdvice: "High risk in internal parts. Contact Xiaomi support for their Restricted Substances List (RSL) compliance."
  },
  { 
    manufacturer: "Jlab", 
    model: "Jbuds Mini", 
    type: "in-ear wireless", 
    skinRating: "green", 
    nonSkinRating: "red", 
    totalRating: "red",
    supportLink: "https://www.jlab.com/pages/contact",
    actionAdvice: "High risk in internal parts. Contact JLab support for information on their material safety standards."
  },
  { 
    manufacturer: "Sony", 
    model: "WF-C510", 
    type: "in-ear wireless", 
    skinRating: "green", 
    nonSkinRating: "yellow", 
    totalRating: "green",
    supportLink: "https://www.sony.com/electronics/support",
    actionAdvice: "Safe for skin contact. Contact Sony support for details on internal material composition."
  },
  { 
    manufacturer: "Jabra", 
    model: "Elite 10 Gen 2", 
    type: "in-ear wireless", 
    skinRating: "green", 
    nonSkinRating: "red", 
    totalRating: "red",
    supportLink: "https://www.jabra.com/support",
    actionAdvice: "High risk in internal parts. Contact Jabra support to inquire about their chemical safety policies for internal components."
  },
  { 
    manufacturer: "Marshall", 
    model: "Motif II ANC", 
    type: "in-ear wireless", 
    skinRating: "green", 
    nonSkinRating: "red", 
    totalRating: "red",
    supportLink: "https://support.marshallheadphones.com/",
    actionAdvice: "High risk in internal parts. Contact Marshall support regarding the presence of TPhP in this model."
  },
  { 
    manufacturer: "Tonies", 
    model: "Lauscher 2.gen", 
    type: "over ear child", 
    skinRating: "yellow", 
    nonSkinRating: "green", 
    totalRating: "yellow",
    supportLink: "https://support.tonies.com/",
    actionAdvice: "Moderate concern in skin-contact parts. Contact Tonies support for their safety certifications for children's products."
  },
  { 
    manufacturer: "Tigermedia", 
    model: "tigerbuddies", 
    type: "over ear child", 
    skinRating: "yellow", 
    nonSkinRating: "green", 
    totalRating: "yellow",
    supportLink: "https://tiger.media/en/support/",
    actionAdvice: "Moderate concern. Contact Tigermedia support for detailed material safety information."
  },
  { 
    manufacturer: "JBL", 
    model: "JR310BT", 
    type: "over ear child", 
    skinRating: "green", 
    nonSkinRating: "red", 
    totalRating: "red",
    supportLink: "https://support.jbl.com/",
    actionAdvice: "High risk in internal parts. Contact JBL support to ask about the chemical safety of their children's headphone line."
  },
  { 
    manufacturer: "JLab", 
    model: "JBuddies Studio", 
    type: "over ear child", 
    skinRating: "green", 
    nonSkinRating: "yellow", 
    totalRating: "green",
    supportLink: "https://www.jlab.com/pages/contact",
    actionAdvice: "Generally safe. Contact JLab support for information on their children's product safety testing."
  },
  { 
    manufacturer: "Bose", 
    model: "QuietComfort Headphones", 
    type: "over ear adult", 
    skinRating: "red", 
    nonSkinRating: "green", 
    totalRating: "red",
    supportLink: "https://www.bose.com/en_us/support.html",
    actionAdvice: "High risk in skin-contact parts. Contact Bose support or your reseller immediately to discuss returns and safety concerns."
  },
  { 
    manufacturer: "Skullcandy", 
    model: "Grom Kids Bluetooth", 
    type: "over ear child", 
    skinRating: "green", 
    nonSkinRating: "red", 
    totalRating: "red",
    supportLink: "https://support.skullcandy.com/",
    actionAdvice: "High risk in internal parts. Contact Skullcandy support regarding the presence of TPhP in this children's model."
  },
  { 
    manufacturer: "Logitech", 
    model: "G733 LIGHTSPEED Wireless", 
    type: "gaming wireless", 
    skinRating: "red", 
    nonSkinRating: "green", 
    totalRating: "red",
    supportLink: "https://support.logi.com/",
    actionAdvice: "High risk in skin-contact parts. Contact Logitech support to discuss the material safety of their gaming headsets."
  },
  { 
    manufacturer: "SteelSeries", 
    model: "Arctis Nova 5", 
    type: "gaming wireless", 
    skinRating: "red", 
    nonSkinRating: "green", 
    totalRating: "red",
    supportLink: "https://support.steelseries.com/",
    actionAdvice: "High risk in skin-contact parts. Contact SteelSeries support regarding potential returns or safer ear cushion alternatives."
  },
  { 
    manufacturer: "Razer", 
    model: "Kraken V3", 
    type: "gaming with wires", 
    skinRating: "red", 
    nonSkinRating: "red", 
    totalRating: "red",
    supportLink: "https://support.razer.com/",
    actionAdvice: "High risk in both skin-contact and internal parts. Contact Razer support immediately to discuss safety concerns."
  },
  { 
    manufacturer: "HyperX", 
    model: "Cloud III gaming headset", 
    type: "gaming with wires", 
    skinRating: "red", 
    nonSkinRating: "red", 
    totalRating: "red",
    supportLink: "https://support.hyperx.com/",
    actionAdvice: "High risk in both skin-contact and internal parts. Contact HyperX support to inquire about their chemical safety standards."
  },
  { 
    manufacturer: "My first care", 
    model: "Care Buds blue", 
    type: "in-ear wireless", 
    skinRating: "green", 
    nonSkinRating: "red", 
    totalRating: "red",
    actionAdvice: "High risk in internal parts. Contact the retailer regarding the bisphenol content in this specific children's model."
  }
];
