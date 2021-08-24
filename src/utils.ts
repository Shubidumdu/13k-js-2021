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
}: GetTimingProps): [progress: number, isProgressing: boolean] => {
  const progress = (time - start) / duration;
  const isProgressing = progress < 1;
  return [progress, isProgressing];
};
