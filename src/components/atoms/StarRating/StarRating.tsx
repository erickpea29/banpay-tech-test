import { StarIcon } from "@heroicons/react/24/solid";

interface StarRatingProps {
  score: number;
}

export function StarRating({ score }: StarRatingProps) {
  const fullStars = Math.floor((score / 100) * 5);
  const emptyStars = 5 - fullStars;

  return (
    <div className="flex space-x-1 mb-2">
      {[...Array(fullStars)].map((_, index) => (
        <StarIcon key={`full-${index}`} className="w-4 h-4 text-white" />
      ))}

      {[...Array(emptyStars)].map((_, index) => (
        <StarIcon key={`empty-${index}`} className="w-4 h-4 text-gray-400" />
      ))}
    </div>
  );
}
