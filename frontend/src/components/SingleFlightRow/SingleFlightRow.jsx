import { DirectFlight } from "../DirectFlight/DirectFlight";
import { MultipleFlight } from "../MultipleFlight/MultipleFlight";

export const SingleFlightRow = ({ flight, amount, segment }) => {
  const { Passengers } = flight;
  const { Legs } = segment;
  return (
    <>
      {Legs.length > 1 ? (
        <MultipleFlight legs={Legs} amount={amount} passengers={Passengers} />
      ) : (
        <DirectFlight legs={Legs} amount={amount} passengers={Passengers} />
      )}
    </>
  );
};
