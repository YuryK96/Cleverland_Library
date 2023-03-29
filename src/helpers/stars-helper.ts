import emptyStar from '../assets/images/stars/emptyStar.svg';
import wholeStar from '../assets/images/stars/star.svg';

export const countStars = (stars: number | null | undefined) => {
  let starsArray: Star[] = [];


      switch (stars && Math.round(stars)) {
          case 0:
              starsArray = [
                  { star: emptyStar, id: 0 },
                  { star: emptyStar, id: 1 },
                  { star: emptyStar, id: 2 },
                  { star: emptyStar, id: 3 },
                  { star: emptyStar, id: 4 }
              ];
              break;
          case 1:
              starsArray = [
                  { star: wholeStar, id: 0 },
                  { star: emptyStar, id: 1 },
                  { star: emptyStar, id: 2 },
                  { star: emptyStar, id: 3 },
                  { star: emptyStar, id: 4 }
              ];
              break;
          case 2:
              starsArray = [
                  { star: wholeStar, id: 0 },
                  { star: wholeStar, id: 1 },
                  { star: emptyStar, id: 2 },
                  { star: emptyStar, id: 3 },
                  { star: emptyStar, id: 4 }
              ];
              break;
          case 3:
              starsArray = [
                  { star: wholeStar, id: 0 },
                  { star: wholeStar, id: 1 },
                  { star: wholeStar, id: 2 },
                  { star: emptyStar, id: 3 },
                  { star: emptyStar, id: 4 }
              ];
              break;
          case 4:
              starsArray = [
                  { star: wholeStar, id: 0 },
                  { star: wholeStar, id: 1 },
                  { star: wholeStar, id: 2 },
                  { star: wholeStar, id: 3 },
                  { star: emptyStar, id: 4 }
              ];
              break;
          case 5:
              starsArray = [
                  { star: wholeStar, id: 0 },
                  { star: wholeStar, id: 1 },
                  { star: wholeStar, id: 2 },
                  { star: wholeStar, id: 3 },
                  { star: wholeStar, id: 4 }
              ];
              break;
          default: {
              starsArray = [{ star: emptyStar, id: 0 },
                  { star: emptyStar, id: 1 },
                  { star: emptyStar, id: 2 },
                  { star: emptyStar, id: 3 },
                  { star: emptyStar, id: 4 }];
          }

  }
  return starsArray;
};

type Star = {
  star: string;
  id: number;
};
