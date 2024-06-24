import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import AddReviewButton from "../add-review-btn";
import { actions } from "@/actions/actions";

export default async function KindReview() {
  const reviews = await actions.reviews.getReviews();
  console.log("reviews", reviews);
  return (
    <section className="bg-cyan-950 min-h-[300px] py-16 px-32">
      <h1 className="text-slate-100 text-center font-bold text-4xl mb-8">
        Our Reviews
      </h1>
      <InfiniteMovingCards
        items={reviews || []}
        pauseOnHover={false}
        direction="right"
        speed="slow"
      />
      <AddReviewButton />
    </section>
  );
}
