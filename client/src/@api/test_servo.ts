import * as Types from "types";

/** /test-servo endpoint */
const test_servo = async (connection: Types.RaspiConnection) => {
  // Construct request
  const url = `http://${connection.ip}:${connection.port}/test-servo`;
  const init: RequestInit = {};

  // Make request
  const res = await fetch(url, init);
  if (res.ok) return false;
  return false;
};

export default test_servo;
