import "reflect-metadata";
import {createExpressServer} from "routing-controllers";

createExpressServer({
  controllers: [__dirname + "/**/controller.js"],
}).listen(3000);
