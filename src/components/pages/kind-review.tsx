import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import AddReviewButton from "../add-review-btn";
import { actions } from "@/actions/actions";
import StarReview from "../star-review";

export default async function KindReview() {
  const reviews = await actions.reviews.getReviews();
  let averageRating = 0;
  if (reviews) {
    averageRating =
      reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  }
  return (
    <section className="bg-cyan-950 min-h-[300px] py-16 px-32 flex flex-col items-center ">
      <h1 className="text-slate-100 text-center font-bold text-4xl mb-8">
        Our Reviews
      </h1>
      <AddReviewButton />
      <InfiniteMovingCards
        items={reviews || []}
        pauseOnHover={false}
        direction="right"
        speed="slow"
      />

      <div className="mt-4 bg-white rounded-lg py-4 px-8 self-center">
        <StarReview rating={Math.round(averageRating)} className="" />

        <p className="font-semibold text-center text-cyan-950">
          {averageRating.toFixed(2)}/5 rated from {reviews?.length} reviews{" "}
        </p>
      </div>
    </section>
  );
}
