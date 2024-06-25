export const dummyReviews = [
  {
    description:
      "I love how my haircut turned out! The stylist was so skilled and attentive.",
    name: "Alice",
    rating: 5,
    createdAt: new Date("2021-09-01"),
  },
  {
    description:
      "The manicure and pedicure services were excellent. My nails look amazing!",
    name: "Bob",
    rating: 4,
    createdAt: new Date("2021-09-02"),
  },
  {
    description:
      "The facial treatment was so relaxing. I felt like I was in a spa!",
    name: "Charlie",
    rating: 5,
    createdAt: new Date("2021-09-03"),
  },
  {
    description:
      "I had a great experience at the salon. The staff were friendly and professional.",
    name: "Diana",
    rating: 4,
    createdAt: new Date("2021-09-04"),
  },
  {
    description:
      "The haircut and styling services were top-notch. I'll definitely be back!",
    name: "Eve",
    rating: 5,
    createdAt: new Date("2021-09-05"),
  },
];

export const services = [
  "Haircuts and Styling",
  "Manicure and Pedicure",
  "Facial Treatments",
] as const;
