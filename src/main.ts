import { logger } from "./application/logging";
import { web } from "./application/web";

web.listen(3001, () => {
  logger.info("Server is running on port 3001");
});
