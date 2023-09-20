import * as dotenv from 'dotenv';
dotenv.config();
import 'tsconfig-paths/register';

import server from '@configs/socket';
import connectDB from '@configs/db';

connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
