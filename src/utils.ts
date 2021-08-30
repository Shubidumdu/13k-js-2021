export const degreeToRadian = (degree: number) => (Math.PI / 180) * degree;

interface GetTimingProps {
  time: number;
  start: number;
  duration: number;
}

export const getTimings = ({
  time,
  start,
  duration,
}: GetTimingProps): [
  isProgressing: boolean,
  progress: number,
  isReserved: boolean,
  isEnded: boolean,
] => {
  const isReserved = (time - start) / duration < 0;
  const isEnded = (time - start) / duration > 1;
  const progress =
    (time - start) / duration < 0 ? 0 : (time - start) / duration;
  const isProgressing = progress < 1 && progress > 0;
  return [isProgressing, progress, isReserved, isEnded];
};
