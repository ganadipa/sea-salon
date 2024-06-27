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

type TUser = {
  name: string;
  email: string;
  password: string;
  role: "admin" | "customer";
  phonenumber: string;
};

export const dummyUsers: TUser[] = [
  {
    name: "Alice Doe",
    email: "alicedoe@gmail.com",
    password: "password",
    role: "customer",
    phonenumber: "1234567890",
  },
  {
    name: "Thomas N",
    email: "thomas.n@compfest.id",
    password: "Admin123",
    role: "admin",
    phonenumber: "08123456789",
  },
  {
    name: "example",
    email: "example@example.com",
    password: "example",
    role: "customer",
    phonenumber: "1234567890",
  },
];

type TService = {
  name: string;
  imageUrl: string | null;
  description: string | null;
  duration: number;
};

export const ServicesData: TService[] = [
  {
    name: "Haircuts and Styling",
    imageUrl: "https://i.ibb.co.com/PZyjCTL/haircut.jpg",
    description:
      "Discover the art of transformation with our exceptional haircuts and styling services. Whether you're looking for a classic trim, a bold new look, or elegant styling for a special occasion, our expert stylists are here to bring your vision to life. Using the latest techniques and premium products, we ensure every cut and style enhances your natural beauty and fits your unique personality. Step into our salon and experience a personalized approach to hair care that leaves you feeling confident and refreshed. Unleash your style potential with a haircut and styling session tailored just for you.",
    duration: 1,
  },
  {
    name: "Menicure and Pedicure",
    imageUrl: "https://i.ibb.co.com/zsQsFnG/menicure.jpg",
    description:
      "Indulge in the ultimate pampering experience with our luxurious manicure and pedicure services. Our skilled technicians provide meticulous care, transforming your hands and feet into perfectly polished masterpieces. From classic manicures and pedicures to the latest trends in nail art, we use high-quality products to ensure lasting beauty and relaxation. Enjoy a soothing environment where you can unwind while we rejuvenate your nails and skin. Treat yourself to the elegance and sophistication of our manicure and pedicure services, and step out with confidence, showcasing hands and feet that are impeccably groomed and stunningly beautiful.",

    duration: 1,
  },
  {
    name: "Facial Treatments",
    imageUrl: "https://i.ibb.co.com/nngCQQ8/facial.jpg",
    description:
      "Revitalize your skin with our luxurious facial treatments, designed to rejuvenate and refresh your complexion. Our skilled aestheticians tailor each facial to address your unique skin concerns, using premium products to cleanse, exfoliate, and hydrate. Whether you need deep cleansing, anti-aging solutions, or a soothing experience for sensitive skin, our treatments will leave your face glowing and radiant. Enjoy the relaxing ambiance of our salon as we restore your skin's natural beauty and vitality. Treat yourself to a transformative facial treatment and step out with a luminous, youthful glow.",
    duration: 1,
  },
  {
    name: "Massage Therapy",
    imageUrl: null,
    description: null,
    duration: 1,
  },
];
